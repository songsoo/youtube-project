import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/videos/${query}`);
            setQuery('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="검색"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
            ></input>
            <button>
                <AiOutlineSearch />
            </button>
        </form>
    );
}
