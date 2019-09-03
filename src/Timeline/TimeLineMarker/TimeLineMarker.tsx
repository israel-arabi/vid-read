import React from 'react';

import { TimeLineMarkerPopover } from './popover';
import { Cursor } from './Cursor';

interface TimeLineMarkerProps {
    start: number;
    end: number;
    onStartChange: (start: number) => unknown
    onEndChange: (end: number) => unknown
}

export function TimeLineMarker(props: TimeLineMarkerProps) {
    const word = 'alif';

    return (
        <div
            style={{
                position: 'absolute',
                height: 'calc(100% + 2px)',
                top: -1,
                left: props.start,
                width: props.end - props.start,
                backgroundColor: 'blue',
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onMouseEnter={() => {

            }}
        >
            <TimeLineMarkerPopover
                word={word}
            />
            <Cursor
                onOffsetChange={props.onStartChange}
                left
            ></Cursor>
            <Cursor
                onOffsetChange={props.onEndChange}
                right
            ></Cursor>
        </div>
    );
}