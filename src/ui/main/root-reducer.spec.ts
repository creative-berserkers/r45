import {expect} from 'chai'
import reducers from './root-reducer'

describe('reducers', () => {
    it('should handle actions', () => {
        let state;
        state = reducers(undefined, {type: 'ANY'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'none'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'none'}
        }, {type: 'PLAYER_ID_ASSIGNED', playerId: 'player1'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'none'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'none'}
        }, {type: 'SET_ACTIVE_UNIT_ID', unitId: 'unit1'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        }, {type: 'ROLL_DICES_REQUEST', unitId: 'unit1'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 0}, {id: 'dice2', face: 0}, {id: 'dice3', face: 0}, {
                    id: 'dice4',
                    face: 0
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 3, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        }, {
            type: 'ROLL_DICES_RESPONSE',
            unitId: 'unit1',
            dices: [{id: 'dice3', face: 1}, {id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice4', face: 3}]
        })
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit1'}
        }, {type: 'SET_ACTIVE_UNIT_ID', unitId: 'unit3'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit3'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit3'}
        }, {type: 'ROLL_DICES_REQUEST', unitId: 'unit3'})
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit3'}
        })
        state = reducers({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 0}, {id: 'dice10', face: 0}, {id: 'dice11', face: 0}, {id: 'dice12', face: 0}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 3, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit3'}
        }, {
            type: 'ROLL_DICES_RESPONSE',
            unitId: 'unit3',
            dices: [{id: 'dice9', face: 1}, {id: 'dice12', face: 2}, {id: 'dice10', face: 6}, {id: 'dice11', face: 6}]
        })
        expect(state).to.deep.equal({
            battle: {
                query: {from: 'all', where: []},
                dices: [{id: 'dice1', face: 2}, {id: 'dice2', face: 2}, {id: 'dice3', face: 1}, {
                    id: 'dice4',
                    face: 3
                }, {id: 'dice5', face: 0}, {id: 'dice6', face: 0}, {id: 'dice7', face: 0}, {
                    id: 'dice8',
                    face: 0
                }, {id: 'dice9', face: 1}, {id: 'dice10', face: 6}, {id: 'dice11', face: 6}, {id: 'dice12', face: 2}],
                cards: [{id: 'heal', require: 1, target: 'self'}, {
                    id: 'maneuver',
                    require: 3,
                    target: 'self'
                }, {id: 'teleport', require: 5, target: 'self'}, {id: 'fireball', require: 6, target: 'remote-unit'}],
                groups: [{id: 'group1'}, {id: 'group2'}, {id: 'group3'}],
                units: [{id: 'unit1', name: 'Unit1', rolls: 2, baseHealth: 10, phase: 'rolling'}, {
                    id: 'unit2',
                    name: 'Unit2',
                    rolls: 3,
                    baseHealth: 10,
                    phase: 'rolling'
                }, {id: 'unit3', name: 'Unit3', rolls: 2, baseHealth: 10, phase: 'rolling'}],
                diceToCardAssignments: [{diceId: 'dice3', cardId: 'heal'}, {diceId: 'dice4', cardId: 'maneuver'}, {diceId: 'dice9', cardId: 'heal'}, {diceId: 'dice10', cardId: 'fireball'}],
                diceToUnitAssignments: [{diceId: 'dice1', unitId: 'unit1'}, {
                    diceId: 'dice2',
                    unitId: 'unit1'
                }, {diceId: 'dice3', unitId: 'unit1'}, {diceId: 'dice4', unitId: 'unit1'}, {
                    diceId: 'dice5',
                    unitId: 'unit2'
                }, {diceId: 'dice6', unitId: 'unit2'}, {diceId: 'dice7', unitId: 'unit2'}, {
                    diceId: 'dice8',
                    unitId: 'unit2'
                }, {diceId: 'dice9', unitId: 'unit3'}, {diceId: 'dice10', unitId: 'unit3'}, {
                    diceId: 'dice11',
                    unitId: 'unit3'
                }, {diceId: 'dice12', unitId: 'unit3'}],
                unitToGroupAssignments: [{unitId: 'unit1', groupId: 'group1'}, {
                    unitId: 'unit2',
                    groupId: 'group3'
                }, {unitId: 'unit3', groupId: 'group3'}],
                unitToPlayerAssignments: [{unitId: 'unit1', playerId: 'player1'}, {
                    unitId: 'unit2',
                    playerId: 'player1'
                }],
                cardToUnitAssignments: [{cardId: 'heal', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit1'
                }, {cardId: 'teleport', unitId: 'unit1'}, {cardId: 'fireball', unitId: 'unit1'}, {
                    cardId: 'maneuver',
                    unitId: 'unit2'
                }, {cardId: 'maneuver', unitId: 'unit3'}]
            }, battleView: {activeUnitId: 'unit3'}
        })
    })
})
