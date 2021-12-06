import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { readTodo, createTodo } from '../Function/index.js'
import './Teacher.css';

// const onSubmit = (async (e) => {
//     e.preventDefault();

//     const result = await createTodo(todo);
//     console.log(result);
// });

const Teacher = () => {
//     // const [todo, setTodo] = useState{})
//     useEffect(() => {
//         const fetchData = async() => {
//             const result = await readTodo();
//             console.log(result);
//         }
//     }, [])
    return (
        <>
            <h1>Teacher Proposals</h1>
            {/* onSubmit={onSubmit} */}
            <form className="form" >
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                    // value={name}
                    // onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Description"
                        name="description"
                    // value={email}
                    // onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Post" />
            </form>

            <div class="cards">
                <div class="card card-1">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
                <div class="card card-2">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
                <div class="card card-3">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Ut enim ad minim veniam.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
                <div class="card card-4">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Quis nostrud exercitation ullamco laboris nisi.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
                <div class="card card-5">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Ut aliquip ex ea commodo consequat. Duis aute irure dolor.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
                <div class="card card-1">
                    <div class="card__icon"><i class="fas fa-bolt"></i></div>
                    <p class="card__exit"><i class="fas fa-times"></i></p>
                    <h2 class="card__title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                    <p class="card__apply">
                        <a class="card__link" href="#">Apply Now <i class="fas fa-arrow-right"></i></a>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Teacher;
