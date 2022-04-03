import React, { useEffect, useState } from 'react'
import SubHeader from '../Components/SubHeader'
import {AiOutlineSearch} from 'react-icons/ai';
import {FaAngleLeft, FaAngleRight} from 'react-icons/fa'
import CourseCard from '../Components/CourseCard';
import CourseWidget from '../Components/CourseWidget';
import { useGlobalContext } from '../context';
import './Dashboard.css';
import { ICourses } from '../Interfaces/Courses';

const Dashboard = () => {
  const {courses} = useGlobalContext();
  const [dashboardCourses, setDashboardCourses] = useState<ICourses[]>([]);
  const [initialDashboardCourses, setInitialDashboardCourses] = useState<ICourses[]>([]);
  const [defaultCourses, setDefaultCourses] = useState<ICourses[]>([]);
  const [coursePages, setCoursePages] = useState<number[]>([]);
  const [activePage, setActivePage] = useState<number>(1);
  const [sortType, setSortType] = useState<string>('default');
  const [isCourseSearched, setIsCourseSearched] = useState<Boolean>(false);
  const [defaultSortType, setDefaultSortType] = useState<string>('default');

  const priceFilters = [
    { value: 'default', display: 'Course Price' },
    { value: 'low', display: 'Low to High' },
    { value: 'high', display: 'High to Low' },
  ];
  const coursesPerPage = 7;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const currentSortType = e.target.value;
    setDefaultSortType(currentSortType);
    setSortType(currentSortType);
    sortCourses(e.target.value);
  }

  const sortCourses = (type: string) => {
    if (type === 'low') {
      dashboardCourses.sort((firstElement, secondElement) => {
        return firstElement.price - secondElement.price;
      });
    } else if (type === 'high') {
      dashboardCourses.sort((firstElement, secondElement) => {
        return secondElement.price - firstElement.price;
      });
    } else {
      sortCoursesToDefaultOrder();
    }
  }

  const sortCoursesToDefaultOrder = () => {
    dashboardCourses.sort((firstElement, secondElement) => {
      return (
        defaultCourses.findIndex(
          (course: ICourses) => course.price === firstElement.price
        ) -
        defaultCourses.findIndex(
          (course: ICourses) => course.price === secondElement.price
        )
      );
    });
  }

  useEffect(() => {
    setInitialDashboardCourses(courses);
    generateDashboardCourses(courses);
  }, [courses]);

  const generateDashboardCourses = (boardCourses: ICourses[]) => {
    const coursesTotalCount = boardCourses?.length;
    const totalPages = Math.ceil(coursesTotalCount / coursesPerPage);
    setCoursePages(getArrayOfPages(totalPages));

    setDefaultCourses(boardCourses.slice(0, coursesPerPage));

    if (coursesTotalCount <= coursesPerPage) {
      setDashboardCourses(JSON.parse(JSON.stringify(boardCourses)));
    } else {
      setDashboardCourses(boardCourses.slice(0, coursesPerPage));
    }
  }

  const getArrayOfPages = (pageCount: number) => {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }

  const handlePagination = (pageNumber: number) => {
    const coursesTotalCount = initialDashboardCourses.length;
    const totalPages = Math.ceil(coursesTotalCount / coursesPerPage);
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setDefaultSortType('default');
      setActivePage(pageNumber);
      const startIndex = (pageNumber - 1) * 5;
      const endIndex =
        coursesTotalCount - startIndex <= 5
          ? coursesTotalCount
          : startIndex + 5;
      setDashboardCourses(initialDashboardCourses.slice(startIndex, endIndex));
      setDefaultCourses(initialDashboardCourses.slice(startIndex, endIndex));
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchedText = e.target.value;
    if (searchedText.length === 0 && isCourseSearched) {
      setInitialDashboardCourses(courses);
      generateDashboardCourses(courses);
      setIsCourseSearched(false);
      setActivePage(1);
    }
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let searchValue = (
      document.getElementById('search-bar') as HTMLInputElement
    ).value;
    if (searchValue.trim().length !== 0) {
      let filteredCourses: ICourses[] = [];
      setActivePage(1);
      setIsCourseSearched(true);
      searchValue = searchValue.toLowerCase();
      courses.forEach((course: ICourses) => {
        course.tags?.forEach((tag: string) => tag.toLowerCase());
        if (
          course.courseName?.toLowerCase().includes(searchValue) ||
          course.author?.toLowerCase().includes(searchValue) ||
          course.tags?.find((tag: string) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
        ) {
          filteredCourses.push(course);
        }
      });
      if (filteredCourses?.length > 0) {
        setInitialDashboardCourses(filteredCourses);
        generateDashboardCourses(filteredCourses);
      }
    }
  }

  return (
    <>
    <SubHeader pageName='discover latest curses on react'/>
    <section className='section-center'>
      <div className="row">
        <div className="col-lg-8 filters mb-2">
          <p className='filters-text'>all courses</p>
          <select name="price" value={defaultSortType}  onChange={handleSortChange}>
            {priceFilters.map((filter) => {
              return <option value={filter.value}>
                {filter.display}
              </option>
            })}
          </select>
        </div>
        <div className="col-lg-4 mb-2">
          <input
          type="text"
          id="search-bar"
          className="search-input"
          placeholder="Search here"
          onChange={handleSearchChange}
        />
        <button type="button" className="btn-search" onClick={handleSearchClick}>
          <AiOutlineSearch/>
        </button>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8">
          {dashboardCourses?.map((course: ICourses) => {
          return <CourseCard key={course.courseId} course= {course}/>
          })}
        </div>
        <div className="col-lg-4">
          <CourseWidget/>
        </div>
      </div>
      <nav className="pagination">
        <span onClick={() => handlePagination(activePage - 1)}>
          <FaAngleLeft/>
        </span>
          {coursePages?.map((page, index) => {
            return <span key={index} onClick={() => handlePagination(page)}  className={ activePage === page ? 'pagination-number activepage' : 'pagination-number'}>
              {page}
            </span>
          })}
        <span onClick={() => handlePagination(activePage + 1)}>
          <FaAngleRight/>
        </span>
      </nav>
    </section>
    </>
  )
}

export default Dashboard