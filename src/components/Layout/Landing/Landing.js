import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
    return (
        <section className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1 className='x-large'>The Academy</h1>
                    <p className='lead'>
                        A platform to learn, teach and earn for Teachers & Students.
                    </p>
                    <div className='buttons'>
                        <Link to='/register' className='btn btn-info'>
                            Sign Up
                        </Link>
                    
                        <Link to='/login' className='btn btn-danger'>
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;