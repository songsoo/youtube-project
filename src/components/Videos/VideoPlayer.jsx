import { BiVolumeMute } from 'react-icons/bi';
import { useYouTubeVolumeStorage } from '../../hooks/videoHooks';
import { useRef, useState, useEffect } from 'react';
import { getDominantColor } from '../../utils/image';
import {
    decodeHtml,
    getDateDiff,
    getCount,
    getCommaFormatNumber,
    getDetailDate,
} from './../../utils/text';
import VideoButtons from './VideoButtons';
import { Link } from 'react-router';

export default function VideoPlayer({ videoId, video, isLoading }) {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);

    const [showMute, setShowMute] = useState(true);
    const [showDescription, setShowDescription] = useState(false);
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

    const playerRef = useYouTubeVolumeStorage(videoId, containerRef, setShowMute, 1000);

    const handleUnmute = () => {
        if (playerRef.current) {
            setShowMute(false);
            playerRef.current.unMute();
        }
    };

    const scrollToSection = () => {
        const sectionLoc = sectionRef.current.getBoundingClientRect().top;
        if (sectionLoc < 0) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        getDominantColor(video.thumbnail).then((color) => {
            setColor({ r: color.r, g: color.g, b: color.b });
        });
    }, [videoId]);

    return (
        <article className="relative flex-1 shrink basis-auto">
            <section
                className="relative aspect-video overflow-hidden rounded-2xl"
                style={{
                    boxShadow: `0px 15px 100px 40px rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`,
                }}
            >
                <div className="h-full w-full" ref={containerRef}></div>
            </section>
            {showMute && (
                <div
                    className="absolute inset-0 flex aspect-video w-full flex-col items-center justify-center rounded-2xl bg-neutral-900 text-5xl opacity-90 select-none hover:opacity-50"
                    onClick={handleUnmute}
                >
                    <BiVolumeMute />
                    <p>클릭해서 음소거 해제</p>
                </div>
            )}
            <div className="relative mt-1" ref={sectionRef}>
                <header className="line-clamp-2 text-[1.3rem] font-semibold text-white">
                    {video.title}
                </header>
                <div className="phone:items-center phone:justify-between phone:flex-row mt-1 flex flex-col">
                    <div className="flex gap-3">
                        <img src={video.channelThumbnail} className="w-10 shrink-0 rounded-full" />
                        <div>
                            <p className="truncate text-[1rem] font-semibold">
                                {video.channelTitle}
                            </p>
                            <p className="truncate text-[0.7rem] text-neutral-400">
                                구독자 {getCount(video.subscriberCount)}명
                            </p>
                        </div>
                    </div>
                    <VideoButtons likeCount={video.likeCount} videoId={videoId} />
                </div>
            </div>
            <section className="group relative mt-2 w-full overflow-hidden rounded-2xl bg-neutral-800 p-3">
                {!showDescription && (
                    <div
                        className="absolute top-0 left-0 z-10 h-full w-full cursor-pointer opacity-30 group-hover:bg-amber-900"
                        onClick={() => setShowDescription(true)}
                    ></div>
                )}
                <div className="text-[0.825rem] font-semibold">
                    <span>조회수 </span>
                    <span>
                        {showDescription
                            ? getCommaFormatNumber(video.viewCount)
                            : getCount(video.viewCount)}
                        회{' '}
                    </span>
                    <span>
                        {showDescription
                            ? getDetailDate(video.publishedAt)
                            : getDateDiff(video.publishedAt)}
                    </span>
                </div>
                {video?.tags?.map((tag, index) => (
                    <Link
                        key={index}
                        className="relative z-10 mr-1 cursor-pointer text-[0.87rem] text-blue-400"
                        to={`/videos/${tag}`}
                    >
                        #{tag}
                    </Link>
                ))}
                <p
                    className={`text-[0.87rem] font-medium whitespace-pre ${!showDescription && 'line-clamp-2'} text-neutral-300`}
                >
                    {decodeHtml(video.description)}
                </p>
                {showDescription && (
                    <button
                        className="cursor-pointer"
                        onClick={() => {
                            setShowDescription(false);
                            scrollToSection();
                        }}
                    >
                        <br />
                        <br />
                        간략히
                    </button>
                )}
            </section>
        </article>
    );
}
