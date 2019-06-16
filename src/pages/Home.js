import React, { useContext } from 'react';
import Users from '../components/users/Users';
import Spinner from '../components/layout/Spinner';
import Search from '../components/users/Search';

import GithubContext from '../context/github/githubContext';

const Home = () => {
    const githubContext = useContext(GithubContext);
    const { loading } = githubContext;

    return (
        <div className='container'>
            <Search />
            {loading ? <Spinner /> : <Users />}
        </div>
    );
};

export default Home;
