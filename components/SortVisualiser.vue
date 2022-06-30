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
			<label class="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2 linear-wipe-text"
				for="sort-controls">
				simulsort controls
			</label>
			<div class="flex flex-wrap -mx-3 mb-2" id="sort-controls">
				<div class="w-1/3 px-3 mb-6 md:mb-0 ">
					<!-- Creates a button that, when clicked executes the generateArray function -->
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="generateArray()">
						Generate Array
					</button>
				</div>

				<div class="w-1/3 px-3 mb-6 md:mb-0">
					<!-- Creates a button that, when clicked executes the initialiseSort function -->
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="initialiseSort()">
						Sort
					</button>
				</div>
			</div>
		</div>

		<div class="row">
			<label class="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2 linear-wipe-text"
				for="sort-controls">
				debug controls
			</label>
			<!-- group that contains the debug feature data & interactions -->

			<div
				class="flex flex-wrap gap-x-0.5 p-6 w-full md:w-1/1 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
				<div class="flex-container row">
					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="debugGoBack()" id="prev">
						Prev
					</button>

					<!-- debug button -->
					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-10"
						type="button" id="btnDebug" @click="toggleDebug()" v-if="!debugging">
						Pause
					</button>

					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded mx-10"
						type="button" id="btnDebug" @click="toggleDebug()" v-if="debugging">
						Resume
					</button>
					<!-- previous debug button -->

					<!-- next debug button -->
					<button
						class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-10 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="debugGoNext()" id="next">
						Next
					</button>
				</div>
				<br>

			</div>
			<br><br>
			<div class="flex-container row">
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
<script>
import { bubbleSort, insertionSort, selectionSort } from "../utils/algorithms";
import { LinkedList, pause } from "../utils/helper";


// the script that is exported for this 'Visualised.vue' module injected into the main 'App.vue'
// it can be considered like a class with relevant properties/attributes and methods 
export default {
	props: {
		arraySize: {
			type: Number,
			required: true
		},
		algorithm: {
			type: String,
			required: true
		}
	},

	// initialising the different properties that will be used in this module
	// note: each property can only be accessed by methods by "this.property"
	data() {
		return {
			window: { width: 0, height: 0 },
			array: [],
			speed: 200,
			debugging: false,
			sorting: false,
			sortData: {},
		};
	},

	// methods used in this module 
	methods: {

		setAlgorithm(event) {
			this.algorithm = event.target.value;
		},

		// [1] VISUALISER LOGIC 


		// updates the variables which are being tracked by vue
		// the 'array-container' div is directly linked to any mutations of the 'array' property in data() 
		updateData() {
			this.sortData = this.sortHistory.currentNode.data;
			this.array = this.sortData.array;
		},

		// generates an array of length 'this.arraySize', where each element is a random integer between 5 and 380
		generateArray() {
			// prevents a new array from being generated while a sort is being run
			if (this.sorting) return;

			// cleans up any data from any previous algorithm executions
			this.cleanup();
			for (let i = 0; i < this.arraySize; i++) {
				this.array[i] = Math.floor(Math.random() * 375) + 5;
			}
		},

		// the entry point that sets up relevant data structures and variables for all sorting algorithms
		initialiseSort() {
			// prevents the sort from running if another algorithm is already running
			if (this.sorting || this.debugging) return;


			// sets the boolean to true so that this.normalSort() will execute
			this.sorting = true;

			// checks the algorithm type and sets up the generator accordingly
			switch (this.algorithm) {
				// 'this.sorter' is a generator that stores the values of each pass of a sorting algorithm
				// each case assigns a different generator to 'this.sorter' based on the chosen algorithm
				case "bubble":
					this.sorter = bubbleSort(this.array);
					break;
				case "insertion":
					this.sorter = insertionSort(this.array);
					break;
				case "selection":
					this.sorter = selectionSort(this.array);
					break;
				default:
					return;
			}

			// initialises the data structure to store data through the sort execution
			this.sortHistory = new LinkedList(this.sorter.next().value);
			// runs the 'normal' sort that will only stop once the array is sorted
			this.normalSort();
		},

		// main sort function that allows complete visualisation of a sort algorithm
		normalSort: async function () {

			// runs until the array is sorted or debug mode is enabled
			while (this.sorting) {

				// runs if the user has stepped backwards and is now resuming the sort visualisation
				if (this.sortHistory.lastNode != this.sortHistory.currentNode) {
					this.sortHistory.traverseForward();
				}

				// runs if new data is being requested from the sort, i.e., new "passes" of the sort are occuring
				else {
					// gets the next value of the sorter generator
					let next = this.sorter.next();

					// checks if the generator is exhausted of values, i.e., the array is fully sorted
					if (next.done) {
						// console.log(`done`);
						this.sorting = false;
						this.updateData();
						this.cleanup();
						return; // 'normalSort' is finished here
					} else {
						// adds the next value to the data structure
						this.sortHistory.append(next.value);
						// sets the current "pass" variable info
						this.sortHistory.traverseForward();
					}

				}
				// delays for a time period to show how the array is changing during sorting
				await pause(this.speed);


				this.updateData();

			}
		},

		// toggles when the debug button is clicked to start/resume sorting 
		toggleDebug() {
			// checks if the sorting has started
			if (!this.debugging && !this.sorting) return;

			this.debugging = !this.debugging;

			// stops the execution of normalSort() if sorting is true
			if (this.sorting) {
				this.sorting = false;
			} else {
				this.sorting = true;
				this.normalSort();
			}
		},

		// goes back one "pass" of the sorting algorithm and changes 'watched' properties
		debugGoBack() {
			if (!this.debugging) return;

			this.sortHistory.traverseBack();
			this.sortData = this.sortHistory.currentNode.data;
			this.array = this.sortData.array;
		},

		// goes forward one "pass" of the sorting algorithm and changes 'watched' properties

		debugGoNext() {
			if (!this.debugging) return;

			// runs if the next "pass" of the algorithm is not yet stored in the sortHistory data structure 
			if (!this.sortHistory.currentNode.next) {
				let next = this.sorter.next();

				if (next.done) { return; } else { this.sortHistory.append(next.value); }
			}

			// updates the variables which are being tracked by vue
			// the 'array-container' div is directly linked to any mutations of the 'array' property in data() 
			this.sortHistory.traverseForward();
			this.sortData = this.sortHistory.currentNode.data;
			this.array = this.sortData.array;
		},

		// [2] UI LOGIC

		cleanup() {
			if (Object.keys(this.sortData).length === 0) return;

			this.sortData = {};
			this.sortHistory.deleteList();
		},

	},

	watch: {
		arraySize: {
			handler(newValue) {
				this.array.length = this.arraySize;
				this.generateArray();
			},
			immediate: true
		}
	},

	// executes when this 'Visualiser.vue' component is loaded in the main 'App.vue' component
	mounted() {
		this.generateArray();
	},
};
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