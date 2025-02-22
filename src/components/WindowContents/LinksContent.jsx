import React from 'react';

const LinksContent = () => {
  return (
    <div
      style={{
        height: '600px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* строка сверху */}
      <div
        className="toolbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '5px',
          backgroundColor: '#e8e8e8',
          borderBottom: '1px solid #ccc',
        }}
      >
        <div style={{ fontSize: '14px' }}>
          <u>F</u>ile <u>E</u>dit <u>V</u>iew <u>T</u>ools <u>H</u>elp
        </div>
        <div style={{ width: '20px', height: '20px' }}>
          <img
            style={{ width: '20px', height: '20px' }}
            src="resources/ico/search.ico"
            alt=""
          />
        </div>
      </div>

      <div
        className="content"
        style={{
          flex: 1,
          padding: '10px',
          backgroundColor: '#ffffff',
        }}
      >
        <ul
          className="sidebar"
          style={{
            float: 'left',
            width: '200px',
            padding: '5px',
            listStyle: 'none',
          }}
        >
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
            }}
          >
            <img
              src="resources/ico/fav.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Favorites
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/desk.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Desktop
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/download.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Downloads
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/folder.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Links
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginTop: '15px',
            }}
          >
            <img
              src="resources/ico/explorer.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Libraries
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/doc.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Documents
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/music.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Music
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/pic.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Pictures
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginLeft: '15px'
            }}
          >
            <img
              src="resources/ico/vid.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Videos
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '5px',
              marginTop: '15px',
            }}
          >
            <img
              src="resources/ico/pc.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Computer
          </li>
          <li
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '50px',
              marginTop: '35px'
            }}
          >
            <img
              src="resources/ico/net.ico"
              alt="icon"
              style={{ width: '16px', height: '16px', marginRight: '8px' }}
            />
            Network
          </li>
        </ul>

        <div
          className="main-content"
          style={{ marginLeft: '210px' }}
        >
          <p style={{ fontSize: '14px', color: '#555' }}>8 items</p>

          <div
            className='links'
            style={{
              marginTop: '10px',
              display: 'flex',
              gap: '20px',
              alignContent: 'space-evenly',
              justifyContent: 'space-between',
              width: '640px',
              height: '300px'
            }}
          >
            <a target="_blank" href="https://github.com/aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/githublogo.png"
                alt="Github"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Github
              </p>
            </a>

            <a target="_blank" href="https://www.youtube.com/@aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/ytlogo.png"
                alt="YouTube"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Youtube
              </p>
            </a>

            <a
              target="_blank"
              href="https://open.spotify.com/user/5dwbjptmadzo73rzcvhnpxmnj"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/spotifylogo.png"
                alt="Spotify"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '1px',
                }}
              >
                Spotify
              </p>
            </a>

            <a
              target="_blank"
              href="https://steamcommunity.com/id/aerosness"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/steamlogo.png"
                alt="Steam"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              >
                Steam
              </p>
            </a>

            <a
              target="_blank"
              href="https://www.tiktok.com/@aerosness"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/tiktoklogo.png"
                alt="TikTok"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '4px',
                }}
              >
                Tiktok
              </p>
            </a>

            <a
              target="_blank"
              href="https://pinterest.com/aerosness/"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/pinlogo.png"
                alt="Pinterest"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                }}
              >
                Pinterest
              </p>
            </a>

            <a
              target="_blank"
              href="https://www.roblox.com/users/388269305/profile"
            >
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/robloxlogo.png"
                alt="Roblox"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '2px',
                }}
              >
                Roblox
              </p>
            </a>
            <a target="_blank" href="https://x.com/aerosness">
              <img
                style={{ maxWidth: '50px', maxHeight: '50px' }}
                src="resources/img/xicon.png"
                alt="X (Twitter)"
              />
              <p
                style={{
                  textAlign: 'center',
                  position: 'absolute',
                  marginLeft: '20px',
                }}
              >
                X
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksContent;
