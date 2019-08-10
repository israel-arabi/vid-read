import React from "react";
import { Word } from "./Word";
export function TextDisplay(props: {
    text: string;
    onWordChange: Function;
    onLetterChange: Function;
    onWordsClick: Function;
}) {
    const words = props.text.split(" ");
    return (
        <p className="words"
            onClick={(e) => props.onWordsClick(e)}
        >
            {words.map((word, i) => (
                <Word
                    style={{}}
                    key={i} word={`${word}`}
                    onWordChange={props.onWordChange}
                    onLetterChange={props.onLetterChange}
                />
            ))}
        </p>
    );
}
