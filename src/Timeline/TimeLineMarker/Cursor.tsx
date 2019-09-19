import React, { MouseEvent as ReactMouseEvent, CSSProperties, useEffect, useState } from 'react';

interface CursorProps {
    left?: boolean;
    right?: boolean;
    onOffsetChange: (newOffset: number) => unknown
    moveLeft: (count: number) => unknown
    moveRight: (count: number) => unknown
}
export function Cursor({ left, right, ...props }: CursorProps) {
    const [isMouseDown, setMouseDown] = useState(false);
    const [isSelected, setSelected] = useState(false);

    const setMouseDownTrue = () => setMouseDown(true);
    const setMouseDownFalse = () => setMouseDown(false);

    useEffect(() => {
        window.addEventListener('mousemove', mousemove);
        window.addEventListener('mouseup', setMouseDownFalse);
        window.addEventListener('keydown', keydown);
        window.addEventListener('click', click);
        return () => {
            window.removeEventListener('mousemove', mousemove);
            window.removeEventListener('mouseup', setMouseDownFalse);
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('click', click);
        }
    }, [isMouseDown, isSelected, props]);

    const click = (e: MouseEvent) => {
        setSelected(false);
    }

    const keydown = (e: KeyboardEvent) => {
        if (!isSelected) {
            return;
        }

        e.preventDefault();

        const moveBy = e.altKey ? 1 : 10;

        if (e.keyCode === 39) { // right
            props.moveRight(moveBy);
        }
        if (e.keyCode === 37) { // left
            props.moveLeft(moveBy);
        }
    }

    const mousemove = (e: MouseEvent) => {
        if (!isMouseDown) {
            return;
        }
        props.onOffsetChange(e.x);
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
            onDoubleClick={e => {
                setSelected(true);
            }}
            style={style}
        >
            <div
                style={{
                    height: '100%',
                    width: '1px',
                    backgroundColor: isSelected ? 'red' : 'black',
                    position: 'absolute',
                    left: 1
                }}
            >

            </div>
        </div>
    );
}