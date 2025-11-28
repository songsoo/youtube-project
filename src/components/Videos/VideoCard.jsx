import { useVideoData } from '../../hooks/videoHooks';
import { decodeHtml, parseIso8601Duration } from '../../utils/text';
import { useNavigate } from 'react-router';
import { getDominantColor } from '../../utils/image';
import { useState } from 'react';
import { useEffect } from 'react';
import { getDateDiff } from './../../utils/text';
import { useQuery } from '@tanstack/react-query';
import Loading from './loading';

export default function VideoCard({
    isVertical = true,
    showChannelImg = true,
    showHoverEffect = true,
    item,
}) {
    const { channelInfo } = useVideoData(item.snippet.channelId);
    const navigate = useNavigate();
    const [color, setColor] = useState({ r: 0, g: 0, b: 0 });
    const {
        isLoading,
        error,
        data: videoDetail,
    } = useQuery({
        queryKey: ['videoDetail', item.id.videoId],
        queryFn: () => {
            return fetch(`/data/getVideoInfo.json`).then((response) => response.json());
        },
        staleTime: 1000 * 60 * 50, //50분
    });

    useEffect(() => {
        getDominantColor(item.snippet.thumbnails.high.url).then((color) => {
            setColor({ r: color.r, g: color.g, b: color.b });
        });
    }, [item.id.videoId]);

    return isLoading ? (
        <Loading />
    ) : (
        <a
            className={`group relative h-fit w-full hover:cursor-pointer ${!isVertical && 'flex gap-3'}`}
            href={`/videos/watch/${item.id.videoId}`}
        >
            <div
                className={`relative z-10 aspect-video rounded-xl ${isVertical ? 'mb-2 w-full' : 'w-40'}`}
                style={{
                    background: `url("${item.snippet.thumbnails.high.url}")`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="absolute right-1.5 bottom-1.5 rounded-sm bg-black/80 px-1.5 text-xs font-medium text-white">
                    {parseIso8601Duration(videoDetail?.items[0].contentDetails?.duration)}
                </div>
            </div>
            <div className={`flex flex-1 gap-3`}>
                {showChannelImg && (
                    <img
                        className="mt-1 h-10 w-10 rounded-full"
                        src={channelInfo?.snippet.thumbnails?.high?.url}
                    />
                )}

                <div className={`flex flex-col ${!isVertical && 'gap-1'}`}>
                    <p
                        className={`line-clamp-2 font-semibold break-all text-neutral-100 ${isVertical ? 'text-md' : 'text-sm'} `}
                    >
                        {decodeHtml(item.snippet.title)}
                    </p>
                    <p
                        className={`w-fit font-medium text-neutral-400 ${isVertical ? 'text-[0.825rem] hover:text-white' : 'text-xs'}`}
                    >
                        {item.snippet.channelTitle}
                    </p>
                    <p
                        className={`${isVertical ? 'text-[0.85rem]' : 'text-xs'} font-medium text-neutral-400`}
                    >
                        {getDateDiff(item.snippet.publishedAt)}
                    </p>
                </div>
            </div>
            {showHoverEffect && (
                <div
                    className={`pointer-events-none absolute top-1/2 left-1/2 h-full w-full -translate-1/2 rounded-xl opacity-0 transition duration-400 ease-out group-hover:scale-105 group-hover:cursor-pointer group-hover:opacity-40`}
                    style={{
                        backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`,
                        filter: 'saturate(1.4)',
                    }}
                ></div>
            )}
        </a>
    );
}
