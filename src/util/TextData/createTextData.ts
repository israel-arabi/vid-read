import { TextData } from './TextData.interface';

export function createTextData(text: string): TextData {
    const textArr = text.split('');
    let textData: TextData = {};

    textArr.forEach((char, index) => {
        textData[index] = {
            char,
            videoSecond: -1,
        }
    });

    return textData;
}