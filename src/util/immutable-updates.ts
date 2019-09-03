
export function insertItem<T = any>(array: T[], index: number, item: T) {
    let newArray = array.slice()
    newArray.splice(index, 0, item)
    return newArray;
}

export function removeItem<T = any>(array: T[], index: number) {
    return array.filter((item, i) => i !== index)
}

export function updateItem<T = any>(array: T[], index: number, item: T) {
    return array.map((value, i) => {
        if (i !== index) {
            // This isn't the item we care about - keep it as-is
            return value
        }

        // Otherwise, this is the one we want - return an updated value
        return {
            ...value,
            ...item
        }
    })
}

