import { BiSearch } from 'react-icons/bi';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    const titleRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/videos/${query}`);
            titleRef.current?.blur();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-10 overflow-hidden">
            <input
                type="text"
                placeholder="검색"
                value={query}
                ref={titleRef}
                className={`w-96 rounded-l-3xl border py-2 pl-5 outline-none ${isInputFocused ? ' border-blue-700' : 'border-neutral-700'}`}
                onChange={(e) => {
                    setQuery(e.target.value);
                }}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
            ></input>
            <button className="flex w-16 items-center justify-center rounded-r-3xl border-y border-r border-neutral-700 bg-neutral-800 py-2 text-2xl hover:cursor-pointer">
                <BiSearch />
            </button>
        </form>
    );
}
