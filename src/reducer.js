import { HashedinCourses } from './data';


export const reducer = (state, action) => {
    if (action.type === 'ADD_TO_WIDGET') {
        const newCartItem = HashedinCourses.find((course) => course.courseId === action.payload);
        return {...state, courseWidget: [...state.courseWidget, newCartItem]};
    }

    if (action.type === 'EMPTY_CART') {
        return {...state, courseWidget: []};
    }

    if (action.type === 'DELETE_CART_ITEM') {
       const newCartItem = state.courseWidget.filter((course) => course.courseId !== action.payload);
       return {...state, courseWidget: [...newCartItem]}; 
    }
}