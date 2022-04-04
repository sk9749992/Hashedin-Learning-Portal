import React, { useEffect, useState } from 'react'
import CourseCard from '../Components/CourseCard';
import CourseWidget from '../Components/CourseWidget';
import SubHeader from '../Components/SubHeader'
import { useGlobalContext } from '../context'
import { ICourses } from '../Interfaces/Courses';

const Whislist = () => {
  const {whisListCourses} = useGlobalContext();
  const [defaultWhisListCourses, setDefaultWhisListCourses] = useState<ICourses[]>([]);
  const [initalWhislistCourses, setInitialWhislistCourses] = useState<ICourses[]>([]);
  const priceFilters = [
    { value: 'default', display: 'Course Price' },
    { value: 'low', display: 'Low to High' },
    { value: 'high', display: 'High to Low' },
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    sortCourses(e.target.value);
  }

  useEffect(() => {
    setInitialWhislistCourses(whisListCourses);
    setDefaultWhisListCourses(whisListCourses);
  }, [whisListCourses])


  const sortCourses = (type: string) => {
    if (type === 'low') {
      initalWhislistCourses.sort((firstElement: ICourses, secondElement: ICourses) => {
        return firstElement.price - secondElement.price;
      });
    } else if (type === 'high') {
      initalWhislistCourses.sort((firstElement: ICourses, secondElement: ICourses) => {
        return secondElement.price - firstElement.price;
      });
    } else {
      sortCoursesToDefaultOrder();
    }
    setInitialWhislistCourses([...initalWhislistCourses]);
  }

  const sortCoursesToDefaultOrder = () => {
    initalWhislistCourses.sort((firstElement: ICourses, secondElement: ICourses) => {
      return (
        defaultWhisListCourses.findIndex(
          (course: ICourses) => course.price === firstElement.price
        ) -
        defaultWhisListCourses.findIndex(
          (course: ICourses) => course.price === secondElement.price
        )
      );
    });
  }

  return (
    <>
    <SubHeader pageName='discover latest curses on react'/>
    <section className="section-center">
      <div className="row">
        <div className="col-lg-8 filters mb-2">
          <p className='filters-text'>all courses</p>
          <select name="price"  onChange={handleSortChange}>
            {priceFilters.map((filter) => {
              return <option value={filter.value}>
                {filter.display}
              </option>
            })}
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          {initalWhislistCourses?.map((course: ICourses) => {
          return <CourseCard key={course.courseId} course= {course} screenName='whislist'/>
          })}
        </div>
        <div className="col-lg-4">
          <CourseWidget/>
        </div>
      </div>
    </section>
    </>
  )
}

export default Whislist