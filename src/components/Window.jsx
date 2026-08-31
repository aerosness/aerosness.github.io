import { useEffect, useId, useRef } from 'react';
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
  }, [interactionEnabled, isActive]);

  const requestFocus = () => {
    if (!isActive && !focusRequestedRef.current) {
      focusRequestedRef.current = true;
      onFocusWindow(windowData.id);
    }
  };

  const beginDrag = (event) => {
    if (
      isCompact ||
      windowData.isMaximized ||
      event.button !== 0 ||
      event.target.closest('.title-bar-controls')
    ) {
      return;
    }

    const windowRectangle = windowRef.current?.getBoundingClientRect();
    if (!windowRectangle) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - windowRectangle.left,
      offsetY: event.clientY - windowRectangle.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  const continueDrag = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState || dragState.pointerId !== event.pointerId) {
      return;
    }

    onMoveWindow(windowData.id, {
      left: event.clientX - dragState.offsetX,
      top: event.clientY - dragState.offsetY,
    });
  };

  const endDrag = (event) => {
    if (dragStateRef.current?.pointerId !== event.pointerId) {
      return;
    }

    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
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
