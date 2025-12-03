import React from 'react';
import errorImage from '@/assets/ErrorImg.png';
export default function Error({ ErrorClass }) {
    return (
        <div className={ErrorClass}>
            <img src={errorImage} />
            <p></p>
        </div>
    );
}
