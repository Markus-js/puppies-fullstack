import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Card.scss";

interface Props {
    id: string;
    name: string,
    breed: any,
    birthDate: string
}



const Card: React.FC<Props> = ({ id, name, breed, birthDate }) => {

    // if (breed.match(/\//g)) {
    //     console.log('this runds for', breed);
    //     breed = breed.split("/").reverse().join(" ");
    // }

    return (
        <Link to={`/${id}`}>
            <div className="card">
                <h1>{name}</h1>
                <h2>{breed}</h2>
                <p>{birthDate}</p>
            </div>
        </Link>
    )
}

export default Card