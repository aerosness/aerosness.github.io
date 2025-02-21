import React, { useEffect, useRef, useState } from 'react';

const Taskbar = ({
  windows,
  activeWindowId,
  toggleWindowVisibility,
  bringToFront,
  hideAllWindows,
  openWindow,
  minimizeWindow, // функция минимизации окна (устанавливает visible: false)
}) => {
  const taskbarIconsRef = useRef(null);
  const startMenuRef = useRef(null);
  const [showStartMenu, setShowStartMenu] = useState(false);

  // логика даты и времени боже храни джаваскрипт
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const timeString = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const dateString = currentTime.toLocaleDateString([], {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  // градиентик иконок при наведении очень сложно и очень необезательно но я в инете увидел прикольно
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!taskbarIconsRef.current) return;

      // чекаем иконки
      const cards = taskbarIconsRef.current.querySelectorAll('.taskbarbutton');

      cards.forEach((card) => {
        // Получаем иконку внутри кнопки
        const taskbarIcon = card.querySelector('.taskbaricon');
        if (taskbarIcon) {
          // создаём временный canvas для обработки изображения
          const canvas = document.createElement('canvas');
          canvas.width = taskbarIcon.clientWidth;
          canvas.height = taskbarIcon.clientHeight;
          const ctx = canvas.getContext('2d');

          // рисуем изображение иконки на canvas
          ctx.drawImage(taskbarIcon, 0, 0, canvas.width, canvas.height);
          // чекаем пиксельные данные изображения
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

          // ыычисляем средний цвет изображения
          let totalR = 0, totalG = 0, totalB = 0;
          for (let i = 0; i < imageData.length; i += 4) {
            totalR += imageData[i];     // red
            totalG += imageData[i + 1]; // green
            totalB += imageData[i + 2]; // blue
          }

          // колво пикселей (каждый пиксель имеет 4 значения: R, G, B, A)
          const numPixels = imageData.length / 4;
          // рассчитываем средние значения цветов
          const averageR = Math.round(totalR / numPixels);
          const averageG = Math.round(totalG / numPixels);
          const averageB = Math.round(totalB / numPixels);
          // увеличиваем яркость изображения
          const brightnessMultiplier = 1.5;
          const brighterR = Math.min(255, averageR * brightnessMultiplier);
          const brighterG = Math.min(255, averageG * brightnessMultiplier);
          const brighterB = Math.min(255, averageB * brightnessMultiplier);

          // формируем строку с цветом в формате RGB
          const brighterColor = `rgb(${brighterR}, ${brighterG}, ${brighterB})`;

          // устанавливаем этот цвет в css
          card.style.setProperty('--img-colour', brighterColor);
        }
        // получаем координаты кнопки на экране
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // курсор по иксу относительно кнопки
        const y = e.clientY - rect.top;  // курсор по y относительно кнопки

        // устанавливаем css переменные используемые для анимации или эффекта
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const taskbarIcons = taskbarIconsRef.current;
    if (taskbarIcons) {
      taskbarIcons.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (taskbarIcons) {
        taskbarIcons.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // если кликаешь вне стартменю пока он окрыт он скрываеться
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (startMenuRef.current && !startMenuRef.current.contains(e.target)) {
        setShowStartMenu(false);
      }
    };

    if (showStartMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showStartMenu]);

  // открытие/закрытие startmenu через кнопку
  const handleStartMenuApp = (id) => {
    if (openWindow) {
      openWindow(id);
    }
    setShowStartMenu(false);
  };

  return (
    <div className="taskbar">
      {/* кнопка пуск */}
      <button
        className="startbutton"
        onClick={() => setShowStartMenu((prev) => !prev)}
      ></button>
      <div className="startorb"></div>
      {/* иконки */}
      <div className="taskbaricons" id="taskbaricons" ref={taskbarIconsRef}>
        {windows.map((w) => (
          <button
            key={w.id}
            className={`taskbarbutton ${
              activeWindowId === w.id ? 'taskbarfocused' : ''
            }`}
            onClick={() => {
              if (w.visible) {
                if (activeWindowId === w.id) {
                  minimizeWindow(w.id);
                } else {
                  bringToFront(w.id);
                }
              } else {
                openWindow(w.id);
              }
            }}
          >
            <img
              className="taskbaricon"
              draggable="false"
              src={w.icon}
              alt={w.title}
            />
          </button>
        ))}
      </div>

      {/* дата/время */}
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

      {/* aeropeek */}
      <div
        className="aeropeek"
        onClick={() => {
          hideAllWindows();
        }}
      ></div>

      {/* виндовс меню */}
      {showStartMenu && (
        <div ref={startMenuRef} className="start">
          <div className="startrightcontainer">
            <div className="profileicon startprofileimage">
              <img
                src="resources/svg/avframe.svg"
                className="glass profile-border"
                alt="Avatar Frame"
              />
              <img
                src="resources/img/pfp.jpg"
                className="profileimg"
                alt="Profile"
              />
            </div>

            {/* кнопки приложений */}
            <div className="startmenuexplorebuttons">
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('info')}
              >
                Info
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('links')}
              >
                Links
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('projects')}
              >
                Projects
              </button>
              <button
                className="StartMenuButton"
                onClick={() => handleStartMenuApp('about')}
              >
                About Me
              </button>
            </div>
          </div>
          <div className="startinner">
            <div className="start-menu-items">
              <div
                className="start-menu-item"
                onClick={() => handleStartMenuApp('info')}
              >
                <img
                  src="resources/ico/help.ico"
                  alt="Info Icon"
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Info</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => handleStartMenuApp('links')}
              >
                <img
                  src="resources/ico/folder.ico"
                  alt="Links Icon"
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Links</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => handleStartMenuApp('projects')}
              >
                <img
                  src="resources/ico/projects.ico"
                  alt="Projects Icon"
                  style={{ marginRight: '5px', width: '40px', height: '40px' }}
                />
                <span>Projects</span>
              </div>
              <div
                className="start-menu-item"
                onClick={() => handleStartMenuApp('about')}
              >
                <img
                  src="resources/img/information.png"
                  alt="About Icon"
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
};

export default Taskbar;
