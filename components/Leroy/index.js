import React, { useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Leroy = ({ onDirection = () => {} }) => {
  const [direction, setDirection] = useState()
  const [status, setStatus] = useState('standing')
  
  useHotkeys('left', () => {
    setDirection('left')
    onDirection('left')
    setStatus('running')
  })
  useHotkeys('right', () => {
    setDirection('right')
    onDirection('right')
    setStatus('running')
  })
  useHotkeys('up', () => {
    setDirection('up')
    onDirection('up')
    setStatus('running')
  })
  useHotkeys('down', () => {
    setDirection('down')
    onDirection('down')
    setStatus('running')
  })
  useHotkeys('space', () => {
    setDirection('')
    onDirection('')
    setStatus('standing')
  })

  return (
    <div>
      <div className={status === 'running' ?  'status-running sprite-wrapper' : 'status-standing sprite-wrapper'}></div>

      <style jsx>{`
        .sprite-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 40px;
          height: 44px;
          overflow: hidden;
          background: url('/spritesheet.png') left center;
        }
        .status-standing {
          background-position: 0px 0px;
        }

        @keyframes run {
          0% { background-position: 0px -90px; }
          100% { background-position: -380px -90px; }
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
