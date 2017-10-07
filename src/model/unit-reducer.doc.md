--> 'setup'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[],
      assignedActions:[]
    }
  ]
```

--> 'setup/roll'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[],
      assignedActions:[]
    },
    {
      stateId: 'roll',
      storeResultIn: 'rolledDices',
      rolledDices:[],
      numberOfRerolls:2
    }
  ]
```

{type:'roll', dices:[1,2,3,4,5,6]}--> 'setup/roll'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[],
      assignedActions:[]
    },
    {
      stateId: 'roll',
      storeResultIn: 'rolledDices',
      rolledDices:[1,2,3,4,5,6],
      numberOfRerolls:1
    }
  ]
```

{type:'skip'} --> 'setup/assign'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[1,2,3,4,5,6],
      assignedActions:[]
    },
    {
      stateId: 'assign',
      assignedActions[]
    }
  ]
```

{type:'assign', index: 0, action: 'fireball'} --> 'setup/assign'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[1,2,3,4,5,6],
      assignedActions:[]
    },
    {
      stateId: 'assign',
      assignedActions:['fireball']
    }
  ]
```

{type:'assign', index: 1, action: 'move'} --> 'setup/assign'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[1,2,3,4,5,6],
      assignedActions:[]
    },
    {
      stateId: 'assign',
      assignedActions:['fireball', 'move']
    }
  ]
```

{type:'finishAssign'} --> 'setup/play'
```javascript
  [
    {
      stateId: SETUP,
      rolledDices:[1,2,3,4,5,6],
      assignedActions:['fireball', 'move']
    },
    {
      stateId: 'play',
      rolledDices:[1,2,3,4,5,6],
      assignedActions:['fireball', 'move']
    }
  ]
```