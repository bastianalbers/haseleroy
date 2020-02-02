import React, { useState, useEffect } from 'react'
import Page from '../../components/Page'
import Level from '../../components/Level/Level'
import Leroy from '../../components/Leroy'
import styles from './anziehen.module.css'
import useDimensions from '../../components/Hooks/useDimensions'
import useAudio from '../../components/Hooks/useAudio'

const Hose = () => {
  return (<div className={styles.item}>👖</div>)
}
const Shirt = () => {
  return (<div className={styles.item}>🥼</div>)
}
const Bikini = () => {
  return (<div className={styles.item}>👙</div>)
}
const Mantel = () => {
  return (<div className={styles.item}>🧥</div>)
}

const Anziehen = () => {
  const [ref, { width, height }] = useDimensions()
  const [leroyDirection, setLeroyDirection] = useState()
  const [leroyPosition, setLeroyPosition] = useState({ x: 1, y: 1 })
  const [, play] = useAudio('/sounds/coin.wav')
  const [items, setItems] = useState([])
  const [collectedItems, setCollectedItems] = useState([])
  const [touchPosition, setTouchPosition] = useState()
  const bricksize = 40
  const walls = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
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

  const resetLevel = () => {
    setLeroyPosition({ x: 1, y: 1 })
    setItems([
      { id: 1, x: 7, y: 1, ItemComponent: Hose },
      { id: 2, x: 16, y: 18, ItemComponent: Bikini },
      { id: 3, x: 8, y: 11, ItemComponent: Mantel },
      { id: 4, x: 8, y: 2, ItemComponent: Shirt }
    ])
    setCollectedItems([])
  }

  useEffect(() => {
    resetLevel()
  }, [])

  const detectWall = (pos) => {
    return walls[pos.y][pos.x] !== 0
  }

  const detectItems = (pos) => {
    const foundItem = items.find(i => i.x === pos.x && i.y === pos.y)
    if (foundItem) {
      play()
      setItems(items.filter(i => i.id !== foundItem.id))
      setCollectedItems([...collectedItems, foundItem])
    }
  }

  const overflow = Math.round(((walls[0].length * bricksize) - width) / bricksize)
  const switchPoint = overflow > walls[0].length / 2 ? overflow : Math.round(walls[0].length / 2)
  const levelXOffset = leroyPosition.x < switchPoint ? '0px' : `-${overflow * bricksize}px`
  const levelYOffset = leroyPosition.y < switchPoint ? '0px' : `-${overflow * bricksize}px`

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

  if (collectedItems.length === 4) {
    if (collectedItems[0].id === 2 && collectedItems[3].id === 3) {
      return (
        <Page>
          <h1>GESCHAFFT!!!</h1>
          <button
            className={styles.resetButton}
            onClick={resetLevel}
          >
            Trotzdem nochmal
          </button>
          <button
            className={styles.continueButton}
            onClick={resetLevel}
          >
            Weiter
          </button>
        </Page>
      )
    }
    if (collectedItems[0].id !== 2 || collectedItems[3].id !== 3) {
      return (
        <Page>
          <h1>Leider falsche Reihenfolge!!!</h1>
          <button
            className={styles.resetButton}
            onClick={resetLevel}
          >
            Nochmal versuchen
          </button>
        </Page>
      )
    }
  }

  return (
    <div
      style={{
        '--rows': 20,
        '--columns': 20, 
        '--bricksize': `${bricksize}px`
      }}
    >
      <div className={styles.meta}>
        <h1>Anziehen</h1>
        <div>
          Collected Items:
          {collectedItems.map(({ItemComponent}, i) => <ItemComponent key={i} />)}
        </div>
      </div>
      <div className={styles.levelWrapper} ref={ref}>
        <div
          className={styles.level}
          style={{
            transform: `translate(${levelXOffset}, ${levelYOffset})`
          }}
        >
          <Level walls={walls} items={items}>
            <div
              key='leroywrapper'
              style={{
                position: 'absolute',
                'transition': 'transform 200ms',
                'transform': `translate3d(${leroyPosition.x * bricksize}px, ${leroyPosition.y * bricksize}px, 0)`
              }}
              onTouchStart={(e) => {
                setTouchPosition(Math.round(e.touches[0].pageX / bricksize))
              }}
              onTouchMove={(e) => {
                const x = Math.round(e.touches[0].pageX / bricksize)
                console.log(x, touchPosition)
                if (x !== touchPosition) {
                  setTouchPosition(x)
                  setLeroyPosition({ x: x, y: leroyPosition.y })
                }
              }}
            >
              <Leroy direction={leroyDirection} onDirection={(direction) => setLeroyDirection(direction)} />
            </div>
          </Level>
        </div>
      </div>
    </div>
  )
}

export default Anziehen
