import assert from 'node:assert/strict';
import test from 'node:test';

import {
  WINDOW_ACTIONS,
  WINDOW_STATUS,
  clampWindowPosition,
  createWindowManagerState,
  getConstrainedWindowSize,
  getDesktopBounds,
  getTaskbarHeight,
  getTopVisibleWindowId,
  getWindowLayout,
  windowManagerReducer,
} from '../src/state/windowManager.js';

const getWindow = (state, id) =>
  state.windows.find((windowData) => windowData.id === id);

const dispatch = (state, type, id) =>
  windowManagerReducer(state, { type, id });

test('initial state makes the top visible window active', () => {
  const state = createWindowManagerState();

  assert.equal(state.activeWindowId, 'info');
  assert.equal(state.activeWindowId, getTopVisibleWindowId(state.windows));
  assert.equal(getWindow(state, state.activeWindowId).status, WINDOW_STATUS.VISIBLE);
  assert.equal(state.desktopSnapshot, null);
});

test('opening and focusing windows promotes them through z-order', () => {
  let state = createWindowManagerState();

  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'about');
  assert.equal(state.activeWindowId, 'about');
  assert.equal(getWindow(state, 'about').status, WINDOW_STATUS.VISIBLE);
  assert.equal(getWindow(state, 'about').zIndex, 2);

  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'projects');
  assert.equal(state.activeWindowId, 'projects');
  assert.equal(getWindow(state, 'projects').zIndex, 3);

  state = dispatch(state, WINDOW_ACTIONS.FOCUS, 'about');
  assert.equal(state.activeWindowId, 'about');
  assert.equal(getWindow(state, 'about').zIndex, 4);
  assert.equal(getTopVisibleWindowId(state.windows), 'about');
  assert.equal(state.nextZIndex, 5);
});

test('minimizing and closing the active window promotes the next visible window', () => {
  let state = createWindowManagerState();
  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'about');
  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'projects');

  state = dispatch(state, WINDOW_ACTIONS.MINIMIZE, 'projects');
  assert.equal(getWindow(state, 'projects').status, WINDOW_STATUS.MINIMIZED);
  assert.equal(state.activeWindowId, 'about');

  state = dispatch(state, WINDOW_ACTIONS.CLOSE, 'about');
  assert.equal(getWindow(state, 'about').status, WINDOW_STATUS.CLOSED);
  assert.equal(state.activeWindowId, 'info');
  assert.equal(getTopVisibleWindowId(state.windows), 'info');
});

test('taskbar activation focuses, minimizes, and restores a window', () => {
  let state = createWindowManagerState();
  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'about');

  state = dispatch(state, WINDOW_ACTIONS.TASKBAR_ACTIVATE, 'info');
  assert.equal(state.activeWindowId, 'info');
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.VISIBLE);
  assert.equal(getTopVisibleWindowId(state.windows), 'info');

  state = dispatch(state, WINDOW_ACTIONS.TASKBAR_ACTIVATE, 'info');
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.MINIMIZED);
  assert.equal(state.activeWindowId, 'about');

  state = dispatch(state, WINDOW_ACTIONS.TASKBAR_ACTIVATE, 'info');
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.VISIBLE);
  assert.equal(state.activeWindowId, 'info');
  assert.equal(getTopVisibleWindowId(state.windows), 'info');
});

test('maximize toggles for a visible window and closing resets it', () => {
  let state = createWindowManagerState();

  state = dispatch(state, WINDOW_ACTIONS.TOGGLE_MAXIMIZE, 'info');
  assert.equal(getWindow(state, 'info').isMaximized, true);
  assert.equal(state.activeWindowId, 'info');

  state = dispatch(state, WINDOW_ACTIONS.TOGGLE_MAXIMIZE, 'info');
  assert.equal(getWindow(state, 'info').isMaximized, false);

  state = dispatch(state, WINDOW_ACTIONS.TOGGLE_MAXIMIZE, 'info');
  state = dispatch(state, WINDOW_ACTIONS.CLOSE, 'info');
  assert.equal(getWindow(state, 'info').isMaximized, false);
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.CLOSED);
});

test('window geometry is clamped inside a 1024 by 700 viewport', () => {
  const viewport = { width: 1024, height: 700, safeAreaBottom: 34 };
  const requestedSize = { width: 700, height: 580 };
  const requestedPosition = { top: 50, left: 630 };

  assert.equal(getTaskbarHeight(viewport), 40);
  assert.deepEqual(getDesktopBounds(viewport), { width: 1024, height: 660 });
  assert.deepEqual(getConstrainedWindowSize(requestedSize, viewport), {
    width: 700,
    height: 580,
  });
  assert.deepEqual(
    clampWindowPosition(requestedPosition, requestedSize, viewport),
    { top: 50, left: 316 },
  );

  const state = createWindowManagerState(undefined, viewport);
  const infoLayout = getWindowLayout(getWindow(state, 'info'), viewport);
  assert.deepEqual(
    {
      top: infoLayout.top,
      left: infoLayout.left,
      width: infoLayout.width,
      height: infoLayout.height,
      maxHeight: infoLayout.maxHeight,
    },
    { top: 42, left: 240, width: 760, height: 610, maxHeight: 618 },
  );
});

