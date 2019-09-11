import React, { useState } from "react";
import { TimelineStory } from './TimeLine.story';
import { App } from '../app';
import { isString } from 'util';
import { keys } from 'lodash';

export function storySelect() {
    const componentDict = {
        TimelineStory: <TimelineStory />,
        App: <App />,
    };
    type componentDictKey = keyof typeof componentDict;
    const isComponentDictKey = (key: string): key is componentDictKey => Object.keys(componentDict).includes(key);

    const processKeys = Object.keys(process.env);
    for (let index = 0; index < processKeys.length; index++) {
        const argKey = processKeys[index];
        const matches = argKey.match(/REACT_APP_TELL_(\w+)$/);
        if (matches && matches[1]) {
            const componentName = matches[1]
                .toLocaleLowerCase()
                .replace(/_\w/, a => a[1].toUpperCase())
                .replace(/^\w/, a => a.toUpperCase())
                + 'Story';
            if (isComponentDictKey(componentName)) {
                return componentDict[componentName];
            }

        }
    }

    return (<App />);
}



