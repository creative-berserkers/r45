import * as React from 'react'

export interface CardStateProps {
    face:number
    size?:number
    selected?: boolean
    onClick?: () => void
    showHighlight?: boolean
    style?: React.CSSProperties
    description?:string
}

export default class Dice extends React.Component<CardStateProps, {}> {

    onClick = () => {
        if(this.props.onClick){
            this.props.onClick()
        }
    }

    render() {

        const {style,face, size = 80, selected, description, showHighlight = false} = this.props

        const borderColor = showHighlight ? 'rgb(0, 188, 212)' : 'black'
        const boxShadow = showHighlight ? '0px 0px 16px 8px rgb(0, 188, 212)' : '0px 1px 6px rgba(0, 0, 0, 0.12), 0px 1px 4px rgba(0, 0, 0, 0.12)'

        const rootStyle: React.CSSProperties = {
            width: `${size}px`,
            height: `${size}px`,
            opacity: selected ? 0.3 : 1,
            color: 'rgba(0, 0, 0, 0.87)',
            backgroundColor: 'rgb(255, 255, 255)',
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            boxSizing: 'border-box',
            fontFamily: 'Roboto, sans-serif',
            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
            borderColor,
            boxShadow,
            borderRadius: '2px',
            zIndex: 1,
            ...style
        }

        const faceMapping = [
            0,
            64,
            1+32,
            1+32+64,
            1+4+8+32,
            1+4+8+32+64,
            1+2+4+8+16+32
        ];

        return <svg
            style={rootStyle}
            onClick={this.onClick}
            width='100%'
            height='100%'
            viewBox={`0 0 100 100`}
        >
            <g>
                <title>{description}</title>
                <rect x='1' y='1' rx='4' ry='4' width='98' height='98' stroke='gray' fill='lightgray' strokeWidth='2'/>
                {(faceMapping[face] & 1) && <circle key={1} cx='25' cy='25' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 2) && <circle key={2} cx='25' cy='50' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 4) && <circle key={3} cx='25' cy='75' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 8) && <circle key={4} cx='75' cy='25' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 16) && <circle key={5} cx='75' cy='50' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 32) && <circle key={6} cx='75' cy='75' r='10' stroke='black' fill='white' strokeWidth='2'/>}
                {(faceMapping[face] & 64) && <circle key={7} cx='50' cy='50' r='10' stroke='black' fill='white' strokeWidth='2'/>}
            </g>
        </svg>
    }
}