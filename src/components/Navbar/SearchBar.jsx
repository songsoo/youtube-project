import { RxCross2 } from 'react-icons/rx';
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
            <div
                className={`relative flex w-96 items-center rounded-l-3xl border ${isInputFocused ? ' border-blue-700' : 'border-neutral-700'}`}
            >
                <input
                    type="text"
                    placeholder="검색"
                    value={query}
                    ref={titleRef}
                    onChange={(e) => {
                        setQuery(e.target.value);
                    }}
                    className="w-full py-2 pl-5 outline-none"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                ></input>
                {query.trim() !== '' && (
                    <button
                        className="mx-1 rounded-full p-1 text-xl hover:cursor-pointer hover:bg-neutral-500"
                        onClick={() => {
                            setQuery('');
                            titleRef.current?.focus();
                        }}
                        type="button"
                    >
                        <RxCross2 />
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="flex w-16 items-center justify-center rounded-r-3xl border-y border-r border-neutral-700 bg-neutral-800 py-2 text-2xl hover:cursor-pointer"
            >
                <BiSearch />
            </button>
        </form>
    );
}
