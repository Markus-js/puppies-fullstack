import React, { useState, useRef, useEffect } from 'react'
import styles from './Update.module.scss'
import { useParams } from 'react-router-dom';
import { PuppyInfo } from '../../interface'
interface Props {
  // puppy: PuppyInfo,
  setPuppy: (init: PuppyInfo) => void
}
export const Update: React.FC<Props> = ({ setPuppy }) => {
  const { id } = useParams();
  const [breed, setBreed] = useState<string>('');
  const [dogBreeds, setDogBreeds] = useState<string[]>([])
  // const [dogBreeds, setDogBreeds] = useState<{ text: string, value: string }[]>([])
  const nameRef = useRef<HTMLInputElement>(null);
  // const breedRef = useRef<HTMLInputElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);


  const handleUpdate = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const puppy = {
      name: nameRef.current?.value,
      breed: breed,
      birthDate: birthDateRef.current?.value
    }

    fetch(`http://localhost:8080/api/puppies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    })
      .then(res => res.json())
      .then(data => {
        setPuppy(data)
      }).catch(err => console.log(err))
  }

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then(res => res.json())
      .then(data => {
        const list: string[] = [];
        for (const key in data.message) {
          if (data.message[key].length > 0) {
            data.message[key].forEach((breed: string) => {
              list.push(breed + " " + key)
            })
          } else {
            list.push(key)
          }
        }
        setDogBreeds(list);
      })


    // fetch("https://dog.ceo/api/breeds/list/all")
    //   .then(res => res.json())
    //   .then(data => {
    //     const list: any = [];
    //     for (const key in data.message) {
    //       if (data.message[key].length > 0) {
    //         data.message[key].forEach((breed: string) => {
    //           list.push({ text: `${breed} ${key}`, value: `${breed} ${key}` })
    //         })
    //       } else {
    //         list.push({ text: `${key}`, value: `${key}` })
    //       }
    //     }
    //     // console.log(list)
    //     setDogBreeds(list);
    //   })


  }, [])



  return (
    <section className={styles.form_container}>
      <form className={styles.form} onSubmit={handleUpdate} >
        <label htmlFor="name">Name</label>
        <input ref={nameRef} type="text" name="name" id="name" required />
        <label htmlFor="breed">Breed</label>
        <select name="breed" id="breed" onChange={(e) => setBreed(e.target.value)}>
          {dogBreeds.map((breed, index) => {
            // let breadValue = breed.replace(/\s/g, '-');
            return <option key={index} value={breed}>{breed}</option>
          })}
          {/* {dogBreeds.map((breed, index) => {
            return <option key={index} value={breed.value}>{breed.text}</option>
          })} */}
        </select>
        {/* <input ref={breedRef} type="text" name="breed" id="breed" /> */}
        <label htmlFor="birthDate">Birth Date</label>
        <input ref={birthDateRef} type="date" name="birthDate" id="birthDate" required />
        <button type="submit" >Submit</button>
      </form>
    </section>
  )
}

export default Update;