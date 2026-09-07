import { clampWindowPosition } from './windowManager.js';

// Keep pointer traffic out of React and show only the latest move each frame.
export function createWindowDrag({
  position,
  pointer,
  size,
  viewport,
  onPreview,
  requestFrame = requestAnimationFrame,
  cancelFrame = cancelAnimationFrame,
}) {
  let nextPosition = position;
  let frame = null;
  let active = true;

  const updatePosition = (nextPointer) => {
    nextPosition = clampWindowPosition(
      {
        left: position.left + nextPointer.x - pointer.x,
        top: position.top + nextPointer.y - pointer.y,
      },
      size,
      viewport,
    );
  };

  const cancel = () => {
    active = false;
    if (frame !== null) {
      cancelFrame(frame);
      frame = null;
    }
  };

  return {
    move(nextPointer) {
      if (!active) return;
      updatePosition(nextPointer);
      if (frame !== null) return;

      frame = requestFrame(() => {
        frame = null;
        if (active) onPreview(nextPosition);
      });
    },
    finish(nextPointer) {
      if (!active) return null;
      if (nextPointer) updatePosition(nextPointer);
      cancel();
      return nextPosition;
    },
    cancel,
  };
}
