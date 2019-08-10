import React, { useState } from "react";
import YouTube from 'react-youtube';
// import song from './song.mp4';

export function Video(props: { onReady?: Function }) {
    const videoRef = React.createRef<HTMLVideoElement>();
    const onLoad = () => {
        console.log(videoRef);
        const target = videoRef.current as HTMLVideoElement;
        // target.currentTime = 60;
        target.addEventListener("timeupdate", (e) => {
            console.log(e);
            if (!e.target) {
                return;
            }
            const target = e.target as HTMLVideoElement;

            // if (target.currentTime > 61) {
            //     target.pause();
            // }
        });
    };
    // setTimeout(, 500)

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