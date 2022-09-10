function mode(arr) {
    return arr.sort((a, b) =>
        arr.filter(v => v === a).length
        - arr.filter(v => v === b).length
    ).pop();
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele !== value;
    });
}

export function GetHighestOccurrence(data, i) {
    if (i < 1) return

    
    let arrayOfElements = []

    for (let index = 0; index < i; index++) {
        let word = mode(data)
        arrayOfElements.push(word)
        data = arrayRemove(data, word)
    }
    return arrayOfElements
}