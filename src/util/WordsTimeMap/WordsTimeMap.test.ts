import { WordsTimeMap } from './WordsTimeMap';

test('create a default textData object', () => {
    const wordsTimeMap = new WordsTimeMap;
    wordsTimeMap.make('I had an ice cream today');
    const mock = [{}, {}, {}, {}, {}, {}] as WordsTimeMap;
    mock.pointer = 0;
    mock.highlight = undefined;
    expect(wordsTimeMap).toEqual(mock);
});

test('Add start and end to all items', () => {
    const wordsTimeMap = new WordsTimeMap;
    wordsTimeMap.make('I had an ice cream today');
    wordsTimeMap.forEach((v, k) => {
        v.start = (k + 1) * 10 - 5;
        v.end = (k + 1) * 10;
    });
    const mock = [
        {
            start: 5,
            end: 10,
        },
        {
            start: 15,
            end: 20,
        },
        {
            start: 25,
            end: 30,
        },
        {
            start: 35,
            end: 40,
        },
        {
            start: 45,
            end: 50,
        },
        {
            start: 55,
            end: 60,
        },
    ] as WordsTimeMap;
    mock.pointer = 0;
    mock.highlight = undefined;
    expect(wordsTimeMap).toEqual(mock);

    wordsTimeMap.checkTime(30);
    expect(wordsTimeMap.pointer).toBe(2);
    expect(wordsTimeMap.getCurrent()).toEqual({
        start: 25,
        end: 30,
    });
    expect(wordsTimeMap.highlight).toBe(2);
    wordsTimeMap.checkTime(34.999);
    expect(wordsTimeMap.highlight).toBe(null);
    wordsTimeMap.checkTime(35);
    expect(wordsTimeMap.highlight).toBe(3);
    wordsTimeMap.checkTime(39.9999);
    expect(wordsTimeMap.highlight).toBe(3);
    wordsTimeMap.checkTime(40);
    expect(wordsTimeMap.highlight).toBe(3);
    wordsTimeMap.checkTime(41);
    expect(wordsTimeMap.highlight).toBe(null);
    wordsTimeMap.checkTime(60);
    expect(wordsTimeMap.highlight).toBe(5);
    wordsTimeMap.checkTime(60.0000001);
    expect(wordsTimeMap.highlight).toBe(null);
    expect(wordsTimeMap.pointer).toBe(6);
    wordsTimeMap.resetPointer();
    expect(wordsTimeMap.pointer).toBe(0);

    // expect(wordsTimeMap.pointer).toBe(2);

});
