import { useEffect, useRef, useState } from 'react';
import { isWindowOpen, isWindowVisible } from '../state/windowManager';

const startMenuIconStyle = {
  marginRight: '5px',
  width: '40px',
  height: '40px',
};

const classicTaskbarIcons = {
  info: '/resources/ico/help.ico',
  about: '/resources/ico/doc.ico',
  projects: '/resources/ico/projects.ico',
  links: '/resources/ico/folder.ico',
};

const leftStartMenuItems = [
  {
    id: 'info',
    label: 'Info',
    icon: '/resources/optimized/icons/help-64.webp',
  },
  {
    id: 'links',
    label: 'Links',
    icon: '/resources/optimized/icons/folder-64.webp',
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: '/resources/optimized/icons/projects-64.webp',
  },
  {
    id: 'about',
    label: 'About Me',
    icon: '/resources/optimized/icons/information-64.webp',
  },
];

const rightStartMenuItems = [
  { id: 'info', label: 'Info' },
  { id: 'links', label: 'Links' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About Me' },
];

function getVisibleStartMenuItems(menu) {
  if (!menu) {
    return [];
  }

  const orderedItems = [
    ...menu.querySelectorAll('.startinner [role="menuitem"]'),
    ...menu.querySelectorAll('.startrightcontainer [role="menuitem"]'),
  ];

  return orderedItems.filter((item) => item.getClientRects().length > 0);
}

function getTaskbarActionLabel(windowData, activeWindowId) {
  if (isWindowVisible(windowData)) {
    return activeWindowId === windowData.id
      ? `Minimize ${windowData.title}`
      : `Switch to ${windowData.title}`;
  }

  return `${isWindowOpen(windowData) ? 'Restore' : 'Open'} ${windowData.title}`;
}

function cacheTaskbarIconColor(event) {
  const icon = event.currentTarget;
  const taskbarButton = icon.closest('.taskbarbutton');
  if (!taskbarButton || taskbarButton.dataset.iconColorReady === 'true') {
    return;
  }

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return;
    }

    context.drawImage(icon, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let red = 0;
    let green = 0;
    let blue = 0;
    let visiblePixels = 0;

    for (let index = 0; index < pixels.length; index += 4) {
      if (pixels[index + 3] === 0) {
        continue;
      }

      red += pixels[index];
      green += pixels[index + 1];
      blue += pixels[index + 2];
      visiblePixels += 1;
    }

    if (visiblePixels > 0) {
      const brighten = (channel) =>
        Math.min(255, Math.round((channel / visiblePixels) * 1.5));
      taskbarButton.style.setProperty(
        '--img-colour',
        `rgb(${brighten(red)}, ${brighten(green)}, ${brighten(blue)})`,
      );
      taskbarButton.dataset.iconColorReady = 'true';
    }
  } catch {
    // The glow is decorative; a browser that cannot sample the icon can skip it.
  }
}

function updateTaskbarPointerGlow(event) {
  const rectangle = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty(
    '--mouse-x',
    `${event.clientX - rectangle.left}px`,
  );
  event.currentTarget.style.setProperty(
    '--mouse-y',
    `${event.clientY - rectangle.top}px`,
  );
}

