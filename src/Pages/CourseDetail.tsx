import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { HashedinCourses } from '../data';
import SubHeader from '../Components/SubHeader'
import {FaClipboardList} from 'react-icons/fa';
import {BsClockHistory} from 'react-icons/bs';
import './CourseDetail.css'
import { useGlobalContext } from '../context';
import { ICourses } from '../Interfaces/Courses';
import DialogModal from '../Components/DialogModal';

const CourseDetail = () => {
  const {addCourseToCartWidget, courseWidget, openModal} = useGlobalContext();
  const {courseId} = useParams();
  const [timeLeftForOffer, setTimeLeftForOffer] = useState<number>();
  const courseDetail = HashedinCourses.find((course) => course.courseId === parseInt(courseId ? courseId : '1'));
  const courseDescription = [1, 2, 3, 4, 5];
  const actualCoursePrice = courseDetail?.actualPrice ? courseDetail?.actualPrice : 0;

  useEffect(() => {
    setTimeLeftForOffer(24 - new Date().getHours());
  }, [courseId]);

  const handleAddingToCart = (id: string) => {
    const index = courseWidget.findIndex((course: ICourses) => course.courseId === parseInt(id));
    if (index < 0) {
      addCourseToCartWidget(parseInt(id));
      openModal('Course successfully added to the cart');
    } else {
      openModal('Already Exists in Cart');
    }
  }

  return (
    <>
    <SubHeader pageName='discover latest curses on react'/>
    <div className='section-center'>
    <nav>
    <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/" className='breadcrumb-link'>all courses</Link></li>
      <li className="breadcrumb-item current-course-page" aria-current="page">
        { courseDetail?.courseName }
      </li>
    </ol>
    </nav>
    </div>

    <div className="course-detail-banner">
    <div className="section-center py-2">
    <div className="course-detail-name">{ courseDetail?.description }</div>
    <div className="small-course-detail-name">{ courseDetail?.description }</div>
    <div className="course-detail-author">{courseDetail?.author }</div>
    {courseDetail?.tags.map((tag, index) => {

    return <button key={index} className="course-detail-tag-btn">
            {tag}
          </button>
    })}
    </div>
    </div>
    <div className="section-center">
      <div className="row">
        <div className="col-lg-8 course-detail-description">
        <div className="course-description-section-title">course details</div>
        {courseDescription.map((index) => {

        return <p key={index}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima alias
                voluptatibus corrupti porro pariatur non.
              </p>
        })}
      </div>
      <div className="col-lg-4">
      <a
        href="https://www.udemy.com/course/angular-essentials-angular-2-angular-4-with-typescript/"
        target="_blank"
        ><div className="course-detail-video"></div
      ></a>
      <div className="course-price-detail">
        <div className="course-detail-price">Rs {courseDetail?.price} /-</div>
        {actualCoursePrice > 0 &&
        <div>

        <div  className="course-detail-actual-price">
          Rs {courseDetail?.actualPrice} /-
        </div>
        <div className="discount-time">
          <BsClockHistory className='clock-icon'/>
          {timeLeftForOffer} hours left for this price
        </div>
        </div>
        }
        <div className="btn-container">

        <button className="course-detail-cart-btn" onClick={() => handleAddingToCart(courseId ? courseId : '1')}>
          add to cart
        </button>
        <button className="course-detail-wishlist-btn">
          add to whislist <FaClipboardList className='clipboard-icon'/>
        </button>
        </div>
      </div>
    </div>
      </div>
    </div>
    <DialogModal/>
</>
  )
}

export default CourseDetail