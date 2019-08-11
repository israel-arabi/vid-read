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
import { OffsetGenerator } from './util/offsetGenerator';
import { createTextData } from './util/TextData/createTextData';
let letterLocked = false;

function App() {
  const [wordTranslation, setWordTranslation] = useState('With the eye');
  const [wordAr, setWordAr] = useState('ينساك');
  const [letter, setLLetter] = useState("ة");
  const _illiInthur = illiInthur.replace(/\n$/g, ``).replace(/^\n/g, ``);
  const lines = _illiInthur.split("\n");

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

  const offsetGenerator = new OffsetGenerator;
  const textData = createTextData(_illiInthur);

  return (
    <div className="App">
      <div className="text-area">
        {
          lines.map((line, key) => line
            ? <TextDisplay
              key={key}
              text={line}
              onWordChange={onWordChange}
              offset={offsetGenerator.getNewOffset(`${line}\n`)}
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
            : offsetGenerator.getNewOffset(`\n`) && <br key={key} />
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
