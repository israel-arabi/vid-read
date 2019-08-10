import React, { useState, CSSProperties } from "react";
import { lettersData } from "../data/letters-data";
import { Letter } from "./Letter";
import * as _ from "lodash";

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

function makeLetter(letter: string, i: number, letters: string[], onLetterChange: Function) {
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
            onLetterChange={(a: any) => {
                onLetterChange(a);
            }}
        />
    );
}

type acceptedArgs = { word: string; style: CSSProperties; onWordChange: Function; onLetterChange: Function; };
export function Word({ word, style, onWordChange, onLetterChange, }: acceptedArgs) {
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
            >

                {letters.map((letter, i) => makeLetter(letter, i, letters, onLetterChange))}
                {wordMore}
            </span>
            {" "}
        </span>
    );
}
