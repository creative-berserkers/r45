import * as React from 'react'

export interface DrawerStateProps {
  style?: React.CSSProperties
}

export class Drawer extends React.Component<DrawerStateProps, {}> {

  render () {
    const {children, style} = this.props

    const drawerStyle: React.CSSProperties = {
      ...style,
      color: 'rgba(0, 0, 0, 0.87)',
      backgroundColor: 'rgb(255, 255, 255)',
      boxSizing: 'border-box',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      borderRadius: '2px',
      zIndex: 1,
      fontFamily: 'Roboto, sans-serif',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      padding: '20px'
    }

    return <div style={drawerStyle}>{children}</div>
  }
}