
import * as React from 'react'
import {Card} from './Card'


export interface ActionStateProps {
  actionId: string
  name: string
  description: string
  onClick: (actionId:string) => void
}

export class Action extends React.Component<ActionStateProps, {}> {

  onClick = ()=>{
    if(this.props.onClick){
      this.props.onClick(this.props.actionId)
    }
  }

  render() {
    const {children, name, description} = this.props

    const drawerStyle:React.CSSProperties = {

    }

    return <Card onClick={this.onClick}>
      <div>{name}</div>
      <div>{description}</div>
    </Card>
  }
}