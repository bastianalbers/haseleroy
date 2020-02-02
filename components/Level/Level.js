import React from 'react'
import classnames from 'classnames'
import styles from './Level.module.css'

const Level = ({ children, walls, items, bricksize }) => {
  return (
    <div className={styles.levelContainer}>
      {children}
      {walls.map((row, y) => {
        return row.map((c, x) => {
          if (c === 0) return null
          
          return (
            <div
              key={`wall${x}-${y}`}
              className={classnames(styles.wall, styles[`wall-${c}`])}
              style={{
                top: `calc(${y} * var(--bricksize))`,
                left: `calc(${x} * var(--bricksize))`,
              }}
            />
          )})
        })
      }

      { 
        items.map(({ x, y, ItemComponent }, i) => {
          return (
            <div
              key={`item-${i}`}
              className={styles.itemWrapper}
              style={{
                top: `calc(${y} * var(--bricksize))`,
                left: `calc(${x} * var(--bricksize))`
              }}
            >
              <ItemComponent />
            </div>
          )
        })
      }

      <style jsx>{`
        
      `}</style>
    </div>
  )
}

export default Level
