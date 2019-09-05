import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useRef } from "react";
import { getLimitedNumber, getOffsetData } from './utils';
import { TimeLineCursor } from './TimeLineCursor';
import { TimeLineMarker } from './TimeLineMarker/TimeLineMarker';
import { updateItem } from '../util/immutable-updates';

interface TimeLineMarkerLocation {
    start: number,
    end: number,
}

function isTimeLineMarker(obj: Partial<TimeLineMarkerLocation>): obj is TimeLineMarkerLocation {
    return !!obj.start && !!obj.end;
}

interface TimelineProps {
    change?: Function;
    currentTimePercent: number;
    setMarkers: Function;
    markers: Partial<TimeLineMarkerLocation>[];
}
export function Timeline(props: TimelineProps) {
    const [isMouseDown, setMouseDown] = useState(false);
    const [clientWidth, setClientWidth] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [currentTime, setCurrentTime] = useState(props.currentTimePercent);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', setMouseDownFalse);
        if (divRef.current) {
            setClientWidth(divRef.current.clientWidth);
            setOffsetLeft(divRef.current.offsetLeft);
            const onePercent = divRef.current.clientWidth / 100;
            setCurrentTime(props.currentTimePercent * onePercent);
        }
        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', setMouseDownFalse);
        }
    }, [isMouseDown, divRef, clientWidth]);

    const setMouseDownTrue = () => setMouseDown(true);
    const setMouseDownFalse = () => setMouseDown(false);

    const offsetPercentChange = (eventMouseX: number) => {
        const offsetData = getOffsetData(clientWidth, offsetLeft, eventMouseX);

        if (props.change) {
            props.change(offsetData.clickPercent);
        }

        // setCurrentTime(offsetData.clickOffset);
    }

    const mousemove = (e: MouseEvent) => {
        // e.target === divRef.current
        if (!isMouseDown) {
            return;
        }
        offsetPercentChange(e.x);
    }

    const onMouseDown = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDownTrue();
        offsetPercentChange(e.pageX);
    }

    const cursorWidth = 3;

    const getLeft = () => {
        if (!divRef.current) {
            return 0;
        }

        return getLimitedNumber(props.currentTimePercent * (divRef.current.clientWidth / 100), clientWidth - cursorWidth)
    }

    const setMarker = (markerId: number, value: { start?: number; end?: number }) => {
        const marker = { ...props.markers[markerId] };
        if (value.start) {
            marker.start = getLimitedNumber(value.start, marker.end);
        }
        if (value.end) {
            marker.end = getLimitedNumber(value.end, clientWidth, marker.start);
        }
        props.setMarkers(updateItem(props.markers, markerId, marker));
    }

    return (
        <div
            ref={divRef}
            onMouseDown={onMouseDown}
            onMouseUp={setMouseDownFalse}
            style={{
                width: '100%',
                height: '10px',
                backgroundColor: 'green',
                position: 'relative',
                zIndex: 1
            }}
        >
            {props.markers.filter(isTimeLineMarker).map((marker, index) => (
                <TimeLineMarker
                    key={index}
                    start={marker.start}
                    end={marker.end}
                    onStartChange={mouseEventX => {
                        setMarker(index, { start: mouseEventX - offsetLeft });
                    }}
                    onEndChange={mouseEventX => {
                        setMarker(index, { end: mouseEventX - offsetLeft });
                    }}
                    onPercentStartChange={(percent) => {
                        if (!divRef.current) {
                            return;
                        }
                        console.log(percent * (divRef.current.clientWidth / 100));
                        setMarker(index, { start: percent * (divRef.current.clientWidth / 100) });
                    }}
                    onPercentEndChange={(percent) => {
                        if (!divRef.current) {
                            return;
                        }
                        setMarker(index, { end: percent * (divRef.current.clientWidth / 100) });
                    }}
                    {...props}
                />
            ))}

            <TimeLineCursor
                left={getLeft()}
                cursorWidth={cursorWidth}
            />
        </div>
    );
}
