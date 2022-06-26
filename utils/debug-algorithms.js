"use strict";

function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]]
}

function* bubbleSort(array) {
    var indexLength = array.length;
    var swapCounter = -1;
    while (swapCounter != 0) {

        swapCounter = 0;
        for (let i = 0; i < indexLength; i++) {
            yield {
                "array": Object.values(array), /* Fixed the assignment bug. Changed it from "assignment by reference" to "assignment by value" */
                "i": i,
                "swapCounter": swapCounter,
                "indexLength": indexLength
            };
            if (array[i] > array[i + 1]) {
                swap(array, i, i+1);
                swapCounter += 1;
            }
        }
        indexLength -= 1;
    }
}

function* insertionSort(array) {
    let j;
    let value;


    for (let i = 1; i < array.length; i++) {
        value = array[i];
        j = i;

        while (j > 0 && array[j-1] > value) {
            yield {
                "array": Object.values(array),
                "value": value,
                "j": j,
                "i": i
            };
            array[j] = array[j-1];
            j -= 1;
        }
        array[j] = value;
    }
}

function* selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length + 1; j++) {
            yield {
                "array": Object.values(array),
                "minIndex": minIndex,
                "j": j,
                "i": i
            };
            if (j != array.length && array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        swap(array, i, minIndex);
    }
}

// other files can access this file as a module by importing the below algorithms exported
export { bubbleSort, insertionSort, selectionSort };