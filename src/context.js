import React, { useState, useContext, useReducer, useEffect } from 'react';
import { HashedinCourses } from './data';
import { reducer } from './reducer';

export const AppContext = React.createContext();

const initialState = {
    courses: HashedinCourses,
    courseWidget: [],
}



export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const addCourseToCartWidget = (id) => {
        dispatch({type: 'ADD_TO_WIDGET', payload: id});
    }

    return <AppContext.Provider value={{
        ...state,
        addCourseToCartWidget
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}