import React from 'react'
import classnames from 'classnames'
import style from './Online.module.css'

export const COMM_STATUS = {
  OFFLINE: 0,
  ONLINE: 1,
  PAUSED: 2,
}

export default function Online({status, onClick} = {status: COMM_STATUS.OFFLINE}) {
  return (
    <svg
      viewBox="0 0 26 26"
      className={classnames(style.online, {[style.offline]: status===COMM_STATUS.OFFLINE, [style.paused]: status===COMM_STATUS.PAUSED})}
      onClick={onClick}
    >
      <path d="M 20.28125 4.0625 A 1.50015 1.50015 0 0 0 19.375 6.65625 C 20.992549 8.2815134 22 10.506727 22 13 C 22 15.483121 20.995019 17.716012 19.375 19.34375 A 1.5026019 1.5026019 0 1 0 21.5 21.46875 C 23.657981 19.300488 25 16.290879 25 13 C 25 9.7032729 23.656451 6.6979866 21.5 4.53125 A 1.50015 1.50015 0 0 0 20.4375 4.0625 A 1.50015 1.50015 0 0 0 20.28125 4.0625 z M 5.375 4.09375 A 1.50015 1.50015 0 0 0 4.5 4.53125 C 2.3420192 6.6995123 1 9.7091205 1 13 C 1 16.296727 2.3435486 19.302013 4.5 21.46875 A 1.5026019 1.5026019 0 1 0 6.625 19.34375 C 5.0074514 17.718487 4 15.493273 4 13 C 4 10.516879 5.0049808 8.2839877 6.625 6.65625 A 1.50015 1.50015 0 0 0 5.375 4.09375 z M 9.1875 7.40625 A 1.50015 1.50015 0 0 0 8.3125 7.8125 C 6.9007253 9.0933901 6 10.953421 6 13 C 6 15.04766 6.8692776 16.909213 8.28125 18.1875 A 1.5040635 1.5040635 0 1 0 10.3125 15.96875 C 9.5064724 15.239037 9 14.19034 9 13 C 9 11.816579 9.5022747 10.76636 10.3125 10.03125 A 1.50015 1.50015 0 0 0 9.1875 7.40625 z M 16.59375 7.40625 A 1.50015 1.50015 0 0 0 15.6875 10.03125 C 16.493528 10.760963 17 11.80966 17 13 C 17 14.183421 16.497725 15.23364 15.6875 15.96875 A 1.50015 1.50015 0 1 0 17.6875 18.1875 C 19.099275 16.90661 20 15.046579 20 13 C 20 10.95234 19.130722 9.090787 17.71875 7.8125 A 1.50015 1.50015 0 0 0 16.59375 7.40625 z M 13 11.1875 C 11.997 11.1875 11.1875 11.996 11.1875 13 C 11.1875 14 11.997 14.8125 13 14.8125 C 14.003 14.8125 14.8125 14 14.8125 13 C 14.8125 11.996 14.003 11.1875 13 11.1875 z"/>

      <line
        x1="0"
        y1="0"
        x2="26"
        y2="26"
        stokelinecap="round"
        strokeWidth="2.5"
        stroke={status===COMM_STATUS.OFFLINE?'#F44336':'#FF9800'}
        className={classnames({
          [style.hidden]: status===COMM_STATUS.ONLINE
        })}
      />
    </svg>
  )
}
