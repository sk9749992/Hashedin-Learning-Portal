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

    if (action.type === 'UPDATE_WHISLIST') {
        const courseWishlistedIndex = state.whisListCourses.findIndex((course) => course.courseId === action.payload); 
        if (courseWishlistedIndex < 0) {
            const newCartItem = HashedinCourses.find((course) => course.courseId === action.payload);
            const updatedcourses = state.courses.map((course) => {
                if(course.courseId === action.payload) {
                    course.IsWhishlisted = true;
                }
                return course;
            })
            return {...state, courses: [...updatedcourses], whisListCourses: [...state.whisListCourses, newCartItem]};
        } else {
            const newCartItem = state.whisListCourses.filter((course) => course.courseId !== action.payload);
            const updatedcourses = state.courses.map((course) => {
                if(course.courseId === action.payload) {
                    course.IsWhishlisted = false;
                }
                return course;
            })
            return {...state, courses: [...updatedcourses], whisListCourses: [...newCartItem]};
        }
    }

    if (action.type === 'DELETE_WHISLIST') {
        const newCartItem = state.whisListCourses.filter((course) => course.courseId !== action.payload);
            const updatedcourses = state.courses.map((course) => {
                if(course.courseId === action.payload) {
                    course.IsWhishlisted = false;
                }
                return course;
            })
        return {...state, courses: [...updatedcourses], whisListCourses: [...newCartItem]};
    }

    if (action.type === 'ADD_TO_WHISLIST') {
        const courseWishlistedIndex = state.whisListCourses.findIndex((course) => course.courseId === action.payload); 
        if (courseWishlistedIndex < 0) {
            const newCartItem = HashedinCourses.find((course) => course.courseId === action.payload);
            const updatedcourses = state.courses.map((course) => {
                if(course.courseId === action.payload) {
                    course.IsWhishlisted = true;
                }
                return course;
            })
            return {...state, courses: [...updatedcourses], whisListCourses: [...state.whisListCourses, newCartItem]};
        }
        return state;
    }
}