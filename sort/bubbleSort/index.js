function bubbleSort(arr) {
    let len = arr.length,
        tmp;

    for (let i = 0; i < len - 1; i++) {

        for (let j = 0; j < len - 1 - i; j++) {

            if (arr[j] > arr[j + 1]) {
                tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }

    return arr;
}

module.exports = bubbleSort;
