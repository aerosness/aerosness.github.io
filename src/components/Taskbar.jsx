import { useEffect, useId, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const classicTaskbarIcons = {
  info: '/resources/optimized/taskbar/help.png',
  about: '/resources/optimized/taskbar/doc.png',
  projects: '/resources/optimized/taskbar/projects.png',
  links: '/resources/optimized/taskbar/folder.png',
};

function Taskbar({
  windows,
  activeWindowId,
  onOpenWindow,
  onTaskbarWindow,
  onShowDesktop,
}) {
  const taskbarIconsRef = useRef(null);
  const iconColorsRef = useRef(new Map());
  const startButtonRef = useRef(null);
  const startMenuRef = useRef(null);
  const startMenuId = useId();
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMobile) {
      return undefined;
    }

    const taskbarIcons = taskbarIconsRef.current;
    if (!taskbarIcons) {
      return undefined;
    }

    const cards = taskbarIcons.querySelectorAll('.taskbarbutton');
    const removeImageListeners = [];

    cards.forEach((card) => {
      const taskbarIcon = card.querySelector('.taskbaricon');
      if (!taskbarIcon) return;

      const updateIconColor = () => {
        if (!taskbarIcon.complete || !taskbarIcon.naturalWidth) return;

        const width = taskbarIcon.clientWidth;
        const height = taskbarIcon.clientHeight;
        if (!width || !height) return;

        const cacheKey = `${taskbarIcon.currentSrc || taskbarIcon.src}:${width}x${height}`;
        let color = iconColorsRef.current.get(cacheKey);

        if (!color) {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const context = canvas.getContext('2d');

            if (context) {
              context.drawImage(
                taskbarIcon,
                0,
                0,
                canvas.width,
                canvas.height,
              );

              const imageData = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              ).data;
              let totalRed = 0;
              let totalGreen = 0;
              let totalBlue = 0;

              for (let index = 0; index < imageData.length; index += 4) {
                totalRed += imageData[index];
                totalGreen += imageData[index + 1];
                totalBlue += imageData[index + 2];
              }

              const pixelCount = imageData.length / 4;
              const brighten = (channel) =>
                Math.min(255, (channel / pixelCount) * 1.5);

              color = `rgb(${brighten(totalRed)}, ${brighten(totalGreen)}, ${brighten(totalBlue)})`;
              iconColorsRef.current.set(cacheKey, color);
            }
          } catch {
            // The icon glow is decorative and can be skipped by the browser.
          }
        }

        if (color) card.style.setProperty('--img-colour', color);
      };

      updateIconColor();
      taskbarIcon.addEventListener('load', updateIconColor);
      removeImageListeners.push(() =>
        taskbarIcon.removeEventListener('load', updateIconColor),
      );
    });

    const handleMouseMove = (event) => {
      cards.forEach((card) => {
        const rectangle = card.getBoundingClientRect();
        card.style.setProperty(
          '--mouse-x',
          `${event.clientX - rectangle.left}px`,
        );
        card.style.setProperty(
          '--mouse-y',
          `${event.clientY - rectangle.top}px`,
        );
      });
    };

    taskbarIcons.addEventListener('mousemove', handleMouseMove);
    return () => {
      taskbarIcons.removeEventListener('mousemove', handleMouseMove);
      removeImageListeners.forEach((removeListener) => removeListener());
    };
  }, [isMobile]);

  useEffect(() => {
    if (!showStartMenu) {
      return undefined;
    }

    startMenuRef.current?.querySelector('.start-menu-item')?.focus();

    const handleEscape = (event) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      event.stopPropagation();
      setShowStartMenu(false);
      startButtonRef.current?.focus();
    };

    const handleClickOutside = (event) => {
      if (
        startMenuRef.current &&
        !startMenuRef.current.contains(event.target) &&
        !event.target.closest('.startbutton')
      ) {
        setShowStartMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape, true);
    };
  }, [showStartMenu]);

  const openStartMenuItem = (id) => {
    onOpenWindow(id);
    setShowStartMenu(false);
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
    <div className="taskbar">
      <button
        ref={startButtonRef}
        type="button"
        className={showStartMenu ? 'startbutton startbuttonactive' : 'startbutton'}
        aria-label="Start menu"
        aria-expanded={showStartMenu}
        aria-controls={startMenuId}
        onClick={() => setShowStartMenu((isOpen) => !isOpen)}
      />
      <div className="startorb" aria-hidden="true" />

      <div className="taskbaricons" id="taskbaricons" ref={taskbarIconsRef}>
        {windows.map((windowData) => (
          <button
            key={windowData.id}
            type="button"
            className={`taskbarbutton ${
              activeWindowId === windowData.id ? 'taskbarfocused' : ''
            }`}
            aria-label={windowData.title}
            onClick={() => onTaskbarWindow(windowData.id)}
          >
            <img
              className="taskbaricon"
              draggable="false"
              src={classicTaskbarIcons[windowData.id] ?? windowData.icon}
              alt={windowData.title}
            />
          </button>
        ))}
      </div>

      <div
        className="datetime"
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
        <div>{timeString}</div>
        <div>{dateString}</div>
      </div>

      <div
        className="aeropeek"
        role="button"
        tabIndex="0"
        aria-label="Show desktop"
        onClick={onShowDesktop}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onShowDesktop();
          }
        }}
      />

      {showStartMenu && (
        <div
          ref={startMenuRef}
          id={startMenuId}
          className="start"
          role="navigation"
          aria-label="Start menu shortcuts"
        >
          <div className="startrightcontainer">
            <div className="profileicon startprofileimage">
              <img
                src="/resources/svg/avframe.svg"
                className="glass profile-border"
                alt=""
              />
              <img
                src="/resources/img/pfp2.jpg"
                className="profileimg"
                alt="Semyon Tyo"
              />
            </div>

            <div className="startmenuexplorebuttons">
              <button
                type="button"
                className="StartMenuButton"
                onClick={() => openStartMenuItem('info')}
              >
                Welcome
              </button>
              <button
                type="button"
                className="StartMenuButton"
                onClick={() => openStartMenuItem('links')}
              >
                Links
              </button>
              <button
                type="button"
                className="StartMenuButton"
                onClick={() => openStartMenuItem('projects')}
              >
                Projects
              </button>
              <button
                type="button"
                className="StartMenuButton"
                onClick={() => openStartMenuItem('about')}
              >
                About Me
              </button>
            </div>
          </div>

          <div className="startinner">
            <div className="start-menu-items">
              <div
                className="start-menu-item"
                role="button"
                tabIndex="0"
                onClick={() => openStartMenuItem('info')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openStartMenuItem('info');
                  }
                }}
              >
                <img
                  src="/resources/optimized/icons/help-64.webp"
                  alt=""
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Welcome</span>
              </div>
              <div
                className="start-menu-item"
                role="button"
                tabIndex="0"
                onClick={() => openStartMenuItem('links')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openStartMenuItem('links');
                  }
                }}
              >
                <img
                  src="/resources/optimized/icons/folder-64.webp"
                  alt=""
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Links</span>
              </div>
              <div
                className="start-menu-item"
                role="button"
                tabIndex="0"
                onClick={() => openStartMenuItem('projects')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openStartMenuItem('projects');
                  }
                }}
              >
                <img
                  src="/resources/optimized/icons/projects-64.webp"
                  alt=""
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Projects</span>
              </div>
              <div
                className="start-menu-item"
                role="button"
                tabIndex="0"
                onClick={() => openStartMenuItem('about')}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openStartMenuItem('about');
                  }
                }}
              >
                <img
                  src="/resources/optimized/icons/information-64.webp"
                  alt=""
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>About Me</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Taskbar;
