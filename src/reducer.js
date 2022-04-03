import { HashedinCourses } from './data';


export const reducer = (state, action) => {
    if (action.type === 'ADD_TO_WIDGET') {
        const newCartItem = HashedinCourses.find((course) => course.courseId === action.payload);
        return {...state, courseWidget: [...state.courseWidget, newCartItem]};
    }
}