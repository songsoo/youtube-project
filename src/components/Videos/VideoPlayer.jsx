import { BiVolumeMute } from 'react-icons/bi';
import { useVideoData, useYouTubeVolumeStorage } from '../../hooks/videoHooks';
import { useRef } from 'react';
import { useState } from 'react';

export default function VideoPlayer({ videoId, videoDetail }) {
    const { channelInfo, colorNum } = useVideoData(videoDetail?.items?.snippet?.channelId, videoId);
    const containerRef = useRef(null);
    const [showMute, setShowMute] = useState(true);
    const playerRef = useYouTubeVolumeStorage(videoId, containerRef, setShowMute, 1000);

    const handleUnmute = () => {
        if (playerRef.current) {
            setShowMute(false);
            playerRef.current.unMute();
        }
    };

    return (
        <div className="relative flex-1 shrink basis-auto">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
                <div ref={containerRef} className="z-0 h-full w-full"></div>
            </div>
            {showMute && (
                <div
                    className="absolute inset-0 flex aspect-video w-full flex-col items-center justify-center rounded-2xl bg-neutral-900 text-5xl opacity-90 select-none hover:opacity-50"
                    onClick={handleUnmute}
                >
                    <BiVolumeMute />
                    <p>클릭해서 음소거 해제</p>
                </div>
            )}
        </div>
    );
}
