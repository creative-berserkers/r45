import * as React from 'react'
import Button from './Button'
import { ActiveUnitCard } from '../battle/battle-selectors'

export interface TurnMarkerProps {
  activeUnitCard: ActiveUnitCard
  debug?: boolean,
  showSelectButton?: boolean
  onSelect: (id: string) => void
  onSelectButton: (id: string) => void
  style?: React.CSSProperties
  description?: string
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
  gridTemplateAreas: '"name dices" "content content"',
  padding: '10px',
  margin: '3px',
  width: '200px',
}

export const renderObject = (obj: any): any => <ul>
  {Object.keys(obj)
    .map((key: string) => (
      <li key={key}>
        {key}:{(typeof obj[key] === 'object') ? renderObject(obj[key]) : JSON.stringify(obj[key])}
      </li>))}
</ul>

export const TurnMarker = ({
                             activeUnitCard,
                             debug = false,
                             showSelectButton = false,
                             style,
                             onSelectButton,
                             onSelect,
                           }: TurnMarkerProps) => <div style={{ ...baseStyle, ...style }} onClick={() => onSelect(activeUnitCard.id)}>
  <div style={{ padding: '16px' }}>
    {activeUnitCard.unitId}/{activeUnitCard.id}/{activeUnitCard.initiative}
  </div>
  <div>
    {showSelectButton && <Button style={{}}
                                 label={'Select'}
                                 onClick={() => onSelectButton(activeUnitCard.id)}
    />}
  </div>
  <div>
    {debug && renderObject(activeUnitCard)}
  </div>
</div>
