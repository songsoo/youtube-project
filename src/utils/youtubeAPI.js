import axios from 'axios';

export default class Youtube {
    constructor() {
        this.httpClient = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
        });
    }

    async getVideoChannelInfo(videoId) {
        const videoInfo = await this.getVideoInfo(videoId);
        const channelInfo = await this.getChannelInfo(videoInfo.snippet.channelId);

        return {
            videoId: videoId,
            thumbnail: videoInfo.snippet.thumbnails.high.url,
            duration: videoInfo.contentDetails.duration,
            channelThumbnail: channelInfo.snippet.thumbnails.high.url,
            title: videoInfo.snippet.title,
            channelTitle: videoInfo.snippet.channelTitle,
            publishedAt: videoInfo.snippet.publishedAt,
            description: videoInfo.snippet.description,
            viewCount: videoInfo.statistics.viewCount,
            likeCount: videoInfo.statistics.likeCount,
            commentCount: videoInfo.statistics.commentCount,
            tags: videoInfo.snippet.tags || [],
            subscriberCount: channelInfo.statistics.subscriberCount,
        };
    }

    async getPopularVideos() {
        const items = await this.httpClient
            .get(`videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    maxResults: 24,
                    regionCode: 'KR',
                    chart: 'mostPopular',
                },
            })
            .then((res) => {
                return res.data.items;
            });

        const channels = items.map((item) => item.snippet.channelId);
        const channelListInfo = await this.getChannelListInfo(channels);

        const channelThumbnailMap = {};
        const channelSubscriberMap = {};
        channelListInfo.forEach((ch) => {
            channelThumbnailMap[ch.id] = ch.snippet.thumbnails.high.url;
            channelSubscriberMap[ch.id] = ch.statistics.subscriberCount;
        });

        const merged = items.map((item) => {
            return {
                videoId: item.id,
                thumbnail: item.snippet.thumbnails.high.url,
                duration: item.contentDetails.duration,
                channelThumbnail: channelThumbnailMap[item.snippet.channelId],
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,
                description: item.snippet.description,
                viewCount: item.statistics.viewCount,
                likeCount: item.statistics.likeCount,
                commentCount: item.statistics.commentCount,
                tags: item.snippet.tags,
                subscriberCount: channelSubscriberMap[item.snippet.channelId],
            };
        });
        return merged;
    }

    async searchByKeyword(keyword) {
        const items = await this.httpClient
            .get(`search`, {
                params: {
                    part: 'snippet',
                    maxResults: 24,
                    type: 'video',
                    q: keyword,
                },
            })
            .then((res) => {
                return res.data.items.filter((item) => item.id.kind === 'youtube#video');
            });

        const channels = items.map((item) => item.snippet.channelId);
        const channelListInfo = await this.getChannelListInfo(channels);

        const videos = items.map((item) => item.id.videoId);
        const videoListInfo = await this.getVideoListInfo(videos);

        const channelThumbnailMap = {};
        const channelSubscriberMap = {};
        channelListInfo.forEach((ch) => {
            channelThumbnailMap[ch.id] = ch.snippet.thumbnails.high.url;
            channelSubscriberMap[ch.id] = ch.statistics.subscriberCount;
        });

        const videoMap = {};
        videoListInfo.forEach((video) => {
            videoMap[video.id] = video;
        });

        const merged = items.map((item) => {
            const video = videoMap[item.id.videoId];

            return {
                videoId: item.id.videoId,
                thumbnail: item.snippet.thumbnails.high.url,
                title: item.snippet.title,
                channelTitle: item.snippet.channelTitle,
                publishedAt: item.snippet.publishedAt,

                channelThumbnail: channelThumbnailMap[item.snippet.channelId],

                description: video.snippet.description,
                viewCount: video.statistics.viewCount,
                likeCount: video.statistics.likeCount,
                commentCount: video.statistics.commentCount,
                tags: video.snippet.tags,
                duration: video.contentDetails.duration,
                subscriberCount: channelSubscriberMap[item.snippet.channelId],
            };
        });

        return merged;
    }

    async getChannelInfo(channelID) {
        return this.httpClient
            .get(`channels`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: channelID,
                },
            })
            .then((res) => {
                return res.data.items[0];
            });
    }

    async getChannelListInfo(channelID) {
        return this.httpClient
            .get(`channels`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: channelID.join(','),
                },
            })
            .then((res) => {
                return res.data.items;
            });
    }

    async getVideoInfo(videoID) {
        return this.httpClient
            .get(`videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoID,
                },
            })
            .then((res) => {
                return res.data.items[0];
            });
    }

    async getVideoListInfo(videoID) {
        return this.httpClient
            .get(`videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoID.join(','),
                },
            })
            .then((res) => {
                return res.data.items;
            });
    }
}
