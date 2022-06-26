"use strict";

function swap(array, i, j) {
    [array[i], array[j]] = [array[j], array[i]]
}

async function pause(speed) {
  return new Promise(resolve => {
      setTimeout(() => {
          resolve();
      }, parseInt(speed));
  });
}

async function bubbleSort(array) {
    var indexLength = array.length;
    var swapCounter = -1;
    while (swapCounter != 0) {

        swapCounter = 0;
        for (let i = 0; i < indexLength; i++) {
            if (array[i] > array[i + 1]) {
                swap(array, i, i+1);
                swapCounter += 1;
                await pause(100);
            }
        }
        indexLength -= 1;
    }
}

async function insertionSort(array) {
    let j;
    let value;


    for (let i = 1; i < array.length; i++) {
        value = array[i];
        j = i;

        while (j > 0 && array[j-1] > value) {
            array[j] = array[j-1];
            j -= 1;
            await pause(100);
        }
        array[j] = value;
    }
}

async function selectionSort(array) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length + 1; j++) {
            if (j != array.length && array[j] < array[minIndex]) {
                minIndex = j;
                await pause(100);
            }
        }
        swap(array, i, minIndex);
    }
}

// other files can access this file as a module by importing the below algorithms exported
export { pause, swap, bubbleSort, insertionSort, selectionSort };