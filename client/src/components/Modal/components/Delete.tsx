import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';


interface Props {
  setShow: (init: boolean) => void
}

export const Delete: React.FC<Props> = ({ setShow }) => {
  const navigate = useNavigate()
  const { id } = useParams();


  const handleDelete = () => {
    fetch(`http://localhost:8080/api/puppies/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
    navigate('/')
  }


  return (
    <div >
      <h2>Are you sure?</h2>
      <button onClick={handleDelete}>Yes</button>
      <button onClick={() =>
        setShow(false)
      }>No</button>
    </div>
  )
}

export default Delete;