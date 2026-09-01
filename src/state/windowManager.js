export const TASKBAR_HEIGHT = 40;
export const DESKTOP_GUTTER = 8;

export const WINDOW_STATUS = Object.freeze({
  VISIBLE: 'visible',
  MINIMIZED: 'minimized',
  CLOSED: 'closed',
});

export const WINDOW_ACTIONS = Object.freeze({
  OPEN: 'window/open',
  FOCUS: 'window/focus',
  MINIMIZE: 'window/minimize',
  CLOSE: 'window/close',
  TOGGLE_MAXIMIZE: 'window/toggle-maximize',
  TASKBAR_ACTIVATE: 'window/taskbar-activate',
  MOVE: 'window/move',
  SET_GEOMETRY: 'window/set-geometry',
  SHOW_DESKTOP: 'desktop/toggle-show',
  CLAMP_TO_VIEWPORT: 'desktop/clamp-to-viewport',
});

export const INITIAL_WINDOWS = Object.freeze([
  {
    id: 'info',
    title: 'Info',
    icon: '/resources/optimized/icons/help-64.webp',
    status: WINDOW_STATUS.VISIBLE,
    isMaximized: false,
    position: { top: 50, left: 630 },
    defaultPosition: { top: 50, left: 630 },
    size: { width: 700, height: 580 },
    defaultSize: { width: 700, height: 580 },
    zIndex: 1,
  },
  {
    id: 'about',
    title: 'About Me',
    icon: '/resources/optimized/icons/doc-64.webp',
    status: WINDOW_STATUS.CLOSED,
    isMaximized: false,
    position: { top: 70, left: 200 },
    defaultPosition: { top: 70, left: 200 },
    size: { width: 700, height: 600 },
    defaultSize: { width: 700, height: 600 },
    zIndex: 1,
  },
  {
    id: 'projects',
    title: 'Projects',
    icon: '/resources/optimized/icons/projects-64.webp',
    status: WINDOW_STATUS.CLOSED,
    isMaximized: false,
    position: { top: 50, left: 100 },
    defaultPosition: { top: 50, left: 100 },
    size: { width: 600, height: 805 },
    defaultSize: { width: 600, height: 805 },
    zIndex: 1,
  },
  {
    id: 'links',
    title: 'Links',
    icon: '/resources/optimized/icons/folder-64.webp',
    status: WINDOW_STATUS.CLOSED,
    isMaximized: false,
    position: { top: 10, left: 530 },
    defaultPosition: { top: 10, left: 530 },
    size: { width: 900, height: 'auto' },
    defaultSize: { width: 900, height: 'auto' },
    zIndex: 1,
  },
]);

const finiteNumber = (value, fallback = 0) =>
  Number.isFinite(Number(value)) ? Number(value) : fallback;

const clamp = (value, minimum, maximum) =>
  Math.min(Math.max(value, minimum), Math.max(minimum, maximum));

const cloneWindow = (windowData) => ({
  ...windowData,
  status:
    windowData.status ??
    (windowData.visible ? WINDOW_STATUS.VISIBLE : WINDOW_STATUS.CLOSED),
  isMaximized: Boolean(windowData.isMaximized),
  position: { ...windowData.position },
  defaultPosition: { ...(windowData.defaultPosition ?? windowData.position) },
  size: { ...windowData.size },
  defaultSize: { ...(windowData.defaultSize ?? windowData.size) },
  zIndex: finiteNumber(windowData.zIndex, 1),
});

export const isWindowVisible = (windowData) =>
  windowData.status === WINDOW_STATUS.VISIBLE;

export const isWindowOpen = (windowData) =>
  windowData.status !== WINDOW_STATUS.CLOSED;

export function getTopVisibleWindowId(windows, excludedId = null) {
  return windows.reduce((topWindow, windowData) => {
    if (!isWindowVisible(windowData) || windowData.id === excludedId) {
      return topWindow;
    }

    if (!topWindow || windowData.zIndex >= topWindow.zIndex) {
      return windowData;
    }

    return topWindow;
  }, null)?.id ?? null;
}

export function getDesktopBounds(viewport, taskbarHeight = TASKBAR_HEIGHT) {
  const width = Math.max(0, finiteNumber(viewport?.width));
  const height = Math.max(
    0,
    finiteNumber(viewport?.height) - finiteNumber(taskbarHeight),
  );

  return { width, height };
}

export function getConstrainedWindowSize(
  size,
  viewport,
  { gutter = DESKTOP_GUTTER, taskbarHeight = TASKBAR_HEIGHT } = {},
) {
  const desktop = getDesktopBounds(viewport, taskbarHeight);
  const horizontalGutter = desktop.width > gutter * 2 ? gutter * 2 : 0;
  const verticalGutter = desktop.height > gutter * 2 ? gutter * 2 : 0;
  const maximumWidth = Math.max(0, desktop.width - horizontalGutter);
  const maximumHeight = Math.max(0, desktop.height - verticalGutter);
  const requestedWidth = Math.max(0, finiteNumber(size?.width, maximumWidth));
  const requestedHeight =
    typeof size?.height === 'number'
      ? Math.max(0, finiteNumber(size.height, maximumHeight))
      : size?.height;

  return {
    width: Math.min(requestedWidth, maximumWidth),
    height:
      typeof requestedHeight === 'number'
        ? Math.min(requestedHeight, maximumHeight)
        : 'auto',
  };
}

