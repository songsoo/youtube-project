import axios from 'axios';

export default class Youtube {
    constructor() {
        this.httpClient = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL,
            params: { key: import.meta.env.VITE_YOUTUBE_API_KEY },
        });
    }

    async getPopularVideos() {
        return this.httpClient
            .get(`videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    maxResults: 25,
                    regionCode: 'KR',
                    chart: 'mostPopular',
                },
            })
            .then((res) => {
                return res.data;
            });
    }

    async searchByKeyword(keyword) {
        return this.httpClient
            .get(`search`, {
                params: {
                    part: 'snippet',
                    maxResults: 25,
                    q: keyword,
                    type: 'video',
                },
            })
            .then((res) => {
                return res.data;
            });
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

    async getVideoInfo(videoID) {
        return this.httpClient
            .get(`videos`, {
                params: {
                    part: 'snippet,contentDetails,statistics',
                    id: videoID,
                },
            })
            .then((res) => {
                return res.data;
            });
    }
}
