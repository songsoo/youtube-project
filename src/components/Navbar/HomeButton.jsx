import youtube_logo from '@/assets/youtube_logo.png';

export default function HomeButton() {

    return (
        <a href="/" className="hover: h-full cursor-pointer py-2">
            <img src={youtube_logo} className="h-full" />
        </a>
    );
}
