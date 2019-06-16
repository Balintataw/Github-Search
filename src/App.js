import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';

const App = () => {
    return (
        <GithubState>
            <AlertState>
                <Router>
                    <div className='App'>
                        <Navbar title='Github Finder' icon='fab fa-github' />
                        <div className='container'>
                            <Alert />
                            <Switch>
                                <Route exact path='/' component={Home} />
                                <Route exact path='/about' component={About} />
                                <Route
                                    exact
                                    path='/user/:login'
                                    component={User}
                                />
                            </Switch>
                        </div>
                    </div>
                </Router>
            </AlertState>
        </GithubState>
    );
};

export default App;
