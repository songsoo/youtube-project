
export default function VideoPlayerSkeleton() {
    return (
        <article className="relative flex-1 shrink basis-auto">
            <section className="bg-skeleton relative aspect-video overflow-hidden rounded-2xl">
                <div className="h-full w-full"></div>
            </section>
            <div className="relative mt-1">
                <div className="bg-skeleton h-8 w-full rounded-md"></div>
                <div className="phone:items-center phone:justify-between phone:flex-row mt-1 flex flex-col">
                    <div className="flex w-full gap-3">
                        <div className="bg-skeleton w-10 shrink-0 rounded-full" />
                        <div className="flex-1">
                            <div className="bg-skeleton mb-1 h-6 w-1/4 rounded-md"></div>
                            <div className="bg-skeleton h-4 w-1/4 rounded-md"></div>
                        </div>
                        <div className="flex gap-2">
                            <div className="bg-skeleton flex h-full w-25 items-center overflow-hidden rounded-4xl"></div>
                            <div className="bg-skeleton h-full w-15 overflow-hidden rounded-4xl px-4"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-skeleton mt-2 h-30 w-full overflow-hidden rounded-2xl"></div>
        </article>
    );
}
