import React from 'react';

const InfoContent = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        backgroundImage: 'url(resources/img/helpbg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        <div
          style={{
            position: 'relative',
            width: '220px',
            height: '220px',
            marginRight: '20px',
            borderRadius: '10%',
            overflow: 'hidden',
          }}
        >
          <img
            src="resources/svg/avframe.svg"
            alt="Avatar Frame"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 999,
              width: '100%',
              height: '100%',
            }}
          />
          <img
            src="resources/img/pfp.jpg"
            alt="Profile"
            style={{
              position: 'absolute',
              top: '15px',
              left: '15px',
              width: '190px',
              height: '190px',
              objectFit: 'cover',
              borderRadius: '5%',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '35px' }}>
          <h2 style={{ margin: '0 0 5px 0' }}>Semyon</h2>
          <p style={{ margin: '0 0 5px 0' }}>he/him</p>
          <p style={{ margin: '0 0 5px 0' }}>17 years</p>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
            <img
              src="resources/img/pin.png"
              alt="Location"
              style={{ width: '16px', height: '16px', marginRight: '5px' }}
            />
            <span>Almaty, Kazakhstan</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
            <a href="https://github.com/aerosness" target="_blank" rel="noopener noreferrer">
              <img
                src="resources/img/githublogo.png"
                alt="GitHub"
                style={{ width: '24px', height: '24px' }}
              />
            </a>
            <a href="mailto:aerosness@gmail.com">
              <img
                src="resources/img/mail.png"
                alt="Mail"
                style={{ width: '24px', height: '24px' }}
              />
            </a>
            <a href="https://t.me/aerosness" target="_blank" rel="noopener noreferrer">
              <img
                src="resources/img/tg.png"
                alt="Telegram"
                style={{ width: '24px', height: '24px' }}
              />
            </a>
            <a href="https://aerosness.github.io/Semyon_Tyo.pdf" target="_blank" rel="noopener noreferrer" style={{marginLeft: '-5px'}}>
              <img
                src="resources/img/cv.png"
                alt="Telegram"
                style={{ width: '28px', height: '24px' }}
              />
            </a>
          </div>
        </div>
      </div>
      
      <div
        style={{
          backgroundColor: 'white',
          padding: '10px',
          borderRadius: '4px',
          marginTop: '20px',
          alignSelf: 'center',
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <p style={{ margin: 0, textAlign: 'center', opacity: '100%' }}>
          {/*Тотально переписать и переделать*/}
          Hi! This site is my portfolio/website styled like Windows 7.
          I'm mostly a web developer with a passion for creating innovative and impactful applications❤️
        </p>
      </div>
      
      {/* TODO: надо чето подумать както насчет че можно вместо рекламы или удалить*/}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '25px',
        }}
      >
        <img
          src="resources/img/advert1.png"
          alt="Advert 1"
          style={{ maxWidth: '300px', maxHeight: '150px' }}
        />
        <img
          src="resources/img/advert2.png"
          alt="Advert 2"
          style={{ maxWidth: '300px', maxHeight: '150px' }}
        />
      </div>
    </div>
  );
};

export default InfoContent;
