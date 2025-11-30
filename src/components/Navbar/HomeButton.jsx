import youtube_logo from '@/assets/youtube_logo.png';
import { Link } from 'react-router';

export default function HomeButton() {
    return (
        <Link to="/" className="hover: h-full shrink-0 cursor-pointer">
            <img src={youtube_logo} className="h-full py-2" />
        </Link>
    );
}
