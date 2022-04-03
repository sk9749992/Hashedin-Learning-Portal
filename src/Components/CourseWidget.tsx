import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../context'
import { ICourses } from '../Interfaces/Courses';
import './CourseWidget.css'

const CourseWidget = () => {
  const {courseWidget}  = useGlobalContext();
  const [totalCartValue, setTotalCartValue] = useState<number>();

  useEffect(() => {
      let totalValue = courseWidget.reduce((total: number, course: ICourses)=> {
        total += course.price;
        return total;
      }, 0);
      setTotalCartValue(totalValue);
    }, [courseWidget]);


  return (
    <>
   <section className='course-widget'>
      <header className="course-widget-header">
        <p>your cart details</p>
      </header>
      <div className="course-widget-body">
        {courseWidget.map((course: ICourses) => {
          const {courseId, courseName, price} = course;
        return <article key={courseId} className='course-information'>
        <div className="row">
        <div className="col-lg-3">
          <div className="course-img"></div>
        </div>
        <div className="col-lg-9 pt-2">
          <p className="course-name">
            {courseName}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="course-price"><i>Rs</i> {price} <i>/-</i></div>
        </div>
      </div>
        </article>
        })}
      </div>
      <footer className="widget-footer">
        <div className="row">
      <div className="col-lg-6">
        <p>total cart value</p>
        <span className="total-price"
          ><i>Rs</i> {totalCartValue} <i>/-</i></span
        >
      </div>
      {courseWidget?.length > 0 && <div className="col-lg-6 footer-checkout">
        go to checkout
      </div>}
    </div>
      </footer>
    </section>
    </>
  )
}

export default CourseWidget