import React, { MouseEvent as ReactMouseEvent, useState, useEffect, useRef } from "react";
import { getLimitedNumber, getOffsetData } from './utils';
import { TimeLineCursor } from './TimeLineCursor';

interface TimelineProps {
    change?: Function;
}
export function Timeline(props: TimelineProps) {
    const [isMouseDown, setMouseDown] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const divRef = useRef<HTMLDivElement>(null);;

    useEffect(() => {
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', setMouseDownFalse);

        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', setMouseDownFalse);
        }
    }, [isMouseDown]);

    const setMouseDownTrue = () => setMouseDown(true);
    const setMouseDownFalse = () => setMouseDown(false);

    const offsetPercentChange = (eventMouseX: number) => {
        if (!divRef.current) {
            return;
        }
        const offsetData = getOffsetData(divRef.current.clientWidth, divRef.current.offsetLeft, eventMouseX,
        );

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
        offsetPercentChange(e.screenX);
    }

    const onMouseDown = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDownTrue();
        offsetPercentChange(e.screenX);
    }

    const cursorWidth = 3;

    const getLeft = () => {
        if (!divRef.current) {
            return 10000;
        }
        return getLimitedNumber(currentTime, divRef.current.clientWidth - cursorWidth)
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
            <TimeLineCursor
                left={getLeft()}
                cursorWidth={cursorWidth}
            />
        </div>
    );
}
