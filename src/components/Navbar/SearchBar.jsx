import { RxCross2 } from 'react-icons/rx';
import { BiSearch } from 'react-icons/bi';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() !== '') {
            navigate(`/videos/${encodeURIComponent(query)}`);
            inputRef.current?.blur();
        }
    };

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const clearQuery = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="flex h-10 overflow-hidden">
            <div
                className={`relative flex w-lg items-center rounded-l-3xl border ${isInputFocused ? ' border-blue-700' : 'border-neutral-700'}`}
            >
                <input
                    type="text"
                    placeholder="검색"
                    value={query}
                    ref={inputRef}
                    onChange={(e) => handleChange(e)}
                    className="w-full py-2 pl-5 outline-none"
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                ></input>
                {query.trim() !== '' && (
                    <button
                        className="mx-1 rounded-full p-1 text-xl hover:cursor-pointer hover:bg-neutral-500"
                        onClick={clearQuery}
                        type="button"
                    >
                        <RxCross2 />
                    </button>
                )}
            </div>
            <button
                type="submit"
                className="flex w-16 shrink-0 items-center justify-center rounded-r-3xl border-y border-r border-neutral-700 bg-neutral-800 py-2 text-2xl hover:cursor-pointer"
            >
                <BiSearch />
            </button>
        </form>
    );
}
