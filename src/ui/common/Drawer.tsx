import * as React from 'react'
import Button from "./Button";

const drawerStyle: React.CSSProperties = {
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
    margin: '10px',
    padding: '20px'
}

const drawerContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flex: 10
}

const drawerButtonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
}

const buttonStyle: React.CSSProperties = {
    margin: '2px'
}

export interface DrawerAction {
    id: string
    name: string
    disabled?: boolean
    visible?: boolean
}

export interface DrawerProps {
    actions: DrawerAction[]
    onAction: (action: DrawerAction) => void
    style?: React.CSSProperties
}

export default class Drawer extends React.Component<DrawerProps, {}> {

    onActionClick = (action: DrawerAction) => () => {
        if (this.props.onAction) {
            this.props.onAction(action)
        }
    }

    render() {
        const {children, actions, style} = this.props

        return <div style={{...drawerStyle, ...style}}>
            <div style={drawerContainerStyle}>{children}</div>
            <div style={drawerButtonContainerStyle}>{this.renderActions(actions)}</div>
        </div>
    }

    renderActions(actions: DrawerAction[]) {
        return actions
            .filter(action => action.visible)
            .map(action => <Button key={action.id}
                                             style={buttonStyle}
                                             label={action.name}
                                             disabled={action.disabled}
                                             onClick={this.onActionClick(action)}>{action.name}</Button>)
    }
}