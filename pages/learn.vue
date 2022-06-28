<template>
    <PageWrapper>
        <!-- Sets the page title as "Learn" -->
        <PageHeader>
            <PageTitle :text="$t('pages.learn.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <!-- Creates a table heading for every type of sort in the sorts prop in the method "definProps" -->
                                <th scope="col" class="px-6 py-3" v-for="(item, index) in sorts" :key="index">

                                    <!-- Passing in values for each SortTableButton-->
                                    <SortTableButton :name="item" v-on:start-visualiser="initialiseSort">
                                    </SortTableButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="px-2 py-1">
                                <td>
                                    <SortTablePreview :array="bubbleArrayRef" :visual-values="visualValues">
                                    </SortTablePreview>
                                </td>
                                <td>
                                    <SortTablePreview :array="selectionArrayRef"></SortTablePreview>
                                </td>
                                <td>
                                    <SortTablePreview :array="insertionArrayRef"></SortTablePreview>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                 <div class="flex space-x-4 justify-center mt-10">
                    <Button size="lg" text="Learn" type="primary" class="font-extrabold" to="javascript:void(0)" />
                    <Button size="lg" text="Play" type="primary" class="font-extrabold" to="javascript:void(0)" />
                </div>

            </PageSection>
        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>

// Required imports for this component

// import { shuffle } from "@/utils/helper.js";
import { pause, swap } from "@/utils/algorithms.js";
import { ITheme } from "@/utils/theme"
// Imports other vue components to be embedded in this component and used
import SortTableButton from "@/components/SortTableButton.vue";
import SortTablePreview from "@/components/SortTablePreview.vue";
import { ref } from 'vue';

// An interface object used to determine the page links around the website
export interface IMenuItem {
    type: 'link' | 'button'
    text: string
    href?: any
    route?: any
}

const theme = useState<ITheme>('theme.current');
// defines meta information for this page
definePageMeta({
    layout: 'page',
})

// defines the properties of this component
defineProps({
    sorts: {
        type: [],
        default: ["Bubble", "Selection", "Insertion"],
    }
});


// Internalisation setup

// currently, this program only has support for "en" languages
const { t } = useLang()

const mainLinks = computed((): IMenuItem[] => [
    { type: 'link', text: t('pages.learn.nav') },
    { type: 'link', text: t('pages.play.nav') },
])



const generateArray = (range: number) => {
    const size = 10;
    return Array.from({ length: size }, () => Math.floor(Math.random() * range) + 5);
}

let array: number[] = [];
const range = 200;
array = generateArray(range);

const bubbleArray = [...array];
const insertionArray = [...array];
const selectionArray = [...array];

const bubbleArrayRef = ref(bubbleArray);
const insertionArrayRef = ref(insertionArray);
const selectionArrayRef = ref(selectionArray);


// An object instance definition (WITH optional parameters filled appropriately) of object structure that will be used to pass the data to the SortTableButton component, showing visual aspects
interface ISortData {
    current?: number,
    sorted?: number,
    finished?: boolean,
    swap?: number
}

interface ElementInfo {
    element: number,
    style: ISortData
}

// this is an instance of the ISortData interface
const sortData: ISortData = {};

// this is a reactive variable that reacts to changes in the sortData variable, so that visual elements can be updated (e.g in terms of styles)
const visualValues = ref(sortData);

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
    console.log(array);
    var indexLength = array.length;
    var swapCounter = -1;
    while (swapCounter != 0) {

        swapCounter = 0;
        for (let i = 0; i < indexLength; i++) {

            // sets the optional current parameter to the sortData (ISortData interface instance) object, which will reactively be passed into the appropriate SortTablePreview component
            sortData.current = i
            if (array[i] > array[i + 1]) {
                sortData.swap = i;
                swap(array, i, i + 1);
                swapCounter += 1;
                await pause(500);
            }
        }
        indexLength -= 1;
        sortData.sorted = indexLength;
    }

    // pauses the bubble sort to allow visualisation of the array elements
    await pause(50);
    sortData.finished = true;
    // this needed to be included to allow the visuals to be updated, showing that the array is completely sorted
    array[array.length] = array[array.length];
}

// standard selection sort algorithm with appropriate modifications
async function selectionSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length + 1; j++) {
            sortData.current = j;
            console.log(sortData["current"]);
            if (j != array.length && array[j] < array[minIndex]) {
                minIndex = j;
                await pause(500);
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
            console.log(j);
            // 
            sortData.current = j;
            array[j] = array[j - 1];
            j -= 1;
            await pause(100);
        }
        array[j] = value;
    }
}
</script>
