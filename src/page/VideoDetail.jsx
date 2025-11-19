import React from 'react';
import { useParams } from 'react-router';

export default function VideoDetail() {
    const { videoId } = useParams();

    return <div>특정 비디오{videoId}</div>;
}
