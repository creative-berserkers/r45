
import * as React from 'react'

export interface SettingsOverlayProps {
  open: boolean
  connected: boolean
  playerName: string
  style: React.CSSProperties
}

export const SettingsOverlay = ({open,connected,playerName, style:parentStyle}:SettingsOverlayProps) => {

  const style:React.CSSProperties = {
    ...parentStyle,

    backgroundColor: open ? 'red' : 'blue'
  }


  return <div style={style}>
    <ul>
      <li>Is Connected: {''+connected}</li>
      <li>XXAAAsdsd: <input placeholder="Please provide your name sdfsdfd"/></li>
    </ul>
  </div>
}