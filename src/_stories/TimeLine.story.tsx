import React, { useState } from 'react';
import { TimeLineMarkerLocation, Timeline } from '../Timeline/Timeline';

export function TimelineStory() {
    const [markers, setMarkers] = useState(() => {
        const value: TimeLineMarkerLocation[] = [
            {
                start: 10,
                end: 30,
            },
            {
                start: 35,
                end: 50,
            }
        ];

        return value;
    });
    const [currentTime, changeCurrentTime] = useState(10);

    return (
        <Timeline
            onCurrentTimePercentChange={changeCurrentTime}
            currentTimePercent={currentTime}
            markers={markers}
            setMarkers={(newMarkers) => {
                setMarkers(newMarkers);
            }}
        />
    );
}