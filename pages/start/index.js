import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Page from '../../components/Page'
import Level from '../../components/Level'
import Leroy from '../../components/Leroy'
// import useRaf from '@rooks/use-raf'


const useAudio = url => {
  if (typeof window === 'undefined') return []
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};



const Hose = () => {
  return (<div>👖</div>)
}
const Shirt = () => {
  return (<div>🥼</div>)
}
const Bikini = () => {
  return (<div>👙</div>)
}
const Mantel = () => {
  return (<div>🧥</div>)
}

const Start = () => {
  const [leroyDirection, setLeroyDirection] = useState()
  const [leroyPosition, setLeroyPosition] = useState({ x: 1, y: 1 })
  const [, play] = useAudio('/sounds/coin.wav')
  const [items, setItems] = useState([
    { id: 1, x: 7, y: 1, ItemComponent: Hose },
    { id: 2, x: 16, y: 18, ItemComponent: Bikini },
    { id: 3, x: 8, y: 11, ItemComponent: Mantel },
    { id: 4, x: 8, y: 2, ItemComponent: Shirt }
  ])
  const [collectedItems, setCollectedItems] = useState([])
  const walls = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  const shouldRun = true

  const detectWall = (pos) => {
    return walls[pos.y][pos.x] === 1
  }

  const detectItems = (pos) => {
    const foundItem = items.find(i => i.x === pos.x && i.y === pos.y)
    if (foundItem) {
      play()
      setItems(items.filter(i => i.id !== foundItem.id))
      setCollectedItems([...collectedItems, foundItem])
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let newPosition
      
      if (leroyDirection === 'left') {
        newPosition = { ...leroyPosition, x: leroyPosition.x - 1 } 
      } else if (leroyDirection === 'right') {
        newPosition = { ...leroyPosition, x: leroyPosition.x + 1 }
      } else if (leroyDirection === 'up') {
        newPosition = { ...leroyPosition, y: leroyPosition.y - 1 }
      } else if (leroyDirection === 'down') {
        newPosition = { ...leroyPosition, y: leroyPosition.y + 1 }
      }

      if (newPosition) {
        if(detectWall(newPosition)) {
          setLeroyDirection()
        } else {
          setLeroyPosition(newPosition)
          detectItems(newPosition)
        }
      }
    }, 150)

    return () => clearInterval(interval)
  }, [leroyDirection, leroyPosition])

  return (
    <Page>
      <div>
        <div className="meta">
          <h1>Start</h1>
          <div>
            Collected Items:
            {collectedItems.map(({ItemComponent}, i) => <ItemComponent key={i} />)}
          </div>
        </div>
        <Level walls={walls} items={items}>
          <div style={{
            position: 'absolute',
            'transition': 'transform 200ms',
            'transform': `translate3d(${leroyPosition.x * 25}px, ${leroyPosition.y * 25}px, 0)`
          }}>
            <Leroy direction={leroyDirection} onDirection={(direction) => setLeroyDirection(direction)} />
          </div>
        </Level>
        
      </div>  

      <style jsx>{`
        .meta {
          position: fixed;
          right: 0;
          top: 0;
          width: 200px;
          z-index: 2;
        }
      `}</style>
    </Page>
  )
}

export default Start
