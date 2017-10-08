import * as React from 'react'
import {ReactChild, ReactElement} from 'react'

export class DrawerBody extends React.Component<{}, {}> {
  render(){
    const {children} = this.props
    return <div>{children}</div>
  }
}

export class DrawerSide extends React.Component<{}, {}> {
  render(){
    const {children} = this.props
    return <div>{children}</div>
  }
}

export interface DrawerStateProps {
  style?: React.CSSProperties
}

export default class Drawer extends React.Component<DrawerStateProps, {}> {

  render () {
    const {children, style} = this.props

    let DrawerBodyElement = <DrawerBody />
    let DrawerSideElement = <DrawerSide />

    React.Children.toArray(children).forEach((child:ReactChild) => {
        if(typeof child !== 'string' && typeof child !== 'number'){
            if (child.type === DrawerBody) {
                DrawerBodyElement = child
            }
            if (child.type === DrawerSide) {
                DrawerSideElement = child
            }
        }
    })

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

    return <div style={drawerStyle}>
      <div>{DrawerBodyElement || ''}</div>
      <div>{DrawerSideElement || ''}</div>
    </div>
  }
}