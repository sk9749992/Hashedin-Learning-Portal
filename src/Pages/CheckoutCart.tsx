import React, { useEffect, useState } from 'react'
import CourseCard from '../Components/CourseCard';
import SubHeader from '../Components/SubHeader'
import { useGlobalContext } from '../context';
import { ICourses } from '../Interfaces/Courses';
import DialogModal from '../Components/DialogModal';
import { HashedinCourses } from '../data';
import './CheckoutCart.css'

const CheckoutCart = (): JSX.Element => {
  const {courseWidget, emptyCart, openModal}  = useGlobalContext();
  const [cartCount, setCartCount] = useState<number>();
  const [totalCartPrice, setTotalCartPrice] = useState<number>();
  const [savedAmount, setSavedAmount] = useState<number>();
  const [recommendedCourses, setRecommendedCourses] = useState<ICourses[]>([]);
  
  useEffect(() => {
    setCartCount(courseWidget?.length);
    calculateTotalCartPrice();
    calculateAmountSaved();
    if (courseWidget?.length > 0) {
      getRecommendedCourses();
    } else {
      setRecommendedCourses([]);
    }
  }, [courseWidget])

  const calculateTotalCartPrice = (): void => {
    const totalPrice = courseWidget.reduce((total: number, course: ICourses) => {
      total += course.price;
      return total;
    }, 0);
    setTotalCartPrice(totalPrice);
  }

  const calculateAmountSaved = (): void => {
    const amountSaved = courseWidget.reduce((total: number, course: ICourses) => {
      if (course.actualPrice > 0) {
        total += course.actualPrice - course.price;
      }
      return total;
    }, 0);
    setSavedAmount(amountSaved);
  }

  const getRecommendedCourses = (): void => {
    // Gets the tags of cart courses
    let cartCoursesTags:string[] = [];
    courseWidget.forEach((course: ICourses) => {
      cartCoursesTags.push(...course.tags);
    });

    // Remove the duplicate tags
    cartCoursesTags = cartCoursesTags.filter((tag, index) => {
      return cartCoursesTags.indexOf(tag) === index;
    });

    // filtered the course which not includes the cart courses
    let filteredCourse: ICourses[] = HashedinCourses.filter(
      (course: ICourses) =>
        !courseWidget.filter(
          (cartCourse: ICourses) => cartCourse.courseId === course.courseId
        ).length
    );

    // Gets the recommended courses
    filteredCourse.forEach((course: ICourses) => {
      if (recommendedCourses.length < 2) {
        const isTagMatching = course.tags.some((tag) => {
          return cartCoursesTags.some((cartTag) => {
            return cartTag === tag;
          });
        });
        if (isTagMatching) {
          recommendedCourses.push(course);
        }
      }
    });
  }

  const handlePlaceOrder = (): void => {
    openModal('You have successfully places your order');
    emptyCart();
    setRecommendedCourses([]);
  }

  return (
    <>
    <SubHeader pageName='Shopping cart'/>
    <div className='section-center'>
      <div className="total-cart-text">{cartCount} courses in cart</div>
      <div className="courses">
        <div className="row">
          <div className="col-lg-9 cart-courses">
            {courseWidget.map((course: ICourses) => {
              return <CourseCard key={course.courseId} course={course} screenName='cart'/>
            })}
          </div>
          <div className="col-lg-3">
            <div className="checkout-body">
              <div className="amount-text">total amount</div>
              <div className="checkout-cart-price">Rs {totalCartPrice} /-</div>
              <div className="amount-saved">you have saved Rs {savedAmount} /-</div>
              <button className="checkout-btn" onClick={handlePlaceOrder}>
                checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-lg-9 recommeded-courses">
      <div className="recommended-text">recommended courses</div>
      {recommendedCourses?.map((course: ICourses) => {
        return <CourseCard key={course.courseId} course={course} screenName='recommended'/>
      })}
    </div>
      </div>
    </div>
    <DialogModal/>
    </>
  )
}

export default CheckoutCart