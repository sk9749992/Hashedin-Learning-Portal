import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { useGlobalContext } from '../context'
import './DialogModal.css'

const DialogModal = () => {
  const { modal, closeModal } = useGlobalContext();
  const {show, message} = modal;
  return (
    <div className={`modal-overlay ${show && 'show-modal'}`}>
    <div className='modal-container'>
      <h4>{message}</h4>
      <button className='close-modal-btn' onClick={closeModal}>
        <FaTimes/>
      </button>
      {show && <button className='modal-btn' onClick={closeModal}>Ok</button>}
    </div>
  </div>
  )
}

export default DialogModal