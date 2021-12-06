import React, { Fragment, useState, useEffect } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
// import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import studDashboard from '../Dashboard/studDashboard';
import teacherDashboard from '../Dashboard/teacherDashboard';
import './styles.css';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        status:''
    });
    const { email, password, status } = formData;

    // useEffect(() => {
    //     console.log('j', isAuthenticated)
    //     if (isAuthenticated) {
    //         console.log('k')
    //         // conditional statement
    //         console.log(isAuthenticated, status)

    //         if (status === 'Student') {
    //             console.log('student')
    //             history.push('/student')
    //             // return <Redirect to="/" />;
    //         }
    //         else if (status === 'Teacher') {
    //             // return <Redirect to="/"
    //             console.log('teacher')

    //             history.push('/teacher')

    //         }
    //     }
    // }, [isAuthenticated, status]);

    const history = useHistory();


    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password, status, ((state) => {
            state === 'Student' ? history.push('/student') : history.push('/teacher')
        }));
    };
    // console.log(status)

    // Apparently to Landing page future: dashboard


    return (
        // <>
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="name"
                        placeholder="Status"
                        name="status"
                        value={status}
                        onChange={onChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => {
    console.log(state)
    return{
    isAuthenticated: state.auth.isAuthenticated
}};

export default connect(mapStateToProps, { login })(Login)