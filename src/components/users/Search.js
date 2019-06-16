import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
    const { users, clearUsers, searchUsers } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);
    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        if (searchText.trim() === '') {
            setAlert('danger', 'Search field cannot be empty');
            return;
        }
        searchUsers(searchText);
        setSearchText('');
    };

    const enterKeyListener = event => {
        if (event.key === 'Enter') handleSearch();
    };

    return (
        <div>
            <div className='form'>
                <input
                    type='text'
                    name='text'
                    placeholder='Search Users...'
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    onKeyPress={e => enterKeyListener(e)}
                />
                <input
                    type='button'
                    value='Search'
                    className='btn btn-dark btn-block'
                    onClick={handleSearch}
                />
            </div>
            {users.length > 0 && (
                <button
                    className='btn btn-light btn-block'
                    onClick={clearUsers}
                >
                    Clear
                </button>
            )}
        </div>
    );
};

export default Search;
