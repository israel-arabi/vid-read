import React from "react";


interface TimeLineCursorProps {
    cursorWidth: number;
    left: number;
}

export function TimeLineCursor(props: TimeLineCursorProps) {
    return (
        <div
            style={{
                height: 'calc(100% + 2px)',
                width: `${props.cursorWidth}px`,
                backgroundColor: 'black',
                position: 'absolute',
                top: '-1px',
                left: props.left,
            }}
        ></div>
    );
}