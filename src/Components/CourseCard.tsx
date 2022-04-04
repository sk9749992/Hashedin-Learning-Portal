import React from 'react'
import {FaStar} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { ICourses } from '../Interfaces/Courses';
import './CourseCard.css';
import DialogModal from './DialogModal';

interface ICourseProp {
  course: ICourses;
}

const CourseCard = ({course}: ICourseProp) => {
  const {addCourseToCartWidget, openModal, courseWidget} = useGlobalContext();
  const navigate = useNavigate();
  const  {courseId, courseName, tags, author, IsWhishlisted, price, actualPrice} = course;

  const handleAddCart = (id: number) => {
    const index = courseWidget.findIndex((course: ICourses) => course.courseId === id);
    if (index < 0) {
      addCourseToCartWidget(id);
      openModal('Course successfully added to the cart');
    } else {
      openModal('Already Exists in Cart');
    }
  }

  const handleNavigationToCourseDetailPage = (id: number) => {
    navigate(`/course/${id}`);
  }

  return (
    <>
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
            <button className="course-card-btn right-space" onClick={() => handleAddCart(courseId)}>add to card</button>
            <span className="course-arrow cursor" onClick={() => handleNavigationToCourseDetailPage(courseId)}>
              <FaAngleRight/>
            </span>
          </div>
        </div>
    </div>
    <DialogModal/>
    </>
  )
}

export default CourseCard