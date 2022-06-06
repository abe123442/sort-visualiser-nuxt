<template>
	<div class="grid grid-flow-row gap-10">
		<div class="row">
			<div class="center w-full">
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
				controls
			</label>
			<div class="flex flex-wrap -mx-3 mb-2 " id="sort-controls">

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="initialiseSort()">
						Start Sort
					</button>
				</div>

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="resetArray()">
						Reset Array
					</button>
				</div>
			</div>
		</div>


		<div class="row">
			

			<label class="block uppercase tracking-wide text-gray-700 text-2xl font-bold mb-2 linear-wipe-text" for="guess">
				guess
			</label>
			<div class="flex flex-wrap -mx-3 mb-2 " id="guess">

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="submitGuess('bubble')">
						Bubble Sort
					</button>
				</div>

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="submitGuess('insertion')">
						Insertion Sort
					</button>
				</div>

				<div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
					<button type="button"
						class="bg-blue-500 w-1/1 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
						@click="submitGuess('selection')">
						Selection Sort
					</button>
				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { bubbleSort, insertionSort, selectionSort } from "../utils/algorithms";
import { LinkedList, pause } from "../utils/helper";
import { algorithms } from "../stores/GameData";


// adds the "sample" method to all array objects -> returns a random element of that array
Array.prototype.sample = function () {
	return this[Math.floor(Math.random() * this.length)];
}


// the script that is exported for this 'Visualised.vue' module injected into the main 'App.vue'
// it can be considered like a class with relevant properties/attributes and methods 
export default {
	// initialising the different properties that will be used in this module
	// note: each property can only be accessed by methods by "this.property"
	data() {
		return {
			array: [],
			sorting: false,
			original: [],
			arraySize: 25,
			speed: 100,
		};
	},

	// methods used in this module 
	methods: {

		// updates the variables which are being tracked by vue
		updateData: function () {
			this.sortData = this.sortHistory.currentNode.data;
			this.array = this.sortData.array;
		},

		cleanup: function () {
			if (Object.keys(this.sortData).length == 0) return;

			this.sortData = {};
			this.sortHistory.deleteList();
		},

		submitGuess: function (guess) {
			this.$emit("receiveGuess", guess);
		},

		// generates an array of length 'this.arraySize', where each element is a random integer between 5 and 380
		generateArray: function () {
			// prevents a new array from being generated while a sort is being run
			if (this.sorting) return;

			for (let i = 0; i < this.arraySize; i++) {
				this.original[i] = Math.floor(Math.random() * 375) + 5;
			}
			this.array = [...this.original];
		},

		// the entry point that sets up relevant data structures and variables for all sorting algorithms
		initialiseSort: function () {
			// prevents the sort from running if another algorithm is already running
			if (this.sorting) return;


			// sets the boolean to true so that the sort can't be interruped
			this.sorting = true;

			// checks the algorithm type and sets up the generator accordingly
			switch (algorithms.sample()) {
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
			}

			// initialises the data structure to store data through the sort execution
			this.sortHistory = new LinkedList(this.sorter.next().value);
			// runs the 'normal' sort that will only stop once the array is sorted
			this.randomSort();
		},

		resetArray: function () {
			if (this.sorting) return;
			this.array = [...this.original];
			this.cleanup();
		},

		randomSort: async function () {
			let next = this.sorter.next();
			// runs until the sort generator runs out of value (the array is sorted)
			console.log(this.sorting);
			console.log(!next.done);
			while (!next.done && this.sorting) {
				// adds the next value to the data structure
				this.sortHistory.append(next.value);
				// sets the current "pass" variable info
				this.sortHistory.traverseForward();

				// delays for a time period to show how the array is changing during sorting
				await pause(this.speed);


				// updates the data which needs to be seen on the website	
				this.updateData();

				// getting the next value of the sort generator
				next = this.sorter.next();
			}

			// once the sorting is complete, this allows for other disallowed interactions to occur again
			this.sorting = false;
		},
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