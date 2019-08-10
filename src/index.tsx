import React, { useState, BaseSyntheticEvent } from "react";
import { render } from "react-dom";
import { TextDisplay } from "./TextDisplay/TextDisplay";
import "./styles.css";
import * as _ from "lodash";
import { LetterWiki } from "./LettersWiki/LettersWiki";
import { WordsWiki } from "./WordsWiki/WordsWiki";
import { illiInthur } from "./data/illi-inthur.text"
import { translate } from "./util/translate";
import { Video } from "./Video/Video";
let letterLocked = false;

function App() {
  const [wordTranslation, setWordTranslation] = useState('With the eye');
  const [wordAr, setWordAr] = useState('ينساك');
  const [letter, setLLetter] = useState("ة");
  const lines = illiInthur.split("\n");

  window.addEventListener('click', () => {
    letterLocked = false;
    setLLetter('');
  });

  const onWordChange = (newWord: string) => {
    translate(newWord).then((translation: string) => {
      if (translation && typeof translation === 'string') {
        setWordTranslation(translation);
      }
    });
    if (newWord && typeof newWord === 'string') {
      setWordAr(newWord);
    }
  };

  return (
    <div className="App">
      <div className="text-area">
        {
          lines.map((line, key) => line
            ? <TextDisplay
              key={key.toString()}
              text={line}
              onWordChange={onWordChange}
              onLetterChange={
                (newLetter: string) => {
                  if (!letterLocked) {
                    setLLetter(newLetter);
                  }
                }
              }
              onWordsClick={(e: BaseSyntheticEvent) => {
                e.stopPropagation();
                letterLocked = true;
              }}
            />
            : <br />
          )
        }

      </div>
      <div className="wikis"
        style={{
          marginTop: 30,
          position: "fixed",
          right: 500
        }}>
        <LetterWiki letter={letter} />
        <WordsWiki ar={wordAr} translation={wordTranslation} />
        <Video />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
