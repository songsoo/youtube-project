import React from 'react';

export default function VideoCardSkeleton({ isVertical }) {
    return (
        <div
            className={`group relative h-fit w-full hover:cursor-pointer ${!isVertical && 'flex gap-3'}`}
        >
            <div
                className={`bg-skeleton relative z-10 aspect-video shrink-0 rounded-xl ${isVertical ? 'mb-2 w-full' : 'w-40'}`}
            >
                <span className="invisible"></span>
            </div>
            <div className={`flex flex-1 gap-3`}>
                {isVertical && <div className="bg-skeleton mt-1 h-10 w-10 rounded-full" />}
                <div className={`flex flex-1 flex-col gap-2`}>
                    <div className={`bg-skeleton block h-5 w-full rounded-md`}></div>
                    <div className={`bg-skeleton block h-3 w-1/3 rounded-md`}></div>
                    <div className={`bg-skeleton block h-3 w-1/3 rounded-md`}></div>
                </div>
            </div>
        </div>
    );
}
