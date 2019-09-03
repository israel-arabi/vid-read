import React from 'react';

interface TimeLineMarkerPopoverProps {
    word: string;
}
export function TimeLineMarkerPopover(props: TimeLineMarkerPopoverProps) {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: 'white',
                padding: '2px',
                borderRadius: '3px',
                border: '1px solid',
                top: 'calc(100% + 2px)',
                fontSize: '13px',
                userSelect: 'none'
            }}
        >
            {props.word}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: '7px',
                    height: '7px',
                    backgroundColor: '#fff',
                    bottom: 'calc(100% - 6px)',
                    zIndex: -1,
                    border: '1px solid',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                }}
            />

        </div>
    );
}
