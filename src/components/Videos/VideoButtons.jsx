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
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

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
        <>
            <div className="flex h-[2.4rem] cursor-pointer gap-2 text-neutral-100">
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
                            <BsHandThumbsUpFill
                                strokeWidth={strokeWidth}
                                size={size}
                                className="animate-pop"
                            />
                        ) : (
                            <BsHandThumbsUp strokeWidth={strokeWidth} size={size} />
                        )}
                        <p className="text-[0.85rem] font-semibold">{getCount(likeCount)}</p>
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
                <div
                    className="flex h-full items-center gap-2 overflow-hidden rounded-4xl bg-neutral-800 px-4 text-xl hover:bg-neutral-600"
                    onClick={() => {
                        navigator.clipboard
                            .writeText(window.location.href)
                            .then(() => {
                                toast.success('클립보드에 저장 성공');
                            })
                            .catch((e) => {
                                toast.error('클립보드에 저장 실패' + e.message);
                            });
                    }}
                >
                    <RiShareForwardLine strokeWidth={strokeWidth} size={size} />
                    <p className="text-[0.91rem] font-bold">공유</p>
                </div>
            </div>
            <Toaster
                position="bottom-left"
                toastOptions={{ className: 'text-sm', duration: 2000 }}
                containerStyle={{ left: 40, bottom: 30 }}
            />
        </>
    );
}
