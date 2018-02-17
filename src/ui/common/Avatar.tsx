import * as React from 'react'


export interface AvatarStateProps {
  unitId: string
  isSelected: boolean
  size: number
  name: string
  classId: string
  onClick?: (unitId: string) => void
}

type ClassIdToUtf8CharacterMap = {
  [key: string]: string,
}

const classIdToUtf8Character: ClassIdToUtf8CharacterMap = {
  mage: '\uD83D\uDC7A',
  warrior: '\uD83D\uDE28',
  hunter: '\uD83D\uDE1D',
}

export class Avatar extends React.Component<AvatarStateProps, {}> {

  onClick = () => {
    if (this.props.onClick) {
      this.props.onClick(this.props.unitId)
    }
  }

  render() {
    const { size, name, classId, isSelected } = this.props

    const initialShadowColor = isSelected ? 'rgba(0, 200, 0, 1)' : 'rgba(0, 0, 0, 0.19)'

    const avatarStyle: React.CSSProperties = {
      cursor: 'hand',
      boxShadow: `${initialShadowColor} 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px`,
      borderRadius: `${size / 2}px`,
    }

    return <svg width={size} height={size} viewBox={`0 0 100 100`} style={avatarStyle} onClick={this.onClick}>
      <circle cx="50" cy="50" r="50" fill={'blue'}/>
      <text x={20} y={55} fontSize={70} fill="white">
        {classIdToUtf8Character[classId] || 'x'}
      </text>
      <text x={20} y={80} fontSize={20} fill="white">
        {name}
      </text>
    </svg>
  }
}
