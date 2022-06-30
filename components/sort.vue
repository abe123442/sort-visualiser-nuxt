<template>
	<div class="md:grid md:grid-cols-2 md:gap-6">
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="shadow sm:rounded-md sm:overflow-hidden">
				<div class="px-4 py-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-500 space-y-6 sm:p-6">
					<div class="grid grid-cols-3 gap-6">
						<div class="col-span-3 sm:col-span-2">

							<label for="input-data" class="block text-lg font-bold">
								Array values (optional) </label>
							<div class="mt-1 flex rounded-md shadow-sm">
								<input type="text" name="input-data" id="input-data"
									class="bg-slate-500 text-white flex-1 block w-full rounded-none rounded-r-md sm:text-md border-gray-300"
									placeholder=" [15, 22, 8, 2, 12, 9, 6] " />
							</div>

						</div>

					</div>


					<label for="steps-range" class="block mb-2 text-lg font-bold text-gray-900 dark:text-gray-300">Array
						Size
						(default 8)</label>
					<input id="steps-range" type="range" min="5" max="12" step="1"
						class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
						v-model="size" @change="changeSize(size)">
				</div>
			</div>
		</div>
	</div>
	<br>
	<PageSection>
		<div class="grid grid-flow-row gap-20">
			<div class="row">
				<div class="center w-1/3">
					<div class="array-container">
						<!--the div 'array-container' stores child divs that are each styled to be a bar depending on a value in the 'array' property of data()-->
						<div class="bar" v-for="(number, index) in arrayRef" :key="index"
							:style="{ height: number + 'px' }">
						</div>
					</div>
					<br>
					<div class="row">
						<div class="flex flex-wrap -mx-3 mb-2 " id="sort-controls">
							<div class="w-full md:w-1/1 px-3 mb-6 md:mb-0">
								<button type="button"
									class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
									@click="initialiseSort()">
									Sort
								</button>
							</div>
						</div>
					</div>

				</div>

			</div>
			<div class="row">
				<!-- group that contains the debug feature data & interactions -->

				<div
					class="flex flex-wrap gap-x-0.5 p-6 w-full md:w-1/1 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
					<div class="flex-container column">
						<!-- previous debug button -->
						<button
							class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
							@click="debugGoBack()" id="prev">
							Prev
						</button>
					</div>
					<div class="flex-container column">
						<a href="#">
							<!-- debug-info contains multiple p tags, each of which contain the value of each data type in sortData -->
							<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
								v-for="(item, index) in sortData" :key="item.id">
								{{ index }}: {{ item }}
							</h5>
						</a>
					</div>

					<div class="flex-container column">
						<!-- next debug button -->
						<button
							class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
							@click="debugGoNext()" id="next">
							Next
						</button>
					</div>
					<a href="#">
						<!-- debug-info contains multiple p tags, each of which contain the value of each data type in sortData -->
						<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
							v-for="(item, index) in sortData" :key="item.id">
							{{ index }}: {{ item }}
						</h5>
					</a>
				</div>
			</div>



		</div>
	</PageSection>

</template>

<script setup>
import { useCurrentSortInfo } from "../stores/SortInfo";
import "@/components/SortVisualiser.vue";
import { swap, LinkedList } from "../utils/helper";
import { ref } from "vue";

const useSortInfo = useCurrentSortInfo();

const size = ref(5);

const props = defineProps({
	sortName: {
		type: String,
		required: true
	}
});

const generateArray = (size) => {
	return Array.from({ length: size }, () => Math.floor(Math.random() * 200) + 5)
}

let array = generateArray(size.value);
const arrayRef = ref(array);

// boolean conditionals
const sorting = ref(false);
const debugging = ref(false);

// data from each pass (yield of generator sort function)
const sortData = ref({});

// array of the data of every single sort pass
let sortPassData = [];

// linked list data structure 
const sortHistory = ref();

// generator
const sorter = ref();

const changeSize = (newSize) => {
	debugging.value = false;
	arrayRef.value.length = newSize;
	arrayRef.value = generateArray(newSize);
}

function yieldSortData(array, message, variables) {
	return {
		"array": array,
		"message": message,
		"variables": variables
	}
}

function* bubbleSort(array) {
	// yield yieldSortData(
	// 	Object.values(array),
	// 	useSortInfo.info[useSortInfo.sortState],
	// 	{
	// 		"swapped": swapped,
	// 		"indexLength": indexLength
	// 	}
	// );
	// useSortInfo.IncrementSortState();

	var indexLength = array.length;
	var swapped = -1;
	while (swapped != 0) {
		swapped = 0;
		for (let i = 0; i < indexLength; i++) {
			// yield yieldSortData(
			// 	Object.values(array),
			// 	useSortInfo.info[useSortInfo.sortState],
			// 	{ "swapped": swapped, "indexLength": indexLength }
			// );

			if (array[i] > array[i + 1]) {
				// useSortInfo.IncrementSortState();
				swap(array, i, i + 1);
				// yield yieldSortData(
				// 	Object.values(array), /* Fixed the assignment bug. Changed it from "assignment by reference" to "assignment by value" */
				// 	useSortInfo.info[useSortInfo.sortState],
				// 	{ "swapped": swapped, "indexLength": indexLength }
				// );
				// useSortInfo.DecrementSortState();
				swapped += 1;
			}
		}
		indexLength -= 1;
		// yield yieldSortData(
		// 	Object.values(array),
		// 	useSortInfo.info[useSortInfo.sortState],
		// 	{ "swapped": swapped, "indexLength": indexLength }
		// );

		// if (swapped != 0) {
		// 	useSortInfo.DecrementSortState();
		// 	useSortInfo.DecrementSortState();
		// }
		// else {
		// 	useSortInfo.IncrementSortState();
		// }
	}

	// yield { "message": useSortInfo.info[useSortInfo.sortState] };
}

