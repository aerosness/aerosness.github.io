import { isWindowOpen } from '../state/windowManager';

const desktopIconStyle = {
  width: '90px',
  height: '75px',
  marginBottom: '10px',
  position: 'relative',
  minWidth: 0,
  minHeight: 0,
  padding: 0,
  border: 0,
  boxShadow: 'none',
  background: 'transparent',
};

const desktopIconContentStyle = {
  userSelect: 'none',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

function Desktop({ windows, onOpenWindow }) {
  return (
    <nav className="desktop" aria-label="Desktop shortcuts">
      {windows.map((windowData) => {
        const windowIsOpen = isWindowOpen(windowData);

        return (
          <button
            key={windowData.id}
            type="button"
            className="desktopicon desktop-icon-button"
            style={desktopIconStyle}
            aria-label={`${windowIsOpen ? 'Switch to' : 'Open'} ${windowData.title}`}
            aria-haspopup="dialog"
            data-window-status={windowData.status}
            onClick={() => onOpenWindow(windowData.id)}
          >
            <span style={desktopIconContentStyle}>
              <img
                src={windowData.icon}
                alt=""
                width="50"
                height="50"
                draggable="false"
                style={{
                  maxHeight: '50px',
                  width: 'auto',
                  display: 'block',
                  margin: '0 auto',
                }}
              />
              <span
                style={{ color: 'white', margin: 0, fontSize: '0.8em' }}
              >
                {windowData.title}
              </span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default Desktop;
