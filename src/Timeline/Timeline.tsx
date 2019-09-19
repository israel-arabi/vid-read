import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { getLimitedNumber, getOffsetData } from './utils';
import { TimeLineCursor } from './TimeLineCursor';
import { TimeLineMarker } from './TimeLineMarker/TimeLineMarker';
import { updateItem } from '../util/immutable-updates';
import * as _ from 'lodash';
export interface TimeLineMarkerLocation {
    start: number,
    end: number,
    initialDrag?: {
        start: number;
        end: number;
    },
}

function isValidTimeLineMarker(obj: TimeLineMarkerLocation) {
    return obj.start >= 0 && obj.end >= 0;
}

interface TimelineProps {
    onCurrentTimePercentChange?: Function;
    currentTimePercent: number;
    setMarkers: Dispatch<SetStateAction<TimeLineMarkerLocation[]>>;
    markers: TimeLineMarkerLocation[];
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

        if (props.onCurrentTimePercentChange) {
            props.onCurrentTimePercentChange(offsetData.clickPercent);
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

    const setMarker = (markerId: number, value: Partial<TimeLineMarkerLocation>) => {
        const marker = { ...props.markers[markerId], ...value };
        if (value.start) {
            const prevMarker = props.markers[markerId - 1];
            const lowestStart = _.get(prevMarker, 'end', 0);
            marker.start = getLimitedNumber(value.start, marker.end, lowestStart);
        }
        if (value.end) {
            const nextMarker = props.markers[markerId + 1];
            const highestEnd = _.get(nextMarker, 'start', clientWidth);
            marker.end = getLimitedNumber(value.end, highestEnd, marker.start);
        }
        const newMarkers = updateItem(props.markers, markerId, marker);
        props.setMarkers(newMarkers);
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
            {props.markers.filter(isValidTimeLineMarker).map((marker, index) =>
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
                        setMarker(index, { start: percent * (divRef.current.clientWidth / 100) });
                    }}
                    onPercentEndChange={(percent) => {
                        if (!divRef.current) {
                            return;
                        }
                        setMarker(index, { end: percent * (divRef.current.clientWidth / 100) });
                    }}
                    currentTimePercent={props.currentTimePercent}
                    onDragStart={e => {
                        const initialDrag = {
                            start: e.pageX - marker.start,
                            end: e.pageX - marker.end,
                        }
                        setMarker(index, { initialDrag });
                    }}
                    onDrag={e => {
                        if (!marker.initialDrag) {
                            return;
                        }
                        const end = e.pageX - marker.initialDrag.end;
                        const start = e.pageX - marker.initialDrag.start;
                        setMarker(index, {
                            end,
                            start,
                        });
                    }}
                    onMarkerChange={e => {
                        const newProps: Partial<TimeLineMarkerLocation> = {};
                        if (e.leftCursor) {
                            newProps.start = e.leftCursor + marker.start;
                        }
                        if (e.rightCursor) {
                            newProps.end = e.rightCursor + marker.end;
                        }
                        setMarker(index, newProps);
                    }}
                />
            )}

            <TimeLineCursor
                left={getLeft()}
                cursorWidth={cursorWidth}
            />
        </div>
    );
}
