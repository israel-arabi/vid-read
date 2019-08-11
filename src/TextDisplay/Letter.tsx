import React, { useState } from "react";
import { zwj } from "../zwj";
export function Letter(props: { letter: string; first: boolean; last: boolean; onLetterChange: Function; onLetterClick: Function; offset: number; }) {
    const [letterMore, setLetterMore] = useState();
    const { letter } = props;
    let displayLetter = letter;
    if (!props.first) {
        displayLetter = zwj + displayLetter;
    }
    if (!props.last) {
        displayLetter = displayLetter + zwj;
    }
    return (
        <span
            onClick={() => {
                props.onLetterClick(props.offset);
            }}
            onMouseEnter={e => {
                props.onLetterChange(letter);
                setLetterMore(<span className="letter-more" />);
            }}
            onMouseLeave={() => {
                props.onLetterChange(null);
                setLetterMore(null);
            }}
            className={letter !== " " ? "letter" : ""}
        >
            {displayLetter}

            {letterMore}
        </span >
    );
}
