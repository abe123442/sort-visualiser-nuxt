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
                                    <!-- Creates multiple SortTable components and assigning appropriate properties, i.e., in the first SortTable, the properties are assigned to bubble sort related items -->
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
                                <!-- Again, looping over an array in order to make buttons without repeating code. Each button have "Explore ... Sort" -->
                                <td v-for="(item, index) in ['Bubble', 'Selection', 'Insertion']" :key="index">
                                    <!-- Buttons that are defined to run the learn function on click -->
                                    <Button :text="'Explore ' + item + ' Sort'" type="primary" class="font-extrabold" to="javascript:void(0)" @click="learn(item.toLowerCase())" /> 
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </PageSection>
            <!-- Only visible if ReactiveProps.visible is true -->
            <PageSection v-else>
                <Button :text="'Back to demo'" type="primary" class="font-extrabold" to="javascript:void(0)"
                    @click="ReactiveProps.toggle">
                </Button>

                <!-- Child component created, passing ReactiveProps.algorithm as the sortName property for that component  -->
                <LearnSort :sort-name="ReactiveProps.algorithm" />
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>

// Required imports for this component

// import { shuffle } from "@/utils/helper.js";
import { pause, swap } from "@/utils/helper.js";
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

// 
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

// defining some constant properties of this component
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
// defines 3 copies of the same array for each sorting algorithm demo
const BubbleArrayData = [...ArrayData];
const InsertionArrayData = [...ArrayData];
const SelectionArrayData = [...ArrayData];

// these are reactive variables that react to changes in the ArrayData variable, so that visual elements can be updated (e.g in terms of styles)
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

            if (array[i] > array[i + 1]) {
                swap(array, i, i + 1);
                swapCounter += 1;

                await pause(500); // pauses the sorting algorithm to allow for visualisation of the algorithm
            }
        }
        indexLength -= 1;
    }
}

// standard selection sort algorithm with appropriate modifications
async function selectionSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length + 1; j++) {
            if (j != array.length && array[j] < array[minIndex]) {
                minIndex = j;
                await pause(200); // pauses the sorting algorithm to allow for visualisation of the algorithm
            }
        }
        swap(array, i, minIndex);
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
            array[j] = array[j - 1];
            j -= 1;
            await pause(100); // pauses the sorting algorithm to allow for visualisation of the algorithm
        }
        array[j] = value;
    }
}
</script>