import React, { useState, useEffect } from 'react'
import Delete from './components/Delete';
import './Modal.scss';

interface Props {
  type: string,
  show: boolean,
  setShow: (init: boolean) => void
}

const Modal: React.FC<Props> = ({ type, show, setShow }) => {



  return (
    <>
      <div className="modal-bg" onClick={() => setShow(false)} ></div>
      <div className="modal">
        {type === "delete" && <Delete setShow={setShow} />}
      </div>
    </>
  )
}

export default Modal