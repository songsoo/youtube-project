import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import Youtube from '../utils/youtubeAPI';

export function useVideoData(channelId) {
    const { data: channelInfo } = useQuery({
        queryKey: ['channelInfo', channelId],
        queryFn: () => {
            const youtube = new Youtube();
            return youtube.getChannelInfo(channelId);
        },
        staleTime: 1000 * 60 * 50,
    });

    return { channelInfo };
}

export function useYouTubeVolumeStorage(videoId, containerRef, setShowMute, intervalMs = 1000) {
    const playerRef = useRef(null);
    const [apiReady, setApiReady] = useState(false);

    useEffect(() => {
        if (window.YT && window.YT.Player && containerRef.current) {
            setApiReady(true);
            return;
        }

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.appendChild(tag);

        window.onYouTubeIframeAPIReady = () => setApiReady(true);
        return () => {
            document.body.removeChild(tag);
        };
    }, [containerRef.current]);

    useEffect(() => {
        if (!apiReady || !containerRef.current) return;

        if (playerRef.current) {
            playerRef.current.loadVideoById(videoId);
            return;
        }

        playerRef.current = new window.YT.Player(containerRef.current, {
            videoId,
            playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 1,
                rel: 0,
            },
            events: {
                onReady: (event) => {
                    const volume = Number(localStorage.getItem('ytVolume') || 50);
                    event.target.setVolume(volume);
                },
            },
        });
    }, [videoId, apiReady]);

    useEffect(() => {
        if (!playerRef.current) return;

        let lastVolume = null;

        const interval = setInterval(() => {
            try {
                const currentVolume = playerRef.current.getVolume();

                if (currentVolume !== lastVolume) {
                    localStorage.setItem('ytVolume', currentVolume);
                    lastVolume = currentVolume;
                }
            } catch (e) {
                console.warn('볼륨 체크 실패:', e);
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [playerRef.current, intervalMs]);

    return playerRef;
}
