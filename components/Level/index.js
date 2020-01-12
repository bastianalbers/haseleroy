import React from 'react'


const Level = ({ children, walls, items }) => {
  return (
    <div className="levelContainer">
      {children}
      {walls.map((row, y) => {
        return row.map((c, x) => {
          if (c === 0) return null
          
          return (
            <div
              key={`wall${x}-${y}`}
              className='wall'
              style={{
                top: `${y * 25}px`,
                left: `${x * 25}px`,
              }} />
          )})
        })
      }

      { 
        items.map(({ x, y, ItemComponent }, i) => {
          return (
            <div
              key={`item-${i}`}
              className='itemWrapper'
              style={{
                top: `${y * 25}px`,
                left: `${x * 25}px`,
              }}
            >
              <ItemComponent />
            </div>
          )
        })
      }

      <style jsx>{`
        .levelContainer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: #fcf;
        }
        .wall {
          position: absolute;
          background: #f3f;
          width: 25px;
          height: 25px;
        }
        .itemWrapper {
          position: absolute;
          width: 25px;
          height: 25px;
        }
      `}</style>
    </div>
  )
}

export default Level
