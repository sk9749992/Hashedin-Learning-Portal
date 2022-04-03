import React from 'react'
import {FaStar} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import { useGlobalContext } from '../context';
import { ICourses } from '../Interfaces/Courses';
import './CourseCard.css';

interface ICourseProp {
  course: ICourses;
}

const CourseCard = ({course}: ICourseProp) => {
  const {addCourseToCartWidget} = useGlobalContext();
  const  {courseId, courseName, tags, author, IsWhishlisted, price, actualPrice} = course;
  return (
    <div className='course-card'>
        <div className="row">
          <div className="col-lg-1 pt-1">
            <div className="course-img"></div>
          </div>
          <div className='col-lg-4'>
            <p className="course-name pt-2 mb-1">
              {courseName}
            </p>
            {tags.map((tag, index) => {
              return <button key={index} className="course-tag-btn">{tag}</button>
            })}
          </div>
          <div className="col-lg-2">
            <div className="course-author-name pt-3">{author}</div>
          </div>
          <div className="col-lg-3 pt-3">
            <FaStar className={IsWhishlisted ? 'whislist-icon whislisted' : 'whislist-icon'}/>
            <span className="course-price"><i>Rs</i> {price} <i>/-</i></span>
            {actualPrice > 0 ? <span className="actual-price">
                <i>Rs</i> {actualPrice} <i>/-</i></span> : <span>-</span>}
          </div>
          <div className="col-lg-2 pt-3">
            <button className="course-card-btn right-space" onClick={() => addCourseToCartWidget(courseId)}>add to card</button>
            <span className="course-arrow cursor">
              <FaAngleRight/>
            </span>
          </div>
        </div>
    </div>
  )
}

export default CourseCard