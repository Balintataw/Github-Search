import React, { useContext } from 'react';
import GithubContext from '../../context/github/githubContext';

import UserItem from './UserItem';

const Users = () => {
    const githubContext = useContext(GithubContext);
    const { users, dirty } = githubContext;
    return (
        <div className={`grid-${users.length ? '3' : '1'}`}>
            {users.length ? (
                users.map(user => <UserItem {...user} key={user.id} />)
            ) : (
                <div className='text-center'>{dirty ? 'No Results' : ''}</div>
            )}
        </div>
    );
};

export default Users;
