import React, { useState } from 'react'
import classnames from 'classnames'
import { useHotkeys } from 'react-hotkeys-hook'
import styles from './Leroy.module.css'

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
    <div
      className={classnames(styles.spriteWrapper, {
        [styles.statusRunning]: status === 'running',
        [styles.statusStanding]: status === 'standing'
      })}
    />
  )
}

export default Leroy
