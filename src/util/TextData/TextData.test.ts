import { createTextData } from './createTextData';
import { TextData, VideoData } from './TextData.interface';
import { textDataToVideoData } from './textDataToVideoData';

test('create a default textData object ', () => {
    const textData = createTextData('abc d');
    expect(textData).toEqual({
        '0': {
            char: 'a',
            videoSecond: -1,
        },
        '1': {
            char: 'b',
            videoSecond: -1,
        },
        '2': {
            char: 'c',
            videoSecond: -1,
        },
        '3': {
            char: ' ',
            videoSecond: -1,
        },
        '4': {
            char: 'd',
            videoSecond: -1,
        },
    } as TextData);
});



test('convert text data to video data ', () => {
    const videoData = textDataToVideoData({
        '0': {
            char: 'a',
            videoSecond: -1,
        },
        '1': {
            char: 'b',
            videoSecond: 30,
        },
        '2': {
            char: 'c',
            videoSecond: -1,
        },
        '3': {
            char: ' ',
            videoSecond: 40,
        },
        '4': {
            char: 'd',
            videoSecond: -1,
        },
    } as TextData);
    expect(videoData).toEqual({
        '30': {
            charIndex: 1,
            char: 'b',
        },
        '40': {
            charIndex: 3,
            char: ' ',
        },
    } as VideoData);
});
