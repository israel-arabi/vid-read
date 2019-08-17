/**
 * offset used to know the offset of a given letter from the text start
 */
export class OffsetGenerator {
    offset = 0;

    getNewOffset(line: string): number {
        const offsetCached = this.offset;
        this.offset += line.length;
        return offsetCached;
    }
}

