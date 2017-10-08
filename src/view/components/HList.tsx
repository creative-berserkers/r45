import * as React from 'react'

export interface DrawerStateProps {
    style?: React.CSSProperties
}

export class HList extends React.Component<DrawerStateProps, {}> {

    render () {
        const {children, style} = this.props

        const drawerStyle: React.CSSProperties = {
            ...style,
            display: 'flex',
            flexDirection: 'row',
            padding: '20px'
        }

        return <div style={drawerStyle}>{children}</div>
    }
}