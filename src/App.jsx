import { useEffect, useReducer, useState } from 'react';
import AboutContent from './components/WindowContents/AboutContent';
import InfoContent from './components/WindowContents/InfoContent';
import LinksContent from './components/WindowContents/LinksContent';
import ProjectsContent from './components/WindowContents/ProjectsContent';
import Desktop from './components/Desktop';
import LoginOverlay from './components/LoginOverlay';
import Taskbar from './components/Taskbar';
import Window from './components/Window';
import { useViewport } from './hooks/useViewport';
import {
  INITIAL_WINDOWS,
  WINDOW_ACTIONS,
  createWindowManagerState,
  isWindowVisible,
  windowManagerReducer,
} from './state/windowManager';
import './App.css';

function getWindowContent(windowId, openWindow) {
  switch (windowId) {
    case 'links':
      return <LinksContent />;
    case 'info':
      return <InfoContent openWindow={openWindow} />;
    case 'projects':
      return <ProjectsContent />;
    case 'about':
      return <AboutContent />;
    default:
      return null;
  }
}

function App() {
  const viewport = useViewport();
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return window.sessionStorage.getItem('portfolio-intro-seen') === 'true';
    } catch {
      return false;
    }
  });
  const [windowState, dispatch] = useReducer(
    windowManagerReducer,
    viewport,
    (initialViewport) =>
      createWindowManagerState(INITIAL_WINDOWS, initialViewport),
  );

  useEffect(() => {
    dispatch({
      type: WINDOW_ACTIONS.CLAMP_TO_VIEWPORT,
      viewport,
    });
  }, [viewport]);

  const openWindow = (id) => {
    dispatch({ type: WINDOW_ACTIONS.OPEN, id });
  };

  const focusWindow = (id) => {
    dispatch({ type: WINDOW_ACTIONS.FOCUS, id });
  };

  const moveWindow = (id, position) => {
    dispatch({
      type: WINDOW_ACTIONS.MOVE,
      id,
      position,
      viewport,
    });
  };

  const enterPortfolio = () => {
    try {
      window.sessionStorage.setItem('portfolio-intro-seen', 'true');
    } catch {
      // Storage can be unavailable in privacy modes; entering should still work.
    }
    setHasEntered(true);
  };

  const desktopIsInert = !hasEntered;

  return (
    <div
      className="desktop-container"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {desktopIsInert && (
        <LoginOverlay onEnter={enterPortfolio} />
      )}

      <div
        className="desktop-shell"
        aria-hidden={desktopIsInert || undefined}
        inert={desktopIsInert}
        style={{ position: 'relative', width: '100%', height: '100%' }}
      >
        <Desktop windows={windowState.windows} onOpenWindow={openWindow} />

        {windowState.windows.map(
          (windowData) =>
            isWindowVisible(windowData) && (
              <Window
                key={windowData.id}
                windowData={windowData}
                viewport={viewport}
                isActive={windowState.activeWindowId === windowData.id}
                interactionEnabled={hasEntered}
                onFocusWindow={focusWindow}
                onMoveWindow={moveWindow}
                onMinimizeWindow={(id) =>
                  dispatch({ type: WINDOW_ACTIONS.MINIMIZE, id })
                }
                onToggleMaximize={(id) =>
                  dispatch({ type: WINDOW_ACTIONS.TOGGLE_MAXIMIZE, id })
                }
                onCloseWindow={(id) =>
                  dispatch({ type: WINDOW_ACTIONS.CLOSE, id })
                }
              >
                {getWindowContent(windowData.id, openWindow)}
              </Window>
            ),
        )}

        <Taskbar
          windows={windowState.windows}
          activeWindowId={windowState.activeWindowId}
          isShowingDesktop={Boolean(windowState.desktopSnapshot)}
          isCompact={viewport.width <= 768}
          onOpenWindow={openWindow}
          onTaskbarWindow={(id) =>
            dispatch({ type: WINDOW_ACTIONS.TASKBAR_ACTIVATE, id })
          }
          onShowDesktop={() =>
            dispatch({ type: WINDOW_ACTIONS.SHOW_DESKTOP })
          }
        />
      </div>
    </div>
  );
}

export default App;