function Taskbar({
  windows,
  activeWindowId,
  isShowingDesktop,
  isCompact,
  onOpenWindow,
  onTaskbarWindow,
  onShowDesktop,
}) {
  const startButtonRef = useRef(null);
  const startMenuRef = useRef(null);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    let minuteInterval = null;
    const millisecondsUntilNextMinute =
      60_000 - (Date.now() % 60_000) + 50;
    const minuteTimeout = window.setTimeout(() => {
      setCurrentTime(new Date());
      minuteInterval = window.setInterval(
        () => setCurrentTime(new Date()),
        60_000,
      );
    }, millisecondsUntilNextMinute);

    return () => {
      window.clearTimeout(minuteTimeout);
      if (minuteInterval !== null) {
        window.clearInterval(minuteInterval);
      }
    };
  }, []);

  useEffect(() => {
    if (!showStartMenu) {
      return undefined;
    }

    const focusFrame = window.requestAnimationFrame(() => {
      getVisibleStartMenuItems(startMenuRef.current)[0]?.focus({
        preventScroll: true,
      });
    });

    const handlePointerDownOutside = (event) => {
      const clickWasOnStartButton = startButtonRef.current?.contains(
        event.target,
      );
      const clickWasInStartMenu = startMenuRef.current?.contains(event.target);

      if (!clickWasOnStartButton && !clickWasInStartMenu) {
        setShowStartMenu(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowStartMenu(false);
        startButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('pointerdown', handlePointerDownOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener('pointerdown', handlePointerDownOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [showStartMenu]);

  const openStartMenuItem = (id) => {
    setShowStartMenu(false);
    onOpenWindow(id);
  };

  const handleStartMenuKeyDown = (event) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
      return;
    }

    const menuItems = getVisibleStartMenuItems(startMenuRef.current);
    if (menuItems.length === 0) {
      return;
    }

    event.preventDefault();
    const currentIndex = menuItems.indexOf(document.activeElement);
    let nextIndex;

    if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = menuItems.length - 1;
    } else if (event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1 + menuItems.length) % menuItems.length;
    } else {
      nextIndex =
        (currentIndex - 1 + menuItems.length) % menuItems.length;
    }

    menuItems[nextIndex].focus();
  };

  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = currentTime.toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <footer className="taskbar" aria-label="Windows taskbar">
      <div className="start-control">
        <button
          ref={startButtonRef}
          type="button"
          className={`startbutton ${showStartMenu ? 'startbuttonactive start-menu-open' : ''}`}
          aria-label="Start menu"
          aria-haspopup="menu"
          aria-expanded={showStartMenu}
          aria-controls="portfolio-start-menu"
          title="Start"
          onClick={() => setShowStartMenu((isOpen) => !isOpen)}
        />
        <div className="startorb" aria-hidden="true" />
      </div>

      <div className="taskbaricons" role="toolbar" aria-label="Applications">
        {windows.map((windowData) => {
          const isActive =
            isWindowVisible(windowData) &&
            activeWindowId === windowData.id;
          const actionLabel = getTaskbarActionLabel(
            windowData,
            activeWindowId,
          );

          return (
            <button
              key={windowData.id}
              type="button"
              className={`taskbarbutton ${isActive ? 'taskbarfocused' : ''}`}
              aria-label={actionLabel}
              aria-pressed={isActive}
              title={actionLabel}
              data-window-status={windowData.status}
              onPointerMove={isCompact ? undefined : updateTaskbarPointerGlow}
              onClick={() => onTaskbarWindow(windowData.id)}
            >
              <img
                className="taskbaricon"
                draggable="false"
                src={classicTaskbarIcons[windowData.id] ?? windowData.icon}
                alt=""
                width="35"
                height="35"
                onLoad={cacheTaskbarIconColor}
              />
            </button>
          );
        })}
      </div>

      <time
        className="datetime"
        dateTime={currentTime.toISOString()}
        aria-label={`${timeString}, ${dateString}`}
        style={{
          position: 'absolute',
          right: '40px',
          top: 0,
          width: '60px',
          height: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '12px',
          lineHeight: '14px',
          textAlign: 'center',
        }}
      >
        <span aria-hidden="true">{timeString}</span>
        <span aria-hidden="true">{dateString}</span>
      </time>

      <button
        type="button"
        className="aeropeek aeropeek-button"
        aria-label={isShowingDesktop ? 'Restore open windows' : 'Show desktop'}
        aria-pressed={isShowingDesktop}
        title={isShowingDesktop ? 'Restore open windows' : 'Show desktop'}
        style={{
          minWidth: 0,
          minHeight: 0,
          padding: 0,
          border: 0,
          borderRadius: 0,
        }}
        onClick={onShowDesktop}
      />

      {showStartMenu && (
        <div
          ref={startMenuRef}
          id="portfolio-start-menu"
          className="start"
          role="menu"
          aria-label="Start menu"
          onKeyDown={handleStartMenuKeyDown}
        >
          <div className="startrightcontainer" role="presentation">
            <div
              className="profileicon startprofileimage"
              aria-hidden="true"
            >
              <img
                src="/resources/svg/avframe.svg"
                className="glass profile-border"
                alt=""
              />
              <img
                src="/resources/img/pfp2.jpg"
                className="profileimg"
                alt=""
              />
            </div>

            <div className="startmenuexplorebuttons" role="presentation">
              {rightStartMenuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className="StartMenuButton"
                  onClick={() => openStartMenuItem(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="startinner" role="presentation">
            <div className="start-menu-items" role="presentation">
              {leftStartMenuItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className="start-menu-item start-menu-item-button"
                  onClick={() => openStartMenuItem(item.id)}
                >
                  <img
                    src={item.icon}
                    alt=""
                    width="40"
                    height="40"
                    style={startMenuIconStyle}
                  />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}

export default Taskbar;