test('window geometry remains usable in a 320 by 568 viewport', () => {
  const viewport = { width: 320, height: 568 };
  const requestedSize = { width: 700, height: 580 };
  const requestedPosition = { top: 50, left: 630 };

  assert.deepEqual(getConstrainedWindowSize(requestedSize, viewport), {
    width: 304,
    height: 512,
  });
  assert.deepEqual(
    clampWindowPosition(requestedPosition, requestedSize, viewport),
    { top: 8, left: 8 },
  );

  const state = createWindowManagerState(undefined, viewport);
  const compactLayout = getWindowLayout(
    getWindow(state, 'info'),
    viewport,
    true,
  );
  assert.deepEqual(compactLayout, {
    position: 'fixed',
    top: 0,
    left: 0,
    width: 320,
    height: 528,
    maxHeight: 528,
    borderRadius: 0,
  });
});

test('mobile windows reserve the taskbar and bottom safe area as the viewport changes', () => {
  const viewport = { width: 390, height: 844, safeAreaBottom: 34 };
  const requestedSize = { width: 880, height: 900 };

  assert.equal(getTaskbarHeight(viewport), 74);
  assert.deepEqual(getDesktopBounds(viewport), { width: 390, height: 770 });
  assert.deepEqual(getConstrainedWindowSize(requestedSize, viewport), {
    width: 374,
    height: 754,
  });
  assert.deepEqual(
    clampWindowPosition({ top: 900, left: 900 }, requestedSize, viewport),
    { top: 8, left: 8 },
  );

  const state = createWindowManagerState(undefined, viewport);
  const windowData = getWindow(state, 'info');
  const compactLayout = getWindowLayout(windowData, viewport, true);
  assert.equal(compactLayout.height, 770);

  const reducedViewport = { ...viewport, height: 660 };
  const reducedLayout = getWindowLayout(windowData, reducedViewport, true);
  assert.equal(reducedLayout.height, 586);
  assert.equal(reducedLayout.maxHeight, 586);

  const noSafeAreaLayout = getWindowLayout(
    windowData,
    { ...reducedViewport, safeAreaBottom: 0 },
    true,
  );
  assert.equal(noSafeAreaLayout.height, 620);
});

test('taskbar geometry adds mobile safe areas while preserving the 40px content height', () => {
  assert.equal(getTaskbarHeight({ width: 768, safeAreaBottom: 34 }), 74);
  assert.equal(getTaskbarHeight({ width: 769, safeAreaBottom: 34 }), 40);
  assert.equal(getTaskbarHeight({ width: 390, safeAreaBottom: -10 }), 40);
  assert.equal(getTaskbarHeight({ width: 390, safeAreaBottom: NaN }), 40);
  assert.equal(getTaskbarHeight({ width: 390, safeAreaBottom: 0 }), 40);
});

test('show desktop restores only the windows that were visible and their active window', () => {
  let state = createWindowManagerState();
  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'about');
  state = dispatch(state, WINDOW_ACTIONS.OPEN, 'projects');
  state = dispatch(state, WINDOW_ACTIONS.MINIMIZE, 'about');

  assert.equal(state.activeWindowId, 'projects');

  state = windowManagerReducer(state, { type: WINDOW_ACTIONS.SHOW_DESKTOP });
  assert.equal(state.activeWindowId, null);
  assert.deepEqual(state.desktopSnapshot, {
    visibleWindowIds: ['info', 'projects'],
    activeWindowId: 'projects',
  });
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.MINIMIZED);
  assert.equal(getWindow(state, 'about').status, WINDOW_STATUS.MINIMIZED);
  assert.equal(getWindow(state, 'projects').status, WINDOW_STATUS.MINIMIZED);

  state = windowManagerReducer(state, { type: WINDOW_ACTIONS.SHOW_DESKTOP });
  assert.equal(getWindow(state, 'info').status, WINDOW_STATUS.VISIBLE);
  assert.equal(getWindow(state, 'about').status, WINDOW_STATUS.MINIMIZED);
  assert.equal(getWindow(state, 'projects').status, WINDOW_STATUS.VISIBLE);
  assert.equal(state.activeWindowId, 'projects');
  assert.equal(state.desktopSnapshot, null);
});
