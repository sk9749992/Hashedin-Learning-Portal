import React from 'react'
import {FaStar} from 'react-icons/fa';
import {FaAngleRight} from 'react-icons/fa';
import {GoTrashcan} from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context';
import { ICourses } from '../Interfaces/Courses';
import './CourseCard.css';
import DialogModal from './DialogModal';

interface ICourseProp {
  course: ICourses;
  screenName: string;
}

const CourseCard = ({course, screenName}: ICourseProp) => {
  const {addCourseToCartWidget, openModal, courseWidget, deleteCartItem, updateWhisList, deleteWhisList, addToWhisList} = useGlobalContext();
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


  const handleCourseCardClasses = (name: string) => {
    if (name === 'courseDetail') {
      if (screenName === 'cart') {
        return 'col-lg-6';
      }  else {
        return 'col-lg-4';
      }
    }

    if (name === 'priceSection') {
      return screenName === 'cart' || screenName === 'whislist' ? 'col-lg-2' : 'col-lg-3';
    }

    if (name === 'navigateSection') {
      if (screenName === 'cart') {
        return 'col-lg-1';
      } else if (screenName === 'whislist') {
        return 'col-lg-3';
      } else {
        return 'col-lg-2';
      }
    }
  }

  const deleteItem = (id: number) => {
    if (screenName === 'cart') {
      deleteCartItem(id);
    } else {
      deleteWhisList(id);
    }
  }

  const moveToWhisList = (id: number) => {
    addToWhisList(id);
    deleteCartItem(id);
  }

  return (
    <>
    <div className='course-card'>
        <div className="row">

          <div className="col-lg-1 pt-1">
            <div className="course-img"></div>
          </div>

          <div className={`${handleCourseCardClasses('courseDetail')}`}>
            <p className="course-name pt-2 mb-1">
              {courseName}
            </p>
            {tags.map((tag, index) => {
              return <button key={index} className="course-tag-btn">{tag}</button>
            })}
          </div>

          {screenName !== 'cart' && <div className="col-lg-2">
            <div className="course-author-name pt-3">{author}</div>
          </div>}

          {screenName === 'cart' && <div className="col-lg-2 pt-3 wishlist-link">
            <a className="cursor" onClick={() => moveToWhisList(courseId)}>move to wishlist</a>
          </div>}

          <div className={`pt-3 ${handleCourseCardClasses('priceSection')}`} >
            {screenName === 'dashboard' && <FaStar onClick={() => updateWhisList(courseId)} className={IsWhishlisted ? 'whislist-icon whislisted' : 'whislist-icon'}/>}
            <span className="course-price"><i>Rs</i> {price} <i>/-</i></span>
            {screenName !== 'cart' && (actualPrice > 0 ? <span className="actual-price">
                <i>Rs</i> {actualPrice} <i>/-</i></span> : <span className='empty-price'>-</span>)}
          </div>

          <div className={`pt-3 ${handleCourseCardClasses('navigateSection')}`}>
            {screenName !== 'cart' && <button className="course-card-btn right-space" onClick={() => handleAddCart(courseId)}>add to card</button>}
            {(screenName !== 'dashboard' && screenName !== 'recommended') ?  <span className="course-trash cursor right-space" onClick={() => deleteItem(courseId)}>
              <GoTrashcan className='course-trash-icon'/>
            </span>: ''}
            {screenName !== 'cart' && <span className="course-arrow cursor" onClick={() => handleNavigationToCourseDetailPage(courseId)}>
              <FaAngleRight/>
            </span>}
            
          </div>
        </div>
    </div>
    <DialogModal/>
    </>
  )
}

export default CourseCard