import React, { MouseEvent as ReactMouseEvent, CSSProperties, useEffect, useState } from 'react';

interface CursorProps {
    left?: boolean;
    right?: boolean;
    onOffsetChange: (newOffset: number) => unknown
}
export function Cursor({ left, right, ...props }: CursorProps) {
    const [isMouseDown, setMouseDown] = useState(false);
    const setMouseDownTrue = () => setMouseDown(true);
    const setMouseDownFalse = () => setMouseDown(false);

    useEffect(() => {
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', setMouseDownFalse);

        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', setMouseDownFalse);
        }
    }, [isMouseDown]);

    const mousemove = (e: MouseEvent) => {
        // e.target === divRef.current
        if (!isMouseDown) {
            return;
        }
        props.onOffsetChange(e.screenX);
    }

    const style: CSSProperties = {
        height: '100%',
        bottom: '0',
        width: '3px',
        position: 'absolute',
        cursor: 'col-resize',
    };

    if (left) {
        style.left = -1;
    }

    if (right) {
        style.right = -1;
    }

    const onMouseDown = (e: ReactMouseEvent<HTMLDivElement, MouseEvent>) => {
        setMouseDownTrue();
        // offsetPercentChange(e.screenX);
    }

    return (
        <div
            onMouseDown={onMouseDown}
            style={style}
        >
            <div
                style={{
                    height: '100%',
                    width: '1px',
                    backgroundColor: 'black',
                    position: 'absolute',
                    left: 1
                }}
            >

            </div>
        </div>
    );
}