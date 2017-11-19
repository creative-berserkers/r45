import * as React from 'react'
import Button from "./Button";

export interface UnitProps {
    id: string
    name: string
    showSelectButton?: boolean
    onSelect: (id: string) => void
    onSelectButton: (id: string) => void
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
    gridTemplateAreas: '"name dices" "content content"'
}

export const Unit = ({
     id,
     name,
     showSelectButton = false,
     style,
     onSelectButton,
     onSelect
 }: UnitProps) => <div style={{...baseStyle, ...style}} onClick={() => onSelect(id)}>
    <div style={{padding: '16px'}}>
        {name}
    </div>
    <div>
        {showSelectButton && <Button style={{}}
                                     label={'Select'}
                                     onClick={() => onSelectButton(id)}
        />}
    </div>
</div>