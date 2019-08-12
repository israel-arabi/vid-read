export interface WordsTimeMap {
    [wordIndex: number]: {
        start?: number;
        end?: number;
    }
}

export class WordsTimeMap extends Array implements WordsTimeMap {
    pointer = 0;
    highlight?: number | null;
    make(text: string) {
        text.split(' ').forEach((v, k) => {
            this[k] = {};
        });
    }
    setWordStart(wordIndex: number, start: number) {
        if (!this[wordIndex]) {
            throw new Error(`invalid word index ${wordIndex}`)
        }
        this[wordIndex].start = start;
    }
    setWordEnd(wordIndex: number, end: number) {
        if (!this[wordIndex]) {
            throw new Error(`invalid word index ${wordIndex}`)
        }
        this[wordIndex].end = end;
    }
    checkTime(time: number) {
        const { pointer } = this;
        if (!this[pointer]) {
            this.highlight = null;
            return;
        }
        const { start, end } = this[pointer];
        if (typeof start !== 'number') {
            throw new Error('start not set');
        }
        if (time < start) {
            this.highlight = null;
            return;
        }
        if (typeof end !== 'number') {
            throw new Error('emd not set');
        }
        if (time <= end) {
            this.highlight = pointer;
            return;
        }
        this.highlight = pointer;
        this.pointer = this.pointer + 1;
        this.checkTime(time);
    }
    getCurrent() {
        return this[this.pointer];
    }
    setPointer(pointer: number) {
        if (!this[pointer]) {
            throw new Error(`invalid pointer ${pointer}`)
        }
        this.pointer = pointer;
    }
    resetPointer() {
        this.pointer = 0;
    }
}