function* insertionSort(array) {
	let j;
	let value;


	for (let i = 1; i < array.length; i++) {
		value = array[i];
		j = i;

		while (j > 0 && array[j - 1] > value) {
			yield {
				"array": Object.values(array),
				"value": value,
				"j": j,
				"i": i
			};
			array[j] = array[j - 1];
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

const initialiseSort = () => {
	// prevents the sort from running if another algorithm is already running
	if (sorting.value) return;

	sorting.value = true;
	// checks the algorithm type and sets up the generator accordingly
	switch (props.sortName) {
		// 'this.sorter' is a generator that stores the values of each pass of a sorting algorithm
		// each case assigns a different generator to 'this.sorter' based on the chosen algorithm
		case "bubble":
			sorter.value = bubbleSort(array);
			break;
		case "insertion":
			sorter.value = insertionSort(array);
			break;
		case "selection":
			sorter.value = selectionSort(array);
			break;
		default:
			break;
	}

	// initialises the data structure to store data through the sort execution
	sortHistory.value = new LinkedList(sorter.value.next().value);
	// runs the 'normal' sort that will only stop once the array is sorted
	normalSort();
}



const updateData = () => {
	sortData.value = sortHistory.value.currentNode.data;
	array = sortData.value.array;
	// arrayRef.value = sortData.value.array;
}


async function normalSort() {
	// runs until the array is sorted or debug mode is enabled
	while (sorting.value) {

		// runs if the user has stepped backwards and is now resuming the sort visualisation
		if (sortHistory.value.lastNode != sortHistory.value.currentNode) {
			sortHistory.value.traverseForward();
		}
		// runs if new data is being requested from the sort, i.e., new "passes" of the sort are occuring
		else {
			// gets the next value of the sorter generator
			let next = sorter.value.next();
			// checks if the generator is exhausted of values, i.e., the array is fully sorted
			console.log(next);
			if (next.done) {
				sorting.value = false;
				// updateData();
				cleanup();
				return; // 'normalSort' is finished here

			} else {
				// adds the next value to the data structure
				sortHistory.value.append(next.value);
				// sets the current "pass" variable info
				sortHistory.value.traverseForward();
			}
		}
		// delays for a time period to show how the array is changing during sorting
		await pause(50);
		updateData();
	}
}


const cleanup = () => {
	if (Object.keys(sortData.value).length == 0) return;
	sortData.value = {};
	sortHistory.value.deleteList();
}

async function debugSort() {
	sortPassData = [...sorter.value];
	console.log(sortPassData);
}




const toggleDebug = () => {

	if (!debugging.value && !sorting.value) return;

	debugging.value = !debugging.value;


	if (sorting.value) {
		sorting.value = false;
	} else {
		sorting.value = true;
		this.normalSort();
	}
}

// goes back one "pass" of the sorting algorithm and changes 'watched' properties
const debugGoBack = () => {
	if (!debugging.value) return;

	sortHistory.value.traverseBack();
	sortData.value = sortHistory.value.currentNode.data;
	arrayRef.value = sortData.value.array;
}

// goes forward one "pass" of the sorting algorithm and changes 'watched' properties
const debugGoNext = () => {
	if (!debugging.value) return;
	// runs if the next "pass" of the algorithm is not yet stored in the sortHistory data structure 
	if (!sortHistory.value.currentNode.next) {
		let next = sorter.value.next();
		if (next.done) { return; } else { sortHistory.value.append(next.value); }
	}
	// updates the variables which are being tracked by vue
	// the 'array-container' div is directly linked to any mutations of the 'array' property in data() 
	sortHistory.value.traverseForward();
	sortData.value = sortHistory.value.currentNode.data;
	arrayRef.value = sortData.value.array;
}

onMounted(() => {
	useSortInfo.UpdateCurrentSort(props.sortName);
});
</script>

<style scoped>
.center {
	margin: 0 auto;
	box-shadow: rgb(0 0 0 / 90%) 0px 8px 32px;
	height: 420px;
	max-height: 731px;
}

.array-container {
	display: flex;
	align-items: flex-end;
	min-height: 100%;
	height: 100%;
	padding: 1rem;
	flex-direction: row;
}

.bar {
	display: flex;
	align-items: flex-start;
	flex: 0.5;
	width: 0.000001%;
	margin: 1px;
	background-color: #d6d6d6;
	resize: both;
	position: relative;
	transition: all 0.4s ease-in;
}

.bar-current {
	display: flex;
	align-items: flex-start;
	flex: 0.5;
	width: 0.000001%;
	margin: 1px;
	background-color: #28282b;
	resize: both;
	position: relative;
	transition: all 0.4s ease-in;
}
</style>