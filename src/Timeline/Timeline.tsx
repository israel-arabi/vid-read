import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useRef } from "react";
import { getLimitedNumber, getOffsetData } from './utils';
import { TimeLineCursor } from './TimeLineCursor';
import { TimeLineMarker } from './TimeLineMarker/TimeLineMarker';
import { updateItem } from '../util/immutable-updates';

interface TimelineProps {
    change?: Function;
}
export function Timeline(props: TimelineProps) {
    const [isMouseDown, setMouseDown] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [clientWidth, setClientWidth] = useState(0);
    const [offsetLeft, setOffsetLeft] = useState(0);
    const [markers, setMarkers] = useState([{
        start: 10,
        end: 30,
    }]);
    const divRef = useRef<HTMLDivElement>(null);;

    useEffect(() => {
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', setMouseDownFalse);
        if (divRef.current) {
            setClientWidth(divRef.current.clientWidth);
            setOffsetLeft(divRef.current.offsetLeft);
        }
        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', setMouseDownFalse);
        }
    }, [isMouseDown, divRef]);

    const setMouseDownTrue = () => setMouseDown(true);
    const setMouseDownFalse = () => setMouseDown(false);

    const offsetPercentChange = (eventMouseX: number) => {
        const offsetData = getOffsetData(clientWidth, offsetLeft, eventMouseX);

        if (props.change) {
            props.change(offsetData.clickPercent);
        }

        setCurrentTime(offsetData.clickOffset);
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
        return getLimitedNumber(currentTime, clientWidth - cursorWidth)
    }

    const setMarker = (markerId: number, value: { start?: number; end?: number }) => {
        const marker = { ...markers[markerId] };
        if (value.start) {
            marker.start = getLimitedNumber(value.start - offsetLeft, marker.end);
        }
        if (value.end) {
            marker.end = getLimitedNumber(value.end - offsetLeft, clientWidth, marker.start);
        }
        setMarkers(updateItem(markers, markerId, marker));
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
                position: 'relative'
            }}
        >
            {markers.map((marker, index) => (
                <TimeLineMarker
                    key={index}
                    start={marker.start}
                    end={marker.end}
                    onStartChange={start => {
                        setMarker(index, { start });
                    }}
                    onEndChange={end => {
                        setMarker(index, { end });
                    }}
                />
            ))}

            <TimeLineCursor
                left={getLeft()}
                cursorWidth={cursorWidth}
            />
        </div>
    );
}
