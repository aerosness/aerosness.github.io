import { useEffect, useId, useLayoutEffect, useRef } from 'react';
import { createWindowDrag } from '../state/windowDrag';
import { getWindowLayout } from '../state/windowManager';

function Window({
  windowData,
  viewport,
  isActive,
  interactionEnabled,
  onFocusWindow,
  onMoveWindow,
  onMinimizeWindow,
  onToggleMaximize,
  onCloseWindow,
  children,
}) {
  const windowRef = useRef(null);
  const dragStateRef = useRef(null);
  const focusRequestedRef = useRef(false);
  const titleId = useId();
  const isCompact = viewport.width <= 768;
  const layout = getWindowLayout(windowData, viewport, isCompact);

  useLayoutEffect(() => {
    const element = windowRef.current;
    return () => {
      const drag = dragStateRef.current;
      if (!drag) return;
      dragStateRef.current = null;
      drag.session.cancel();
      element.style.removeProperty('transform');
      element.style.removeProperty('will-change');
      if (drag.handle.hasPointerCapture(drag.pointerId)) {
        drag.handle.releasePointerCapture(drag.pointerId);
      }
    };
  }, [
    viewport.width,
    viewport.height,
    viewport.safeAreaBottom,
    windowData.isMaximized,
    interactionEnabled,
  ]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    focusRequestedRef.current = false;

    if (
      interactionEnabled &&
      windowRef.current &&
      !windowRef.current.contains(document.activeElement)
    ) {
      windowRef.current.focus({ preventScroll: true });
    }
  }, [interactionEnabled, isActive, windowData.zIndex]);

  const requestFocus = () => {
    if (!isActive && !focusRequestedRef.current) {
      focusRequestedRef.current = true;
      onFocusWindow(windowData.id);
    }
  };

  const beginDrag = (event) => {
    if (
      isCompact ||
      !interactionEnabled ||
      dragStateRef.current ||
      windowData.isMaximized ||
      event.button !== 0 ||
      event.target.closest('.title-bar-controls')
    ) {
      return;
    }

    const element = windowRef.current;
    if (!element) {
      return;
    }

    const position = { left: layout.left, top: layout.top };
    const session = createWindowDrag({
      position,
      pointer: { x: event.clientX, y: event.clientY },
      size: windowData.size,
      viewport,
      onPreview: (nextPosition) => {
        element.style.transform = `translate3d(${nextPosition.left - position.left}px, ${nextPosition.top - position.top}px, 0)`;
      },
    });
    dragStateRef.current = {
      pointerId: event.pointerId,
      handle: event.currentTarget,
      position,
      session,
    };
    element.style.willChange = 'transform';
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const continueDrag = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    dragState.session.move({ x: event.clientX, y: event.clientY });
  };

  const endDrag = (event) => {
    const drag = dragStateRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = null;
    // Cancellation/capture loss keeps the last drag point, not event coordinates.
    const position = drag.session.finish(
      event.type === 'pointerup'
        ? { x: event.clientX, y: event.clientY }
        : undefined,
    );
    const element = windowRef.current;
    element.style.left = `${position.left}px`;
    element.style.top = `${position.top}px`;
    element.style.removeProperty('transform');
    element.style.removeProperty('will-change');
    if (drag.handle.hasPointerCapture(event.pointerId)) {
      drag.handle.releasePointerCapture(event.pointerId);
    }
    if (
      position.left !== drag.position.left ||
      position.top !== drag.position.top
    ) {
      onMoveWindow(windowData.id, position);
    }
  };

  const handleTitleBarDoubleClick = (event) => {
    if (!isCompact && !event.target.closest('.title-bar-controls')) {
      onToggleMaximize(windowData.id);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape' && isActive) {
      event.preventDefault();
      event.stopPropagation();
      onCloseWindow(windowData.id);
    }
  };

  const windowStyle = {
    ...layout,
    zIndex: windowData.zIndex,
    overflow: 'hidden',
  };
  const titleBarHeight = isCompact ? 40 : 30;
  const bodyHeight =
    layout.height === 'auto'
      ? 'auto'
      : `calc(100% - ${titleBarHeight}px)`;
  const bodyMaxHeight = Math.max(0, layout.maxHeight - titleBarHeight);

  return (
    <section
      ref={windowRef}
      className={`window ${isActive ? 'window-active' : 'window-inactive'}`}
      style={windowStyle}
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={`${titleId}-body`}
      data-window-id={windowData.id}
      data-window-state={windowData.isMaximized ? 'maximized' : 'restored'}
      tabIndex={-1}
      onPointerDown={requestFocus}
      onFocusCapture={requestFocus}
      onKeyDown={handleKeyDown}
    >
      <header
        className="title-bar"
        style={{ touchAction: isCompact ? 'auto' : 'none' }}
        onPointerDown={beginDrag}
        onPointerMove={continueDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onDoubleClick={handleTitleBarDoubleClick}
      >
        <img
          aria-hidden="true"
          aria-label="windowicon"
          src={windowData.icon}
          alt=""
          draggable="false"
        />
        <div id={titleId} className="title-bar-text">
          {windowData.title}
        </div>
        <div className="title-bar-controls">
          <button
            type="button"
            aria-label={`Minimize ${windowData.title} window`}
            title="Minimize"
            onClick={() => onMinimizeWindow(windowData.id)}
          />
          {!isCompact && (
            <button
              type="button"
              aria-label={`${windowData.isMaximized ? 'Restore' : 'Maximize'} ${windowData.title} window`}
              title={windowData.isMaximized ? 'Restore' : 'Maximize'}
              onClick={() => onToggleMaximize(windowData.id)}
            />
          )}
          <button
            type="button"
            aria-label={`Close ${windowData.title} window`}
            title="Close"
            onClick={() => onCloseWindow(windowData.id)}
          />
        </div>
      </header>
      <div
        id={`${titleId}-body`}
        className="window-body"
        style={{
          backgroundColor: '#fff',
          width: '100%',
          height: bodyHeight,
          maxHeight: bodyMaxHeight,
          overflow: 'auto',
          border: 'none',
          outline: 'none',
        }}
      >
        {children}
      </div>
    </section>
  );
}

export default Window;
