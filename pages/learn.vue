<template>
    <PageWrapper>
        <!-- Sets the page title as "Learn" -->
        <PageHeader>
            <PageTitle :text="$t('pages.learn.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection v-if="ReactiveProps.visible">
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <!-- Creates a table heading for every type of sort in the sorts prop in the method "definProps" -->
                                <th scope="col" class="px-6 py-3"
                                    v-for="(item, index) in ['Bubble', 'Selection', 'Insertion']" :key="index">

                                    <!-- Passing in values for each SortTableButton-->
                                    <SortTableButton :name="item" v-on:start-visualiser="initialiseSort" />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="px-2 py-1">
                                <td>
                                    <SortTable :array="bubbleArrayRef" :visual-values="BubbleArrayDataRef" />
                                </td>
                                <td>
                                    <SortTable :array="selectionArrayRef" :visual-values="SelectionArrayDataRef" />
                                </td>
                                <td>
                                    <SortTable :array="insertionArrayRef" :visual-values="InsertionArrayDataRef" />
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr class="px-5 py-1">
                                <td v-for="(item, index) in ['Bubble', 'Selection', 'Insertion']" :key="index">
                                    <Button :text="'Learn ' + item + ' Sort'" type="primary" class="font-extrabold"
                                        to="javascript:void(0)" @click="learn(item.toLowerCase())" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </PageSection>

            <PageSection v-else>
                <Button :text="'Back to demo'" type="primary" class="font-extrabold" to="javascript:void(0)"
                    @click="ReactiveProps.toggle">
                </Button>

                <LearnSort :sort-name="ReactiveProps.algorithm" />
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>

// Required imports for this component

// import { shuffle } from "@/utils/helper.js";
import { pause, swap } from "@/utils/algorithms.js";
// Imports other vue components to be embedded in this component and used
import SortTableButton from "@/components/SortTableButton.vue";
import SortTable from "@/components/SortTable.vue";
import LearnSort from "@/components/sort.vue";
import { ref } from "vue";
import { useReactiveProps } from "@/stores/GameData";

// defines meta information for this page, and defines the "theme" for this page
definePageMeta({
    layout: 'page',
})

const ReactiveProps = useReactiveProps();

const learn = (sort: string) => {
    ReactiveProps.setAlgorithm(sort);
    ReactiveProps.toggle();
}
// An object instance definition (WITH optional parameters filled appropriately) of object structure that will be used to pass the data to the SortTableButton component, showing visual aspects
interface IElementStyle {
    current?: boolean,
    sorted?: boolean,
    finished?: boolean,
    swap?: boolean
}

interface IArrayElement {
    item: number,
    style: IElementStyle
}


const range = 200;
const RandomArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * range) + 5);

// this is an instance of the ISortData interface
const ArrayData: IArrayElement[] = [];

const SetupArrayData = () => {
    for (let index = 0; index < RandomArray.length; index++) {
        let ArrayElement: IArrayElement = {
            item: RandomArray[index],
            style: {
                current: false,
                sorted: false,
                finished: false,
                swap: false
            }
        };
        ArrayData[index] = ArrayElement;
    }
};

SetupArrayData();
const BubbleArrayData = [...ArrayData];
const InsertionArrayData = [...ArrayData];
const SelectionArrayData = [...ArrayData];

// this is a reactive variable that reacts to changes in the ArrayData variable, so that visual elements can be updated (e.g in terms of styles)
// const ArrayDataRef = ref(BubbleArrayData);
const BubbleArrayDataRef = ref(BubbleArrayData);
const InsertionArrayDataRef = ref(InsertionArrayData);
const SelectionArrayDataRef = ref(SelectionArrayData);

const bubbleArray = [...RandomArray];
const insertionArray = [...RandomArray];
const selectionArray = [...RandomArray];

const bubbleArrayRef = ref(bubbleArray);
const insertionArrayRef = ref(insertionArray);
const selectionArrayRef = ref(selectionArray);



// entry function that runs the appropriate sorting algorithm to be visualised
const initialiseSort = (algorithm: String) => {
    switch (algorithm) {
        case "Bubble":
            bubbleSort(bubbleArrayRef.value);
            break;
        case "Selection":
            selectionSort(selectionArrayRef.value);
            break;
        case "Insertion":
            insertionSort(insertionArrayRef.value);
            break;
        default:
            break;
    }
}


// standard bubble sort function with appropriate modifications
async function bubbleSort(array: number[]) {
    let indexLength = array.length;
    let swapCounter = -1;
    while (swapCounter != 0) {

        swapCounter = 0;
        for (let i = 0; i < indexLength; i++) {

            // sets the optional current parameter to the ArrayData (ISortData interface instance) object, which will reactively be passed into the appropriate SortTable component
            if (i !== 0) { BubbleArrayData[i - 1].style.current = false; }
            BubbleArrayData[i].style.current = true;

            if (array[i] > array[i + 1]) {
                // if (i !== 0) { BubbleArrayData[i-1].style.swap = false; }
                // BubbleArrayData[i].style.swap = true;
                swap(array, i, i + 1);
                swap(BubbleArrayData, i, i + 1);
                swapCounter += 1;
                await pause(500);
            }
        }
        indexLength -= 1;
        BubbleArrayData[indexLength].style.sorted = true;
    }
    await pause(50);
    for (let j = 0; j < array.length; j++) {
        BubbleArrayData[indexLength].style.sorted = true;
    }
}

// standard selection sort algorithm with appropriate modifications
async function selectionSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length + 1; j++) {
            SelectionArrayData[j].style.current = true;
            if (j != array.length && array[j] < array[minIndex]) {
                minIndex = j;
                await pause(500);
            }
        }
        swap(array, i, minIndex);
        swap(SelectionArrayData, i, minIndex);
    }
}

// standard insertion sort algorithm with appropriate modifications
async function insertionSort(array: number[]) {
    // defining placeholder variables used in the algorithm
    let j;
    let value;

    for (let i = 1; i < array.length; i++) {
        value = array[i];
        j = i;

        while (j > 0 && array[j - 1] > value) {
            ArrayData[j].style.current = true;
            array[j] = array[j - 1];
            ArrayData[j].style = ArrayData[j - 1].style = { swap: true }
            ArrayData[j].item = ArrayData[j - 1].item;
            j -= 1;
            await pause(100);
        }
        array[j] = value;
        ArrayData[j].item = value;
    }
}
</script>
