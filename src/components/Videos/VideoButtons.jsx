import { RiShareForwardFill } from 'react-icons/ri';
import { RiShareForwardLine } from 'react-icons/ri';
import {
    BsHandThumbsDown,
    BsHandThumbsDownFill,
    BsHandThumbsUp,
    BsHandThumbsUpFill,
} from 'react-icons/bs';
import { useEffect } from 'react';
import { useState } from 'react';
import { getLikeStateLocalStorage, setLikeStateLocalStorage } from '../../utils/video';
import { getCount } from '../../utils/text';

export default function VideoButtons({ likeCount, videoId }) {
    const strokeWidth = 0.6;
    const size = 22;
    const [likeState, setLikeState] = useState(0);

    useEffect(() => {
        setLikeState(getLikeStateLocalStorage(videoId));
    }, [videoId]);

    const handleClick = (newLikeState) => {
        setLikeStateLocalStorage(videoId, newLikeState);
        setLikeState(newLikeState);
    };

    return (
        <div className="flex h-[2.4rem] cursor-pointer gap-2">
            <div className="flex h-full items-center overflow-hidden rounded-4xl bg-neutral-800 text-xl">
                <div
                    className={`flex h-full items-center gap-2 px-4 hover:bg-neutral-600`}
                    onClick={() => {
                        if (likeState == 1) {
                            handleClick(0);
                            likeCount--;
                        } else {
                            handleClick(1);
                            likeCount++;
                        }
                    }}
                >
                    {' '}
                    {likeState == 1 ? (
                        <BsHandThumbsUpFill strokeWidth={strokeWidth} size={size} />
                    ) : (
                        <BsHandThumbsUp strokeWidth={strokeWidth} size={size} />
                    )}
                    <p className="text-[0.91rem] font-bold">{getCount(likeCount)}</p>
                </div>
                <div className="h-3/4 w-px bg-neutral-500"></div>
                <div
                    className={`flex h-full items-center px-4 hover:bg-neutral-600`}
                    onClick={() => {
                        if (likeState == 2) {
                            handleClick(0);
                        } else {
                            handleClick(2);
                        }
                    }}
                >
                    {likeState == 2 ? (
                        <BsHandThumbsDownFill strokeWidth={strokeWidth} size={size} />
                    ) : (
                        <BsHandThumbsDown strokeWidth={strokeWidth} size={size} />
                    )}
                </div>
            </div>
            <div className="flex h-full items-center gap-2 overflow-hidden rounded-4xl bg-neutral-800 px-4 text-xl hover:bg-neutral-600">
                <RiShareForwardLine strokeWidth={strokeWidth} size={size} />
                <p className="text-[0.91rem] font-bold">공유</p>
            </div>
        </div>
    );
}
