import React from 'react'


const Level = ({children}) => {
  return (
    <div className="levelContainer">
      {children}

      <style jsx>{`
        .levelContainer {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 100vw;
          background: #fcf;
        }
      
      `}
      </style>
    </div>
  )
}

export default Level
