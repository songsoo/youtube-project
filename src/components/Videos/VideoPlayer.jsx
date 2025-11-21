import React from 'react';
import { useVideoData } from '../../hooks/videoHooks';
import { useEffect } from 'react';

export default function VideoPlayer({ videoId, videoDetail }) {
    const { channelInfo, colorNum } = useVideoData(videoDetail?.items?.snippet?.channelId, videoId);

    return (
        <div className="flex-1 shrink basis-auto">
            <div className="h-fit overflow-hidden rounded-2xl">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="aspect-video w-full"
                ></iframe>
            </div>
            <div>
                
            </div>
        </div>
    );
}
