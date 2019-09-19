import React, { useState } from 'react';
import { TimeLineMarkerLocation, Timeline } from '../Timeline/Timeline';
import * as _ from 'lodash';

export function TimelineStory() {
    const [markers, setMarkers] = useState([
        {
            start: 10,
            end: 30,
        },
        {
            start: 35,
            end: 50,
        }
    ]);
    const [currentTime, changeCurrentTime] = useState(10);
    return (
        <>
            <Timeline
                onCurrentTimePercentChange={changeCurrentTime}
                currentTimePercent={currentTime}
                markers={markers}
                setMarkers={(newMarkers) => {
                    setMarkers(newMarkers);
                }}
            />

            <pre>
                {JSON.stringify(markers, null, 4)}
            </pre>
        </>
    );
}