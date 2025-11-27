import youtube_logo from '@/assets/youtube_logo.png';

export default function HomeButton() {
    return (
        <a href="/" className="hover: h-full shrink-0 cursor-pointer">
            <img src={youtube_logo} className="h-full py-2" />
        </a>
    );
}
