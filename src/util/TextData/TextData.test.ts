import { createTextData } from './createTextData';
import { TextData } from './TextData.interface';

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
