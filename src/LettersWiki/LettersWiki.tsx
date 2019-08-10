import React, { useState } from "react";
import { render } from "react-dom";
import {
  lettersData,
  lettersDataKeys,
  letterDataKeysHebrew,
  allowedLettersDataKeys
} from "../data/letters-data";
import * as _ from "lodash";

export function LetterWiki(props: any) {
  const letterData = _.find(
    lettersData,
    data => data.isolated === props.letter
  );
  return (
    <div
      className="letters-wiki"
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      {lettersDataKeys.map((key, index) =>
        (
          <div
            key={index}
            style={{
              background: index % 2 ? "#ddd" : "white",
              marginRight: 5,
              padding: "5px 6px 0px"
            }}
          >
            <div>{letterDataKeysHebrew[key]}</div>
            <div>{_.get(letterData, key)}</div>
          </div>
        )
      )}
    </div>
  );
}