export function clampWindowPosition(
  position,
  size,
  viewport,
  {
    gutter = DESKTOP_GUTTER,
    taskbarHeight = TASKBAR_HEIGHT,
    titleBarHeight = 30,
  } = {},
) {
  const desktop = getDesktopBounds(viewport, taskbarHeight);
  const constrainedSize = getConstrainedWindowSize(size, viewport, {
    gutter,
    taskbarHeight,
  });
  const minimumLeft = desktop.width > gutter * 2 ? gutter : 0;
  const minimumTop = desktop.height > gutter * 2 ? gutter : 0;
  const estimatedHeight =
    typeof constrainedSize.height === 'number'
      ? constrainedSize.height
      : Math.min(titleBarHeight, desktop.height);
  const maximumLeft = desktop.width - constrainedSize.width - minimumLeft;
  const maximumTop = desktop.height - estimatedHeight - minimumTop;

  return {
    top: clamp(finiteNumber(position?.top), minimumTop, maximumTop),
    left: clamp(finiteNumber(position?.left), minimumLeft, maximumLeft),
  };
}

export function getWindowLayout(windowData, viewport, isCompact = false) {
  const desktop = getDesktopBounds(viewport);

  if (isCompact || windowData.isMaximized) {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: desktop.width,
      height: desktop.height,
      maxHeight: desktop.height,
      borderRadius: 0,
    };
  }

  const size = getConstrainedWindowSize(windowData.size, viewport);
  const position = clampWindowPosition(
    windowData.position,
    windowData.size,
    viewport,
  );

  return {
    position: 'absolute',
    top: position.top,
    left: position.left,
    width: size.width,
    height: size.height,
    maxHeight: Math.max(0, desktop.height - position.top),
  };
}

export function createWindowManagerState(
  windowDefinitions = INITIAL_WINDOWS,
  viewport = null,
) {
  let windows = windowDefinitions.map(cloneWindow);

  if (viewport) {
    windows = windows.map((windowData) => ({
      ...windowData,
      position: clampWindowPosition(
        windowData.position,
        windowData.size,
        viewport,
      ),
    }));
  }

  const highestZIndex = windows.reduce(
    (highest, windowData) => Math.max(highest, windowData.zIndex),
    0,
  );

  return {
    windows,
    activeWindowId: getTopVisibleWindowId(windows),
    nextZIndex: highestZIndex + 1,
    desktopSnapshot: null,
  };
}

function activateWindow(state, id, changes = {}) {
  const targetWindow = state.windows.find(
    (windowData) => windowData.id === id,
  );

  if (!targetWindow) {
    return state;
  }

  const nextWindow = { ...targetWindow, ...changes };
  if (!isWindowVisible(nextWindow)) {
    return state;
  }

  return {
    ...state,
    windows: state.windows.map((windowData) =>
      windowData.id === id
        ? { ...nextWindow, zIndex: state.nextZIndex }
        : windowData,
    ),
    activeWindowId: id,
    nextZIndex: state.nextZIndex + 1,
    desktopSnapshot: null,
  };
}

function minimizeWindow(state, id) {
  const targetWindow = state.windows.find(
    (windowData) => windowData.id === id,
  );

  if (!targetWindow || !isWindowVisible(targetWindow)) {
    return state;
  }

  const windows = state.windows.map((windowData) =>
    windowData.id === id
      ? { ...windowData, status: WINDOW_STATUS.MINIMIZED }
      : windowData,
  );

  return {
    ...state,
    windows,
    activeWindowId:
      state.activeWindowId === id
        ? getTopVisibleWindowId(windows)
        : state.activeWindowId,
    desktopSnapshot: null,
  };
}

function closeWindow(state, id, viewport = null) {
  const targetWindow = state.windows.find(
    (windowData) => windowData.id === id,
  );

  if (!targetWindow || targetWindow.status === WINDOW_STATUS.CLOSED) {
    return state;
  }

  const windows = state.windows.map((windowData) => {
    if (windowData.id !== id) {
      return windowData;
    }

    const defaultSize = { ...windowData.defaultSize };
    return {
      ...windowData,
      status: WINDOW_STATUS.CLOSED,
      isMaximized: false,
      position: viewport
        ? clampWindowPosition(
            windowData.defaultPosition,
            defaultSize,
            viewport,
          )
        : { ...windowData.defaultPosition },
      size: defaultSize,
    };
  });

  return {
    ...state,
    windows,
    activeWindowId:
      state.activeWindowId === id
        ? getTopVisibleWindowId(windows)
        : state.activeWindowId,
    desktopSnapshot: null,
  };
}

