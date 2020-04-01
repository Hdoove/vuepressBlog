### 简易useRedux

```javascript

import React, { useReducer, createContext, useContext } from 'react';

const StoreContext = createContext();

export const StoreProvider = (props) => {


    const initialState = {
        name: 'hdove',
        age: 0
    };      

    const reducer = (state, action) => {
        switch (action.type) {
          case "CHANGE_NAME":
            return { ...state, name: action.payload };
          case "CHANGE_AGE":
            return { ...state, age: action.payload }; 
          default:
            throw new Error(`Unhandled action type: ${action.type}`);
        }
      };
      

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);

```