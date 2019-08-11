import React, { useState, BaseSyntheticEvent, useEffect } from "react";
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
  const [currentTime, setCurrentTime] = useState(0);
  const _illiInthur = illiInthur.replace(/\n$/g, ``).replace(/^\n/g, ``);
  const lines = _illiInthur.split("\n");

  const onClick = () => {
    letterLocked = false;
    setLLetter('');
  };


  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === '[') {
      setCurrentTime(60);
    }

    if (e.key === ']') {

    }
  };

  useEffect(() => {
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, []);

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

  let videoTime = 0;

  const offsetGenerator = new OffsetGenerator;
  const textData = createTextData(_illiInthur);
  const onTimeUpdate = (time: number) => {
    videoTime = time;
  };



  return (
    <div className="App">
      <div className="text-area">
        {
          lines.map((line, key) => line
            ? <TextDisplay
              key={key}
              text={line}
              onWordChange={onWordChange}
              onLetterClick={(offset: number) => {
                console.log(offset);
              }}
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
        <Video
          onTimeUpdate={onTimeUpdate}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
