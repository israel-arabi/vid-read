import React from "react";
import { Word } from "./Word";
import { OffsetGenerator } from '../util/offsetGenerator';

export function TextDisplay(props: {
    text: string;
    onWordChange: Function;
    onLetterChange: Function;
    onWordsClick: Function;
    offset: number;
}) {
    const offsetGenerator = new OffsetGenerator;
    const words = props.text.split(" ");
    return (
        <p className="words"
            onClick={(e) => props.onWordsClick(e)}
        >
            {words.map((word, i) => (
                <Word
                    offset={offsetGenerator.getNewOffset(word) + props.offset}
                    style={{}}
                    key={i} word={`${word}`}
                    onWordChange={props.onWordChange}
                    onLetterChange={props.onLetterChange}
                />
            ))}
        </p>
    );
}