function toggleShowDesktop(state) {
  if (state.desktopSnapshot) {
    const visibleWindowIds = new Set(state.desktopSnapshot.visibleWindowIds);
    const windows = state.windows.map((windowData) =>
      visibleWindowIds.has(windowData.id) && isWindowOpen(windowData)
        ? { ...windowData, status: WINDOW_STATUS.VISIBLE }
        : windowData,
    );
    const previousActiveWindow = windows.find(
      (windowData) =>
        windowData.id === state.desktopSnapshot.activeWindowId &&
        isWindowVisible(windowData),
    );

    return {
      ...state,
      windows,
      activeWindowId:
        previousActiveWindow?.id ?? getTopVisibleWindowId(windows),
      desktopSnapshot: null,
    };
  }

  const visibleWindowIds = state.windows
    .filter(isWindowVisible)
    .map((windowData) => windowData.id);

  if (visibleWindowIds.length === 0) {
    return state;
  }

  return {
    ...state,
    windows: state.windows.map((windowData) =>
      isWindowVisible(windowData)
        ? { ...windowData, status: WINDOW_STATUS.MINIMIZED }
        : windowData,
    ),
    activeWindowId: null,
    desktopSnapshot: {
      visibleWindowIds,
      activeWindowId: state.activeWindowId,
    },
  };
}

export function windowManagerReducer(state, action) {
  switch (action.type) {
    case WINDOW_ACTIONS.OPEN:
      return activateWindow(state, action.id, {
        status: WINDOW_STATUS.VISIBLE,
        ...(action.viewport
          ? {
              position: clampWindowPosition(
                state.windows.find(
                  (windowData) => windowData.id === action.id,
                )?.position,
                state.windows.find(
                  (windowData) => windowData.id === action.id,
                )?.size,
                action.viewport,
              ),
            }
          : {}),
      });

    case WINDOW_ACTIONS.FOCUS: {
      const targetWindow = state.windows.find(
        (windowData) => windowData.id === action.id,
      );
      return targetWindow && isWindowVisible(targetWindow)
        ? activateWindow(state, action.id)
        : state;
    }

    case WINDOW_ACTIONS.MINIMIZE:
      return minimizeWindow(state, action.id);

    case WINDOW_ACTIONS.CLOSE:
      return closeWindow(state, action.id, action.viewport);

    case WINDOW_ACTIONS.TOGGLE_MAXIMIZE: {
      const targetWindow = state.windows.find(
        (windowData) => windowData.id === action.id,
      );
      return targetWindow && isWindowVisible(targetWindow)
        ? activateWindow(state, action.id, {
            isMaximized: !targetWindow.isMaximized,
          })
        : state;
    }

    case WINDOW_ACTIONS.TASKBAR_ACTIVATE: {
      const targetWindow = state.windows.find(
        (windowData) => windowData.id === action.id,
      );

      if (!targetWindow) {
        return state;
      }

      if (
        isWindowVisible(targetWindow) &&
        state.activeWindowId === action.id
      ) {
        return minimizeWindow(state, action.id);
      }

      return activateWindow(state, action.id, {
        status: WINDOW_STATUS.VISIBLE,
        ...(action.viewport
          ? {
              position: clampWindowPosition(
                targetWindow.position,
                targetWindow.size,
                action.viewport,
              ),
            }
          : {}),
      });
    }

    case WINDOW_ACTIONS.MOVE: {
      const targetWindow = state.windows.find(
        (windowData) => windowData.id === action.id,
      );

      if (!targetWindow || targetWindow.isMaximized) {
        return state;
      }

      const position = action.viewport
        ? clampWindowPosition(
            action.position,
            targetWindow.size,
            action.viewport,
          )
        : { ...action.position };

      return {
        ...state,
        windows: state.windows.map((windowData) =>
          windowData.id === action.id
            ? { ...windowData, position }
            : windowData,
        ),
      };
    }

    case WINDOW_ACTIONS.SET_GEOMETRY: {
      const targetWindow = state.windows.find(
        (windowData) => windowData.id === action.id,
      );

      if (!targetWindow) {
        return state;
      }

      const size = action.size
        ? { ...targetWindow.size, ...action.size }
        : targetWindow.size;
      const requestedPosition = action.position ?? targetWindow.position;
      const position = action.viewport
        ? clampWindowPosition(requestedPosition, size, action.viewport)
        : { ...requestedPosition };

      return {
        ...state,
        windows: state.windows.map((windowData) =>
          windowData.id === action.id
            ? { ...windowData, position, size }
            : windowData,
        ),
      };
    }

    case WINDOW_ACTIONS.SHOW_DESKTOP:
      return toggleShowDesktop(state);

    case WINDOW_ACTIONS.CLAMP_TO_VIEWPORT:
      return {
        ...state,
        windows: state.windows.map((windowData) => ({
          ...windowData,
          position: clampWindowPosition(
            windowData.position,
            windowData.size,
            action.viewport,
          ),
        })),
      };

    default:
      return state;
  }
}
