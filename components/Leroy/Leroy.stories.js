import * as React from 'react'
import { storiesOf } from '@storybook/react'
import Leroy from './Leroy'

storiesOf('Leroy', module)
  .add('defaults', () => {
    return <div style={{position: 'relative', width: '200px', height: '200px'}}>
      <Leroy />
    </div>
  })
  .add('left', () => {
    return <div style={{position: 'relative', width: '200px', height: '200px'}}>
      <Leroy direction="left" />
    </div>
  })
  .add('right', () => {
    return <div style={{position: 'relative', width: '200px', height: '200px'}}>
      <Leroy direction="right" />
    </div>
  })
  .add('up', () => {
    return <div style={{position: 'relative', width: '200px', height: '200px'}}>
      <Leroy direction="up" />
    </div>
  })
  .add('down', () => {
    return <div style={{position: 'relative', width: '200px', height: '200px'}}>
      <Leroy direction="down" />
    </div>
  })
