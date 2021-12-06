import React, { Fragment, useEffect } from 'react';
import Home from './components/Home/Home';
import Student from './components/Student/Student';
import Teacher from './components/Teacher/Teacher';
import Admin from './components/Admin/Admin';
import NavBar from './components/Layout/Navbar/Navbar';
import NotFound from './components/Layout/NotFound/NotFound';
import Footer from './components/Layout/Footer/Footer';
import Landing from './components/Layout/Landing/Landing';
import Login from './components/Auth/LogIn';
import Register from './components/Auth/Register';
import teacherDashboard from './components/Dashboard/teacherDashboard';
import Alert from './components/Layout/Alert/Alert';
import { loadTeacher } from './actions/auth.js';
import setAuthToken from './utils/setAuthToken';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadTeacher());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <NavBar />

          <Switch>                                            {/*   switch can have only routes in it */}
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Register} />
            <Route path="/Login" component={Login} />
            <Route path="/student" component={Student} />
            <Route path="/teacher" component={teacherDashboard} />
            <Route path="/admin" component={Admin} />
            {/* <Redirect to="/" /> */}
            <Route component={NotFound} />
          </Switch>

          <Footer />

        </Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;