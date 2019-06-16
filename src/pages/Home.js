import React, { useState, useContext } from 'react';
import Users from '../components/users/Users';
import Spinner from '../components/layout/Spinner';
import Search from '../components/users/Search';
import Alert from '../components/layout/Alert';

import GithubContext from '../context/github/githubContext';

const Home = () => {
    const githubContext = useContext(GithubContext);
    const { users, clearUsers, loading } = githubContext;
    const [appAlert, setAppAlert] = useState(null);

    const onAlert = (type, message) => {
        setAppAlert({ type: type, message: message });
        setTimeout(() => {
            setAppAlert(null);
        }, 2000);
    };

    return (
        <div className='container'>
            {appAlert && <Alert appAlert={appAlert} />}
            <Search
                clearUsers={clearUsers}
                showClear={users.length > 0}
                showAlert={onAlert}
            />
            {loading ? <Spinner /> : <Users />}
        </div>
    );
};

export default Home;
