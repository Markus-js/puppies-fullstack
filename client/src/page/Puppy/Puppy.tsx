import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PuppyInfo } from '../../interface'
import Update from '../../components/Update/Update';
import Modal from '../../components/Modal/Modal';
import './Puppy.scss';

export default function Puppy() {


  const [show, setShow] = useState<boolean>(false);
  const [puppy, setPuppy] = useState<PuppyInfo | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('')

  const { id } = useParams();

  useEffect(() => {
    console.log("run init")
    fetch(`http://localhost:8080/api/puppies/${id}`)
      .then(res => res.json())
      .then(data => setPuppy(data))
      .catch(err => console.log(err))

  }, [])


  useEffect(() => {
    let fetchBreed = puppy?.breed;
    if (puppy?.breed.match(/\s/g)) {
      fetchBreed = puppy.breed.split(" ").reverse().join("/");
    }
    console.log(puppy?.breed, 'this is the breed');
    console.log(fetchBreed, 'this is the fetchBreed');
    const url = `https://dog.ceo/api/breed/${fetchBreed}/images/random/1`;
    fetch(url).then(res => res.json()).then(data => setImgUrl(data.message[0]))
  }, [puppy])

  const handleModal = () => {
    setShow(true)
  }



  return puppy ? (
    <>

      {show && <Modal setShow={setShow} show={show} type="delete" />}
      <Update setPuppy={setPuppy} />
      <section className="puppy-container">
        <img src={imgUrl} alt="puppy" />
        <div>
          <h2>{puppy?.name}</h2>
          <h4>{puppy?.breed}</h4>
          <p>{puppy?.birthDate}</p>
          <button onClick={handleModal} >Delete</button>
        </div>

      </section>
    </>
  ) : <p>No puppy found</p>
}