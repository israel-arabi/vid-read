import React, { useState, useRef, SyntheticEvent } from "react";
import YouTube from 'react-youtube';

export interface VideoProps {
    onLoad?: Function;
    onTimeUpdate?: Function;
    currentTime?: number;
}
export function Video(props: VideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [lastCurrentTime, setLastCurrentTime] = useState();
    let onLoadCallback = () => { };

    const onLoadStart = (e: SyntheticEvent<HTMLVideoElement, Event>) => {
        if (!videoRef.current) {
            return;
        }

        if (props.currentTime && props.currentTime && lastCurrentTime !== props.currentTime) {
            videoRef.current.currentTime = props.currentTime;
            setLastCurrentTime(props.currentTime);
        }
        if (props.onLoad) {
            props.onLoad(e);
        }

        onLoadCallback();
    };

    if (videoRef.current && props.currentTime && lastCurrentTime !== props.currentTime) {
        videoRef.current.currentTime = props.currentTime;
        setLastCurrentTime(props.currentTime);
    }

    return (
        <video
            ref={videoRef}
            style={{
                width: '100%'
            }}
            controls
            onLoadStart={onLoadStart}
            onFocus={(e) => {
                e.target.blur();
            }}
            onTimeUpdate={(e) => {
                if (!e.target) {
                    return;
                };

                if (props.onTimeUpdate) {
                    props.onTimeUpdate(e);
                }
            }}
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