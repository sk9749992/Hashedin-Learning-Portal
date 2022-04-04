import React, { useState, useContext, useReducer, useEffect } from 'react';
import { HashedinCourses } from './data';
import { reducer } from './reducer';

export const AppContext = React.createContext();

const initialState = {
    courses: HashedinCourses,
    courseWidget: [],
    whisListCourses: []
}



export const AppProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [modal, setModal] = useState({show: false, message: ''});

    const addCourseToCartWidget = (id) => {
        dispatch({type: 'ADD_TO_WIDGET', payload: id});
    }

    const emptyCart = () => {
        dispatch({type: 'EMPTY_CART'});
    }

    const deleteCartItem = (id) => {
        dispatch({type: 'DELETE_CART_ITEM', payload: id})
    }

    const addToWhisList = (id) => {
        dispatch({type: 'ADD_TO_WHISLIST', payload: id});
    }

    const updateWhisList = (id) => {
        dispatch({type: 'UPDATE_WHISLIST', payload: id})
    }

    const deleteWhisList = (id) => {
        dispatch({type: 'DELETE_WHISLIST', payload: id})
    }

    const openModal = (message) => {
        setModal({show: true, message});
    }

    const closeModal = () => {
        setModal({show: false});
    }

    return <AppContext.Provider value={{
        ...state,
        modal,
        addCourseToCartWidget,
        openModal,
        closeModal,
        emptyCart,
        deleteCartItem,
        updateWhisList,
        deleteWhisList,
        addToWhisList
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}