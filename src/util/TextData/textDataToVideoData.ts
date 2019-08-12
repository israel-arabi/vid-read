import { TextData, VideoData } from './TextData.interface';

export function textDataToVideoData(textData: TextData): VideoData {
    const videoData: VideoData = {};
    Object.keys(textData).forEach((key) => {
        const charIndex = parseInt(key);
        const v = textData[charIndex];
        if (v.videoSecond === -1) {
            return;
        }
        videoData[v.videoSecond] = {
            charIndex,
            char: v.char
        }
    })
    return videoData;
}
