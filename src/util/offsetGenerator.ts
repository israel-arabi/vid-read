export class OffsetGenerator {
    offset = 0;

    getNewOffset(line: string): number {
        const offsetCached = this.offset;
        this.offset += line.length;
        return offsetCached;
    }
}

