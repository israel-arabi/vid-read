import React, { useState, BaseSyntheticEvent, useEffect, SyntheticEvent } from "react";
import { Line } from "./Line/Line";
import "./styles.css";
import * as _ from "lodash";
import { LetterWiki } from "./LettersWiki/LettersWiki";
import { WordsWiki } from "./WordsWiki/WordsWiki";
import { illiInthur } from "./data/illi-inthur.text"
import { translate } from "./util/translate";
import { Video } from "./Video/Video";
import { Timeline, TimeLineMarkerLocation } from "./Timeline/Timeline";
import { WordsTimeMap } from './util/WordsTimeMap/WordsTimeMap';

let letterLocked = false;

export function App() {
  const wordsTimeMap = new WordsTimeMap;
  wordsTimeMap.make(illiInthur);
  wordsTimeMap[0] = { ...wordsTimeMap[0], start: 10, end: 30 };
  const [wordTranslation, setWordTranslation] = useState('With the eye');
  const [wordAr, setWordAr] = useState('ينساك');
  const [letter, setLLetter] = useState('');
  const [currentTime, setCurrentTime] = useState(10);
  const [videoTime, setVideoTime] = useState(0);
  const [videoTarget, setVideoTarget] = useState();
  const [percent, setPercent] = useState(0);
  const [markers, setMarkers] = useState<TimeLineMarkerLocation[]>(wordsTimeMap);
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
  };

  useEffect(() => {
    window.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);

    if (videoTarget) {
      setPercent(videoTarget.duration / 100);
    }
    return () => {
      window.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    }
  }, [videoTime, videoTarget]);

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

  const onLoad = (e: SyntheticEvent<HTMLVideoElement>) => {
    const target = e.target as HTMLVideoElement;
    setVideoTarget(target);
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
        <div style={{ marginLeft: 100 }}>
          <Timeline
            onCurrentTimePercentChange={(newTime: number) => {
              newTime = newTime * percent;
              setCurrentTime(newTime);
            }}
            currentTimePercent={percent ? videoTime / percent : 0}
            markers={markers}
            setMarkers={setMarkers}
          ></Timeline>
          <div style={{ height: 1 }}></div>
          <Video
            onCurrentTimeUpdate={onCurrentTimeUpdate}
            currentTime={currentTime}
            onLoad={onLoad}
          />
        </div>
      </div>
    </div>
  );
}
