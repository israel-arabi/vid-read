export interface TextData {
    [charIndex: number]: {
        char: string;
        videoSecond: number;
    }
}

export interface VideoData {
    [videoSecond: number]: {
        char: string;
        charIndex: number;
    }
}
