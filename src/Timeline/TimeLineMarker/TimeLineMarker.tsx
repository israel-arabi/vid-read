import React, { useState } from 'react';

import { TimeLineMarkerPopover } from './popover';
import { Cursor } from './Cursor';

interface TimeLineMarkerProps {
    start: number;
    end: number;
    currentTimePercent: number;
    onStartChange: (mouseEventX: number) => unknown;
    onEndChange: (mouseEventX: number) => unknown;

    onPercentStartChange: (start: number) => unknown;
    onPercentEndChange: (end: number) => unknown;

    onDrag: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;

    onMarkerChange: (movement: { leftCursor?: number, rightCursor?: number }) => void
}

export function TimeLineMarker(props: TimeLineMarkerProps) {
    const [isHover, setIsHover] = useState(false);
    const word = 'alif';

    return (
        <div
            style={{
                position: 'absolute',
                height: 'calc(100% + 2px)',
                top: -1,
                left: props.start,
                width: props.end - props.start,
            }}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
            onMouseEnter={() => {
                setIsHover(true);
            }}
            onMouseLeave={() => {
                setIsHover(false);
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'blue',
                }}
                onDrag={e => {
                    if (e.pageX === 0) {
                        return;
                    }
                    props.onDrag(e);

                }}
                onDragEnd={e => {
                    props.onDrag(e);
                }}
                onDragStart={e => {
                    props.onDragStart(e);
                }}
                draggable={true}
            />
            {isHover && <TimeLineMarkerPopover
                word={word}
                startOnCurrent={() => props.onPercentStartChange(props.currentTimePercent)}
                endOnCurrent={() => props.onPercentEndChange(props.currentTimePercent)}
            />}
            <Cursor
                onOffsetChange={props.onStartChange}
                left
                moveLeft={(moveBy) => {
                    props.onMarkerChange({ leftCursor: -moveBy });
                }}
                moveRight={(moveBy) => {
                    props.onMarkerChange({ leftCursor: moveBy });
                }}
            ></Cursor>
            <Cursor
                onOffsetChange={props.onEndChange}
                right
                moveLeft={(moveBy) => {
                    props.onMarkerChange({ rightCursor: -moveBy });
                }}
                moveRight={(moveBy) => {
                    props.onMarkerChange({ rightCursor: moveBy });
                }}
            ></Cursor>
        </div>
    );
}