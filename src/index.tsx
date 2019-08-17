import React, { useState, BaseSyntheticEvent, useEffect } from "react";
import { render } from "react-dom";
import { Line } from "./Line/Line";
import "./styles.css";
import * as _ from "lodash";
import { LetterWiki } from "./LettersWiki/LettersWiki";
import { WordsWiki } from "./WordsWiki/WordsWiki";
import { illiInthur } from "./data/illi-inthur.text"
import { translate } from "./util/translate";
import { Video } from "./Video/Video";
import { OffsetGenerator } from './util/offsetGenerator';
let letterLocked = false;

function App() {
  const [wordTranslation, setWordTranslation] = useState('With the eye');
  const [wordAr, setWordAr] = useState('ينساك');
  const [letter, setLLetter] = useState("ة");
  const [currentTime, setCurrentTime] = useState(10);
  const [videoTime, setVideoTime] = useState(0);
  const [videoTarget, setVideoTarget] = useState();
  const _illiInthur = illiInthur.replace(/\n$/g, ``).replace(/^\n/g, ``);
  const lines = _illiInthur.split("\n");

  const onClick = () => {
    letterLocked = false;
    setLLetter('');
  };


  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === '[') {

    }

    if (e.key === ']') {

    }

    if (e.key === 'ArrowRight') {
      setCurrentTime(videoTime + 0.1);
    }

    if (e.key === 'ArrowLeft') {
      setCurrentTime(videoTime - 0.1);
    }

    if (e.key === ' ') {
      if (videoTarget.paused) {
        videoTarget.play();
      } else {
        videoTarget.pause();
      }
    }

    // console.log(e.key);
  };

  useEffect(() => {
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [videoTime]);

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

  const onCurrentTimeUpdate = (time: number) => {
    setVideoTime(time);
  };

  const onLetterClick = (offset: number) => { };

  const onLetterChange = (newLetter: string) => {
    if (!letterLocked) {
      setLLetter(newLetter);
    }
  }

  const onWordClick = (event: {
    wordIndex: number
  }) => {
    console.log(event.wordIndex);
  };

  const onLoad = (e: any) => {
    console.log(e);
    setVideoTarget(e.target);
  }

  // regex for finding all arab letter .match(/[\u0621-\u064A0-9]+/g)
  let pastWordsCount = 0;

  return (
    <div className="App">
      <div className="text-area">
        {lines.map((line, key) => {
          const oldPastWordsCount = pastWordsCount;
          if (!line) {
            return <br key={key} />
          }
          pastWordsCount += line.split(' ').length;
          return <Line
            key={key}
            text={line}
            onWordChange={onWordChange}
            onLetterClick={onLetterClick}
            onLetterChange={onLetterChange}
            onWordsClick={(e: BaseSyntheticEvent) => {
              e.stopPropagation();
              letterLocked = true;
            }}
            onWordClick={onWordClick}
            pastWordsCount={oldPastWordsCount}
          />;
        })}

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
          onCurrentTimeUpdate={onCurrentTimeUpdate}
          currentTime={currentTime}
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
