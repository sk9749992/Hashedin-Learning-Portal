import React from 'react'
import { ISubHeaderProp } from '../Interfaces/SubHeaderProp';
import reactImage from '../assets/react.png';
import {FaReact} from 'react-icons/fa';
import './SubHeader.css';


const SubHeader = ({pageName}: ISubHeaderProp) => {
  return (
    <section className='sub-header'>
        <div className="sub-header-text">
            {pageName}
        </div>
        <div className="sub-header-icon-container">
            <FaReact className='sub-header-icon'/>
        </div>
    </section>
  )
}

export default SubHeader;