
export const getLimitedNumber = (number: number, topLimit: number, bottomLimit = 0) => {
    if (number < bottomLimit) {
        return bottomLimit;
    }
    if (number > topLimit) {
        return topLimit
    }
    return number;
}


export const getOffsetData = (elementClientWidth: number, elementOffsetLeft: number, eventMouseX: number) => {
    const onePercent = elementClientWidth / 100;
    let clickOffset = getLimitedNumber(eventMouseX - elementOffsetLeft, elementClientWidth);
    let clickPercent = clickOffset / onePercent;
    return { clickPercent, clickOffset };
}