<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.learn.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3" v-for="index in sorts" :key="index">
                                    <SortTableButton :name="index" v-on:start-visualiser="initialiseSort">
                                    </SortTableButton>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="px-6 py-4">
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
                <button class="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded inline-flex items-center">
                    <svg class="fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5 46Q3.8 46 2.9 45.1Q2 44.2 2 43V4.95Q2 3.8 2.9 2.875Q3.8 1.95 5 1.95H43.05Q44.2 1.95 45.125 2.875Q46.05 3.8 46.05 4.95V43Q46.05 44.2 45.125 45.1Q44.2 46 43.05 46ZM19.8 21.8 21.95 19.65 9.7 7.45 7.55 9.6ZM29.1 40.5H40.55V29.05H37.55V35.4L28.25 26.2L26.15 28.35L35.35 37.5H29.1ZM9.65 40.5 37.55 12.6V18.9H40.55V7.45H29.1V10.45H35.45L7.55 38.35Z" />
                    </svg>
                </button>

            </PageSection>
        </PageBody>
    </PageWrapper>
</template>

<script setup>
// import { shuffle } from "@/utils/helper.js";
import { pause, swap, insertionSort, selectionSort } from "@/utils/algorithms.js";
import SortTableButton from "@/components/SortTableButton.vue";
import SortTablePreview from "@/components/SortTablePreview.vue";
import { ref } from 'vue';


definePageMeta({
    layout: 'page',
})



const props = defineProps({
    sorts: {
        type: Array,
        default: ["Bubble", "Selection", "Insertion"],
    }
});

const generateArray = (range) => {
    const size = 20;
    return Array.from({ length: size }, () => Math.floor(Math.random() * range) + 5);
}

let array = []
const range = 100
array = generateArray(range);

const bubbleArray = [...array];
const insertionArray = [...array];
const selectionArray = [...array];

const bubbleArrayRef = ref(bubbleArray);
const insertionArrayRef = ref(insertionArray);
const selectionArrayRef = ref(selectionArray);
const sortData = {};
const visualValues = ref(sortData);



const initialiseSort = (algorithm) => {
    console.log(array);
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

async function bubbleSort(array) {
    console.log(array);
    var indexLength = array.length;
    var swapCounter = -1;
    while (swapCounter != 0) {

        swapCounter = 0;
        for (let i = 0; i < indexLength; i++) {
            sortData["current"] = i
            if (array[i] > array[i + 1]) {
                // sortData["swap"] = [i, i+1];
                swap(array, i, i + 1);
                swapCounter += 1;
                await pause(200);
            }
        }
        indexLength -= 1;
        sortData["sorted"] = indexLength;
    }
}


</script>
