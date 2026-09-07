import assert from 'node:assert/strict';
import test from 'node:test';

import { createWindowDrag } from '../src/state/windowDrag.js';

function createDragFixture() {
  const frames = new Map();
  const previews = [];
  const cancelledFrames = [];
  let requestedFrames = 0;

  const drag = createWindowDrag({
    position: { left: 100, top: 80 },
    pointer: { x: 120, y: 95 },
    size: { width: 400, height: 300 },
    viewport: { width: 1280, height: 800 },
    onPreview: (position) => previews.push(position),
    requestFrame: (callback) => {
      const id = requestedFrames++;
      frames.set(id, callback);
      return id;
    },
    cancelFrame: (id) => {
      cancelledFrames.push(id);
      frames.delete(id);
    },
  });

  return {
    drag,
    frames,
    previews,
    cancelledFrames,
    get requestedFrames() {
      return requestedFrames;
    },
    flushFrame() {
      const callbacks = [...frames.values()];
      frames.clear();
      callbacks.forEach((callback) => callback());
    },
  };
}

test('frequent pointer moves produce one preview of the latest position per frame', () => {
  const fixture = createDragFixture();

  for (let index = 0; index < 100; index += 1) {
    fixture.drag.move({ x: 121 + index, y: 96 + index });
  }

  assert.equal(fixture.requestedFrames, 1);
  assert.equal(fixture.frames.size, 1);
  assert.deepEqual(fixture.previews, []);

  fixture.flushFrame();
  assert.deepEqual(fixture.previews, [{ left: 200, top: 180 }]);

  fixture.drag.move({ x: 250, y: 205 });
  assert.equal(fixture.requestedFrames, 2);
  fixture.flushFrame();
  assert.deepEqual(fixture.previews, [
    { left: 200, top: 180 },
    { left: 230, top: 190 },
  ]);
});

test('release uses its newest pointer coordinates even before the pending preview runs', () => {
  const fixture = createDragFixture();
  fixture.drag.move({ x: 220, y: 195 });

  assert.deepEqual(fixture.drag.finish({ x: 260, y: 225 }), {
    left: 240,
    top: 210,
  });
  assert.equal(fixture.frames.size, 0);
  assert.deepEqual(fixture.cancelledFrames, [0]);

  fixture.flushFrame();
  assert.deepEqual(fixture.previews, []);
});

test('previews and release stay inside every desktop edge and above the taskbar', () => {
  const fixture = createDragFixture();

  for (const pointer of [
    { x: -10000, y: -10000 },
    { x: 10000, y: -10000 },
    { x: 10000, y: 10000 },
    { x: -10000, y: 10000 },
  ]) {
    fixture.drag.move(pointer);
    fixture.flushFrame();
  }

  assert.deepEqual(fixture.previews, [
    { left: 8, top: 8 },
    { left: 872, top: 8 },
    { left: 872, top: 452 },
    { left: 8, top: 452 },
  ]);
  assert.deepEqual(fixture.drag.finish({ x: 10000, y: 10000 }), {
    left: 872,
    top: 452,
  });
});

test('cancelling discards queued previews and ignores later pointer activity', () => {
  const fixture = createDragFixture();
  fixture.drag.move({ x: 220, y: 195 });
  const queuedCallback = [...fixture.frames.values()][0];

  fixture.drag.cancel();
  fixture.drag.cancel();
  assert.equal(fixture.frames.size, 0);
  assert.deepEqual(fixture.cancelledFrames, [0]);

  // A callback already handed to the browser must also stay harmless.
  queuedCallback();
  fixture.drag.move({ x: 300, y: 250 });
  assert.equal(fixture.requestedFrames, 1);
  assert.equal(fixture.drag.finish({ x: 300, y: 250 }), null);
  assert.deepEqual(fixture.previews, []);
});

test('finishing without release coordinates keeps the latest pending drag point', () => {
  const fixture = createDragFixture();
  fixture.drag.move({ x: 200, y: 175 });
  fixture.flushFrame();
  fixture.drag.move({ x: 220, y: 195 });

  assert.deepEqual(fixture.drag.finish(), { left: 200, top: 180 });
  fixture.flushFrame();
  assert.deepEqual(fixture.previews, [{ left: 180, top: 160 }]);
});

test('finishing a drag twice cannot commit or restart the finished session', () => {
  const fixture = createDragFixture();

  assert.deepEqual(fixture.drag.finish(), { left: 100, top: 80 });
  assert.equal(fixture.drag.finish({ x: 500, y: 400 }), null);
  fixture.drag.move({ x: 500, y: 400 });
  fixture.drag.cancel();
  fixture.flushFrame();

  assert.equal(fixture.requestedFrames, 0);
  assert.deepEqual(fixture.cancelledFrames, []);
  assert.deepEqual(fixture.previews, []);
});
