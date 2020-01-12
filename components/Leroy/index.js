import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Leroy = ({ direction = '', onDirection = () => {} }) => {
  const status = direction === '' ? 'standing' : 'running'

  useHotkeys('left', () => {
    onDirection('left')
  })
  useHotkeys('right', () => {
    onDirection('right')
  })
  useHotkeys('up', () => {
    onDirection('up')
  })
  useHotkeys('down', () => {
    onDirection('down') 
  })
  useHotkeys('space', () => {
    onDirection('')
  })

  return (
    <div>
      <div className={status === 'running' ?  'status-running sprite-wrapper' : 'status-standing sprite-wrapper'}></div>

      <style jsx>{`
        .sprite-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 20px;
          height: 25px;
          overflow: hidden;
          background: url('/spritesheet.png') left center;
          background-size: 200px 100px;
        }
        .status-standing {
          background-position: 0px 0px;
        }

        @keyframes run {
          0% { background-position: 0px -45px; }
          100% { background-position: -190px -45px; }
        }

        .status-running {
          animation-name: run;
          animation-duration: 0.8s;
          animation-timing-function: steps(10);
          animation-delay: 0s;
          animation-iteration-count: infinite;
          animation-direction: normal;
          animation-fill-mode: none;
          animation-play-state: running;
        }
        .status-standing {
          background-position: 0px 0px;
        }
        .status-standing {
          background-position: 0px 0px;
        }

      `}</style>
    </div>
  )
}

export default Leroy
