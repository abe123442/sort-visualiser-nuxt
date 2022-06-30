<template>
	<div class="grid grid-flow-row gap-10">
		<div class="row">
			<div class="center w-1/3">
				<div class="array-container">
					<!--the div 'array-container' stores child divs that are each styled to be a bar depending on a value in the 'array' property of data()-->
					<div class="bar" v-for="(number, index) in array" :key="index" :style="{ height: number + 'px' }">
					</div>
				</div>
			</div>
		</div>

		<div class="row">
			<div class="flex flex-wrap -mx-3 mb-2 " id="sort-controls">

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<div class="relative">
					</div>
				</div>
				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="initialiseSort()">
						Sort
					</button>
				</div>
			</div>
		</div>

		<div class="row" v-if="sorting">
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
</template>

<script setup>
import { swap, LinkedList } from "../utils/helper";
import { ref } from "vue";

const props = defineProps({
	arraySize: {
		type: Number,
		required: true
	},

	algorithm: {
		type: String,
		required: true
	},

	sortState: {
		type: Number
	}
});

const window = ref({ width: 0, height: 0 });
const speed = ref(50);
const array = ref([]);
const arraySizeRef = ref(props.arraySize);
const sorting = ref(false);
const debugging = ref(true);
const sortData = ref({});
const sortHistory = ref();
const sortState = ref(0);
const sorter = ref();

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
				swap(array, i, i + 1);
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
	if (debugging.value) return;

	// checks the algorithm type and sets up the generator accordingly
	switch (props.algorithm) {
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
			return;
	}
	// initialises the data structure to store data through the sort execution
	sortHistory.value = new LinkedList(sorter.value.next().value);
	// runs the 'normal' sort that will only stop once the array is sorted
	debugSort();
}

const updateData = () => {
	sortData.value = sortHistory.value.currentNode.data;
	array.value = sortData.value.array;
}

const cleanup = () => {
	if (Object.keys(sortData.value).length == 0) return;
	sortData.value = {};
	sortHistory.value.deleteList();
}

async function debugSort() {
	let next = sorter.value.next();

}



// toggles when the debug button is clicked to start/resume sorting 
const toggleDebug = () => {
	// checks if the sorting has started
	if (!debugging.value && !sorting.value) return;

	debugging.value = !debugging.value;

	// stops the execution of normalSort() if sorting is true
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
	array.value = sortData.value.array;
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
	array.value = sortData.value.array;
}

const generateArray = (size) => {
	for (let i = 0; i < size; i++) {
		array.value[i] = Math.floor(Math.random() * 375) + 5;
	}
}

// onMounted(() => {
// 	console.log(props.sortInfo.info[props.sortInfo.sortState]);
// 	props.sortInfo.UpdateSortState();
// 	console.log(props.sortInfo.info[props.sortInfo.sortState]);
// });

watch(
	() => props.arraySize,
	(newValue) => {
		array.value.length = newValue;
		generateArray(newValue);
	},
	{ immediate: true }
);

watch(
	() => props.sortState,
	(newValue) => sortState = newValue
)


</script>
<!-- the style is scoped to prevent overwriting the main app's styling -->
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

.btn-primary {
	border-color: #218652;
	background-color: hsla(160, 100%, 37%, 1);
	/*border-color: #5bc2c2*/
}

.btn-primary:hover {
	color: #212529;
	background-color: #52bebe;
	border-color: #8ad3d3
}

.btn-outline-primary {
	color: #7cc;
	background-color: transparent;
	background-image: none;
	border-color: #7cc
}
</style>