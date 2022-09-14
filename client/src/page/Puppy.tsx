import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PuppyInfo } from '../interface'
import Update from '../components/Update/Update';

export default function OnePuppy() {

  const [puppy, setPuppy] = useState<PuppyInfo | null>(null);
  const [imgUrl, setImgUrl] = useState<string>('')

  const { id } = useParams();

  useEffect(() => {
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

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/puppies/${id}`, {
      method: 'DELETE'
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
  }


  return puppy ? (
    <>
      <Update />
      <div>
        <h1>{puppy?.name}</h1>
        <h2>{puppy?.breed}</h2>
        <p>Age</p>
        <img src={imgUrl} alt="puppy" />
        <p>{puppy?.birthDate}</p>
        <button onClick={handleDelete} >Delete</button>
      </div>
    </>
  ) : <p>No puppy found</p>
}