export const bst = (sortedArray, lookupValue) => {
    let left = 0
    let right = sortedArray.length - 1

    while (left <= right) {
        const mid = Math.floor((left + right) / 2)

        if (sortedArray[mid] === lookupValue) return mid

        if (sortedArray[mid] < lookupValue) {
            left = mid + 1
        } else if (sortedArray[mid] > lookupValue) {
            right = mid - 1
        }
    }

    return -1
}
