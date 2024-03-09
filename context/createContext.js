import React, { createContext, useReducer } from 'react'
import { useState } from "react";



export default (reducer, actions, initialState) => {
    const Context = createContext()
    
    const Provider = ({children}) => {
        const [state, dispatch] = useReducer(reducer, initialState)
        const [quantity2, setQuantity2] = useState(null);

        const boundActions = {}
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return (
            <Context.Provider value={{state, quantity2, setQuantity2, ...boundActions}}>
                {children}
            </Context.Provider>
        )
    }

    return { Context, Provider}
}