import React from "react";
import { Word } from "./Word";

export function Line(props: {
    text: string;
    onWordChange: Function;
    onLetterChange: Function;
    onWordsClick: Function;
    onLetterClick: Function;
    onWordClick: Function;
    pastWordsCount: number;
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
                    onLetterClick={props.onLetterClick}
                    onWordClick={props.onWordClick}
                    wordIndex={props.pastWordsCount + i}
                />
            ))}
        </p>
    );
}
