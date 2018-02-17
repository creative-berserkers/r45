import * as React from 'react'
import Dice from './Dice'
import Button from './Button'
import { PlayerCard } from '../battle/battle-reducer'

export interface CardProps {
  id: PlayerCard
  name: string
  diceSlot: number
  diceSlotEmpty: boolean
  description: string
  showSlot: boolean
  showPlayButton: boolean
  onClick?: (id: PlayerCard) => void
  onDiceSlotClick?: (
    id: PlayerCard,
    face: number,
  ) => void
  style?: React.CSSProperties
}

const baseStyle: React.CSSProperties = {
  color: 'rgba(0, 0, 0, 0.87)',
  backgroundColor: 'rgb(255, 255, 255)',
  transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
  boxSizing: 'border-box',
  fontFamily: 'Roboto, sans-serif',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
  borderRadius: '2px',
  zIndex: 1,
  marginTop: '5px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '50px auto',
  gridTemplateAreas: '"name dices" "content content" "play-button play-button"',
}

export const Card = ({
                       id,
                       style,
                       diceSlot,
                       name,
                       description,
                       diceSlotEmpty,
                       showSlot,
                       showPlayButton,
                       onClick = () => {
                       },
                       onDiceSlotClick = () => {
                       },
                     }: CardProps,
) => <div style={{ ...baseStyle, ...style }}>
  <div style={{ gridArea: 'name', padding: '16px' }}>
    {name}
  </div>
  <div style={{ gridArea: 'dices', padding: '0px' }}>
    {showSlot && <Dice
      face={diceSlot}
      size={30}
      onClick={() => onDiceSlotClick(id, diceSlot)}
      style={{ opacity: diceSlotEmpty ? 0.5 : 1 }}/>}
  </div>
  <div style={{ gridArea: 'content', padding: '16px' }}>
    {description}
  </div>
  <div style={{ gridArea: 'play-button', padding: '16px' }}>
    <Button style={{}}
            label={'Play'}
            disabled={!showPlayButton}
            onClick={() => onClick(id)}
    />
  </div>
</div>