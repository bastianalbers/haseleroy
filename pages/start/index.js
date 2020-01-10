import React, { useState } from 'react'
import Link from 'next/link'
import Page from '../../components/Page'
import Level from '../../components/Level'
import Leroy from '../../components/Leroy'
import useRaf from '@rooks/use-raf'

const Start = () => {
  const [leroyDirection, setLeroyDirection] = useState()
  const [leroyPosition, setLeroyPosition] = useState({ top: 0, left: 0 })
  const shouldRun = true

  useRaf(() => {
    if (leroyDirection === 'left') {
      console.log('left')
      const { left } = leroyPosition
      setLeroyPosition({ ...leroyPosition, left: left > 0 ? left - 1  : 0 })
    }
    if (leroyDirection === 'right') {
      const { left } = leroyPosition
      setLeroyPosition({ ...leroyPosition, left: left < 50 ? left + 1  : 50 })
    }
    if (leroyDirection === 'up') {
      const { top } = leroyPosition
      setLeroyPosition({ ...leroyPosition, top: top > 0 ? top - 1  : 0 })
    }
    if (leroyDirection === 'down') {
      const { top } = leroyPosition
      setLeroyPosition({ ...leroyPosition, top: top < 50 ? top + 1  : 50 })
    }
    
  }, shouldRun);

  return (
    <Page>
      <div>
        
        <h1>Start</h1>
        
        <Level>
          <div style={{
            position: 'absolute',
            'transition': 'transform 100ms',
            'transform': `translate3d(${leroyPosition.left * 10}px, ${leroyPosition.top * 10}px, 0)`
          }}>
            <Leroy onDirection={(direction) => setLeroyDirection(direction)} />
          </div>
        </Level>

      </div>  
    </Page>
  )
}

export default Start
