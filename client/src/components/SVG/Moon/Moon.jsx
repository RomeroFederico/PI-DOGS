import React from 'react';

import s from './Moon.module.css';

export default function Mon({ style }) {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" >
      <g className = {s.moon}>
        <path d="M63.4374046 38.4606323c-.4258003-.2060013-.9384995-.0848999-1.2276001.2910995-1.2803001 1.6650009-2.9452972 3.2001991-4.9501991 4.5625-11.6180992 7.8808022-27.544899 4.9248009-35.4971008-6.5956993-7.8154011-11.3204002-4.9902-26.9736996 6.2968998-34.8936005.3799-.2666.5263996-.7588.3544998-1.1895001-.1728001-.4316-.625-.6835-1.0771008-.6181-4.6474991.6953-9.2070999 2.4902-13.1875 5.1893997C6.9706059 10.0759325 2.1415057 17.427433.5526057 25.9079323c-1.582 8.4414024.2402 16.9932022 5.1308002 24.0791016 6.2872 9.1054993 16.4864006 14.0058975 26.8554993 14.0058975 6.3173981 0 12.6982994-1.819397 18.2939987-5.6161995 6.5800018-4.461998 11.2461014-11.1298981 13.1406021-18.7753983.1142015-.4589996-.1104002-.9356003-.5361014-1.1407013zM49.7098045 56.7224312c-13.8710976 9.410099-32.8847961 5.8828011-42.3798981-7.872097-4.5858998-6.642601-6.2948999-14.660202-4.8114996-22.5742016 1.4901987-7.9522 6.0194989-14.8466997 12.7538987-19.4150996 2.5801001-1.75 5.4189997-3.0937002 8.3643007-3.9726-9.3916006 9.0702991-11.1416006 23.9258003-3.5205002 34.9668007 8.5741997 12.4188995 25.7422009 15.6094017 38.2666016 7.1133003.8260994-.5606003 1.5996017-1.149498 2.3182983-1.764698-2.2207012 5.4433961-6.0244007 10.1503968-10.9912014 13.5185952z" fill = 'var(--fontColor)'/>
      </g>
    </svg>
  );
}