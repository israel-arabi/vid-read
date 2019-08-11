import React, { useState, useRef } from "react";
import YouTube from 'react-youtube';
// import song from './song.mp4';

export function Video(props: { onReady?: Function, onTimeUpdate?: Function, currentTime?: number }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    let onLoadCallback = () => { };
    const onLoad = () => {
        if (!videoRef.current) {
            return;
        }

        if (props.currentTime && props.currentTime) {
            videoRef.current.currentTime = props.currentTime;
        }

        onLoadCallback();
        videoRef.current.addEventListener("timeupdate", (e) => {
            if (!e.target) {
                return;
            }
            const target = e.target as HTMLVideoElement;

            if (props.onTimeUpdate) {
                props.onTimeUpdate(target.currentTime);
            }
        });
    };

    if (videoRef.current && props.currentTime && props.currentTime) {
        videoRef.current.currentTime = props.currentTime;
    }

    return (
        <video
            ref={videoRef}
            style={{
                width: '100%'
            }}
            controls
            onLoadStart={onLoad}
        >
            <source src={process.env.PUBLIC_URL + '/song.mp4'} type="video/mp4" />
        </video>
    );
    return (
        <YouTube
            videoId="VqVAbHI_KDU"
        />
    );
}