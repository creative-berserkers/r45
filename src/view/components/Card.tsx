import * as React from 'react'

export interface CardStateProps {
  onClick?: () => void
}

export class Card extends React.Component<CardStateProps, {}> {

  onClick = () => {
    if(this.props.onClick){
      this.props.onClick()
    }
  }

  render() {

    const {children} = this.props

    const combinedStyle: React.CSSProperties = {
      color: 'rgba(0, 0, 0, 0.87)',
      backgroundColor: 'rgb(255, 255, 255)',
      transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
      boxSizing: 'border-box',
      fontFamily: 'Roboto, sans-serif',
      WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
      borderRadius: '2px',
      zIndex: 1,
      marginTop: '5px'
    }


    return <div style={combinedStyle} onClick={this.onClick}>
      <div style={{paddingBotton: '8px'}}>
        <div style={{padding: '16px', fontSize: '14px', color: 'rgba(0, 0, 0, 0.87)'}}>
          {children}
        </div>
      </div>
    </div>
  }
}