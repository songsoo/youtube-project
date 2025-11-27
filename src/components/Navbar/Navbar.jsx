import HomeButton from './HomeButton';
import SearchBar from './SearchBar';

export default function Navbar() {
    return (
        <nav className="relative z-10 mt-1">
            <div className="p-b-8 flex h-16 w-full items-center justify-between">
                <HomeButton />
                <SearchBar />
                <span className="ml-14 hidden md:block"></span>
            </div>
            <div className="mt-1 mb-5 border-b border-neutral-600"></div>
        </nav>
    );
}
