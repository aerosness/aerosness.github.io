import { useEffect, useRef } from 'react';

function LoginOverlay({ onEnter }) {
  const enterButtonRef = useRef(null);

  useEffect(() => {
    enterButtonRef.current?.focus();
  }, []);

  const enterPortfolio = (playStartupSound = false) => {
    if (playStartupSound) {
      const startupAudio = new Audio('/resources/audio/startup.mp3');
      void startupAudio.play().catch(() => {});
    }

    onEnter();
  };

  const handleDialogKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      enterPortfolio();
    }

    if (event.key === 'Tab') {
      const buttons = Array.from(
        event.currentTarget.querySelectorAll('.login-actions button'),
      );
      if (buttons.length === 0) return;

      const currentIndex = buttons.indexOf(document.activeElement);
      const direction = event.shiftKey ? -1 : 1;
      const nextIndex =
        (currentIndex + direction + buttons.length) % buttons.length;
      event.preventDefault();
      buttons[nextIndex].focus();
    }
  };

  return (
    <section
      className="login-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      aria-describedby="login-description"
      onKeyDown={handleDialogKeyDown}
    >
      <h1 id="login-title" className="login-title">
        Semyon Tyo
      </h1>
      <p className="login-kicker">Frontend-focused full-stack developer</p>
      <p id="login-description" className="login-description">
        Enter an interactive Windows 7-inspired portfolio. Choose the quiet
        option—or press Escape—to skip the startup sound.
      </p>

      <div
        className="profileicon"
        aria-hidden="true"
      >
        <img
          src="/resources/svg/avframe.svg"
          className="glass profile-border"
          alt=""
        />
        <img
          src="/resources/img/pfp.jpg"
          className="profileimg"
          alt=""
        />
      </div>
      <div className="login-actions">
        <button
          ref={enterButtonRef}
          type="button"
          className="forwardbtn"
          onClick={() => enterPortfolio(true)}
        >
          Enter portfolio
        </button>
        <button
          type="button"
          className="quietbtn"
          onClick={() => enterPortfolio(false)}
        >
          Continue quietly
        </button>
      </div>
    </section>
  );
}

export default LoginOverlay;
