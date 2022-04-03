import React, { useState, useContext, useReducer, useEffect } from 'react';
import { HashedinCourses } from './data';
import { reducer } from './reducer';

export const AppContext = React.createContext();

const initialState = {
    courses: HashedinCourses,
}

export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppContext.Provider value={{
        ...state
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}