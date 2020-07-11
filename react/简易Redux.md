
### 简易Redux

```javascript

interface Action {
    type: string;
    payload?: any;
}

interface IState {
    name: string;
    age: number;
}

interface IReducer<T> {
    (state: T, action:Action): T;
}

function Redux(reducer, initState:IState) {
    let initialState:IState;
    let currentReducer: IReducer<IState> = reducer;
    let listener = [];

    if(initState) {
        initialState = initState;
    }

    function getState():IState {
        return initialState;
    }

    function dispatch(action: Action) {
        initialState = currentReducer(initialState ,action);

        for(let i=0; i<listener.length; i++) {
            const fn = listener[i];
            fn();
        }
    }

    function subscribe(fn) {
        listener.push(fn);
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}

let state = {
    name: 'lj',
    age: 25
}

const reducers:IReducer<IState> = (state: IState, action:Action) => {

    switch(action.type) {
        case 'CHANGE_NAME': 
            return { ...state, name: action.payload }
        case 'CHANGE_AGE': 
            return { ...state, age: action.payload }
    }
}

const {getState, subscribe, dispatch} = Redux(reducers, state);

subscribe(() => {
    console.log(getState());
});

dispatch({
    type: 'CHANGE_NAME',
    payload: 'hd'
})

```