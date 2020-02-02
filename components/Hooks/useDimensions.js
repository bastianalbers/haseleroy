import { useState, useEffect, useRef } from 'react'
import throttle from 'lodash/throttle'

function getDimensionObject (node) {
  const rect = node.getBoundingClientRect()

  if (rect.toJSON) {
    return rect.toJSON()
  } else {
    return {
      width: rect.width,
      height: rect.height,
      top: rect.top || rect.y,
      left: rect.left || rect.x,
      x: rect.x || rect.left,
      y: rect.y || rect.top,
      right: rect.right,
      bottom: rect.bottom
    }
  }
}

/* got this from https://github.com/Swizec/useDimensions but removed the scroll handler for performance reasons */
function useDimensions () {
  const [dimensions, setDimensions] = useState({})

  const ref = useRef()

  useEffect(
    () => {
      if (ref.current) {
        const measure = throttle(() =>
          window.requestAnimationFrame(() => setDimensions(getDimensionObject(ref.current))),
          200
        )
        measure()

        window.addEventListener('resize', measure)

        return () => {
          window.removeEventListener('resize', measure)
        }
      }
    },
    [ref]
  )

  return [ref, dimensions]
}

export default useDimensions
