import React, { useState, CSSProperties } from "react";
import { lettersData } from "../data/letters-data";
import { Letter } from "./Letter";
import * as _ from "lodash";
import { OffsetGenerator } from '../util/offsetGenerator';

export function combineLamAndAlifToLa(letters: string[]): string[] {
    return letters.reduce<string[]>((accumulator, currentValue) => {
        const index = accumulator.length;
        if (accumulator[index - 1] === "ل" && currentValue === "ا") {
            accumulator[index - 1] = "لا";
        } else if (!!currentValue) {
            accumulator.push(currentValue);
        }
        // console.log(accumulator);
        return accumulator;
    }, []);
}

function makeLetter(letter: string, i: number, letters: string[], onLetterChange: Function, onLetterClick: Function) {
    const previousLetter = _.find(lettersData, letterStep => letterStep.isolated === letters[i - 1]);
    const nextLetter = _.find(lettersData, letterStep => letterStep.isolated === letters[i + 1]);
    let first = i === 0 || !_.get(previousLetter, "initial");
    let last = i === letters.length - 1 || !nextLetter;
    return (
        <Letter
            key={i}
            letter={letter}
            first={first}
            last={last}
            onLetterClick={onLetterClick}
            onLetterChange={(a: any) => {
                onLetterChange(a);
            }}
        />
    );
}

interface acceptedArgs {
    word: string;
    style: CSSProperties;
    onWordChange: Function;
    onLetterChange: Function;
    onLetterClick: Function;
    onWordClick: Function;
    wordIndex: number;
};
export function Word({
    onWordClick,
    word,
    style,
    onWordChange,
    onLetterChange,
    onLetterClick,
    wordIndex,
}: acceptedArgs) {
    let letters = word.replace(/[\u200B-\u200D\uFEFF]/g, '').split("");
    const [wordMore, setWordMore] = useState();

    letters = combineLamAndAlifToLa(letters);

    return (
        <span style={style}>
            <span
                className={"word"}
                onMouseEnter={e => {
                    onWordChange(word);
                    setWordMore(<span className="word-more" />);
                }}
                onMouseLeave={() => {
                    onWordChange(null);
                    setWordMore(null);
                }}
                onClick={() => {
                    onWordClick({wordIndex});
                }}
            >

                {letters.map((letter, i) => makeLetter(letter, i, letters, onLetterChange, onLetterClick))}
                {wordMore}
            </span>
            {" "}
        </span>
    );
}
