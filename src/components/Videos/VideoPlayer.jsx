import { BiVolumeMute } from 'react-icons/bi';
import { useVideoData, useYouTubeVolumeStorage } from '../../hooks/videoHooks';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDominantColor } from '../../utils/image';
import { decodeHtml } from './../../utils/text';
import { getDateDiff } from '../../utils/video';

export default function VideoPlayer({ videoId, videoDetail }) {
    const { channelInfo } = useVideoData(videoDetail?.channelId, videoId);

    const containerRef = useRef(null);

    const [showMute, setShowMute] = useState(true);
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });

    const playerRef = useYouTubeVolumeStorage(videoId, containerRef, setShowMute, 1000);

    const handleUnmute = () => {
        if (playerRef.current) {
            setShowMute(false);
            playerRef.current.unMute();
        }
    };

    useEffect(() => {
        getDominantColor(videoDetail?.snippet.thumbnails.high.url).then((color) => {
            setColor({ r: color.r, g: color.g, b: color.b });
        });
    }, [videoDetail?.snippet.thumbnails.high.url]);

    return (
        <article className="relative flex-1 shrink basis-auto">
            <section
                className="relative aspect-video overflow-hidden rounded-2xl"
                style={{
                    boxShadow: `0 0px 150px 20px rgba(${color.r}, ${color.g}, ${color.b}, 0.6)`,
                }}
            >
                <div
                    ref={containerRef}
                    className="z-0 h-full w-full"
                    style={{
                        boxShadow: `0 4px 170px 20px rgba(${color.r}, ${color.g}, ${color.b}, 0.9)`,
                    }}
                ></div>
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
            <header>
                <header className="line-clamp-2 text-2xl font-semibold">
                    {videoDetail?.snippet.title}
                </header>
                <div className="flex justify-between">
                    <p>채널 정보</p>
                    <p>동영상 좋아요 공유 및 등등 {videoDetail?.statistics?.likeCount}</p>
                </div>
            </header>
            <section>
                <span>조회수{videoDetail?.statistics?.viewCount} || </span>
                <span>{getDateDiff(videoDetail?.snippet.publishedAt)}</span>
                <p className="whitespace-pre">{decodeHtml(videoDetail?.description)}</p>
            </section>
        </article>
    );
}
