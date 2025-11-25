export function getLikeStateLocalStorage(videoId) {
    const data = JSON.parse(localStorage.getItem('likeState') || '{}');
    return data[videoId] || 0; // 기본값 0
}

export function setLikeStateLocalStorage(videoId, state) {
    const data = JSON.parse(localStorage.getItem('likeState') || '{}');
    data[videoId] = state;
    localStorage.setItem('likeState', JSON.stringify(data));
}
