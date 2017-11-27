import * as React from 'react'
import Button from './Button'
import {Unit} from '../battle/battle-selectors';

export interface UnitProps {
    unit: Unit
    debug?: boolean,
    showSelectButton?: boolean
    onSelect: (id: string) => void
    onSelectButton: (id: string) => void
    style?: React.CSSProperties
    description?:string
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
    width:'200px'
}

export const UnitComponent = ({
                         unit,
                         debug = false,
                         showSelectButton = false,
                         style,
                         onSelectButton,
                         onSelect,
                         description
                     }: UnitProps) => <div style={{...baseStyle, ...style}} onClick={() => onSelect(unit.id)}>
    <div style={{padding: '16px'}}>
        {unit.name}
    </div>
    <div>
        {showSelectButton && <Button style={{}}
                                     label={'Select'}
                                     onClick={() => onSelectButton(unit.id)}
        />}
    </div>
    {debug && <ul>{Object.keys(unit).map((key:string) => (<li key={key}>{key}:{(unit as any)[key]}</li>))}</ul>}
</div>