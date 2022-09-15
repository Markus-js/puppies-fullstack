import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Create from "../../components/Create/Create";
import { PuppyInfo } from '../../interface'
import "./Home.scss";

export default function Home() {
    //const [toggle, setToggle] = useState<boolean>(false)
    // const somePuppies:PuppyInfo[] = [
    //     { name: "Buddy", breed: "Golden Retriever", birthDate:"13-06-2010" },
    //     { name: "Scooby", breed: "Great Dane", birthDate:"13-06-2018" },
    //     { name: "Snoopy", breed: "Beagle", birthDate:"14-07-2015"},
    // ];

    const [puppies, setPuppies] = useState<PuppyInfo[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/puppies')
            .then(res => res.json())
            .then(data => {
                setPuppies(data)

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Home</h1>
            <Create puppies={puppies} setPuppies={setPuppies} />
            <section className="grid-container">
                {puppies.map((puppy, index) => (
                    <Card key={index} id={puppy._id} name={puppy.name} breed={puppy.breed} birthDate={puppy.birthDate} />
                ))}
            </section>
        </div>
    )
}