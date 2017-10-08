import * as React from 'react'
import { connect } from 'react-redux'

import { Dispatch } from 'redux'
import Dice from './components/Dice'
import Drawer, {DrawerBody, DrawerSide} from './components/Drawer'
import {HList} from './components/HList'

export interface GameDispatchProps {

}

export default class BattleView extends React.Component<any, any> {
    constructor () {
        super()
    }

    render () {
        return <Drawer>
            <DrawerBody>
                <Dice face={1}/>
                <Dice face={2}/>
                <Dice face={3}/>
                <Dice face={4}/>
                <Dice face={5}/>
                <Dice face={6}/>
            </DrawerBody>
            <DrawerSide>
                <button>Test</button>
            </DrawerSide>
        </Drawer>
    }
}

const mapDispatchToProps = function (dispatch: Dispatch<any>): GameDispatchProps {
    return {}
}

const mapStateToProps = function (state: any) {
    return {

    }
}

const BattleViewContainer = connect<{}, GameDispatchProps, {}>(mapStateToProps, mapDispatchToProps)(BattleView)

// export GameContainer
