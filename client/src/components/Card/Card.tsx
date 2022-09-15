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
                <h2>{name}</h2>
                <h4>{breed}</h4>
                <p>{birthDate}</p>
            </div>
        </Link>
    )
}

export default Card