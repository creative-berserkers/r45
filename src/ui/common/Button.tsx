import * as React from 'react'

const buttonStyle: React.CSSProperties = {
    border: '10px',
    boxSizing: 'border-box',
    display: 'inline-block',
    fontFamily: 'Roboto, sans-serif',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    cursor: 'pointer',
    textDecoration: 'none',
    margin: '0px',
    padding: '0px',
    outline: 'none',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    position: 'relative',
    height: '36px',
    lineHeight: '36px',
    width: '100%',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    textAlign: 'center'
}

const innerButtonStyle: React.CSSProperties = {
    height: '36px',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    top: '0px'
}

const textContainerStyle: React.CSSProperties = {
    position: 'relative',
    opacity: 1,
    fontSize: '14px',
    letterSpacing: '0px',
    textTransform: 'uppercase',
    fontEeight: 500,
    margin: '0px',
    userSelect: 'none',
    paddingLeft: '16px',
    paddingRight: '16px',
    color: 'rgb(255, 255, 255)'
}

export interface ButtonProps {
    onClick: () => void
    label: string
    disabled?: boolean
    style?: React.CSSProperties
}

export default class Button extends React.Component<ButtonProps, {}> {
    render() {
        const {style, label, disabled, onClick} = this.props
        return <button
            type='button'
            style={{...buttonStyle, ...style,
                backgroundColor: disabled ? 'rgb(229, 229, 229)' : 'rgb(0, 188, 212)'
            }}
            onClick={event => {
                event.stopPropagation()
                onClick()
            }}
            disabled={disabled}
        >
            <div>
                <div style={innerButtonStyle}>
                    <span style={textContainerStyle}>{label}</span>
                </div>
            </div>
        </button>
    }
}