import React, { useState } from "react";
import { zwj } from "../zwj";
export function Letter(props: any) {
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
        </span>
    );
}
