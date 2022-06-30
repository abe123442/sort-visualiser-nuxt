<template>
	<div class="md:grid md:grid-cols-2 md:gap-6">
		<div class="mt-5 md:mt-0 md:col-span-2">
			<div class="shadow sm:rounded-md sm:overflow-hidden">
				<div
					class="px-4 py-5 gap-x-0.5 p-6 w-full md:w-1/1 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">

					<div class="margin-bottom-15">


						<label for="minmax-range"
							class="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300 weight-600">Array
							size: </label>

						<!-- v-model causes the input to be bound to values from the size Ref object  -->
						<input id="minmax-range" type="range" min="5" max="12" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" v-model="size">
					</div>
				</div>
			</div>
		</div>
	</div>
	<br>

	<!-- Loading a child component and passing in necessary properties needed to initialise it -->
	<SortVisualiser :array-size="size" :algorithm="sortName" />

</template>

<!-- the setup script file for this component -->
<script lang="ts" setup>
import "@/components/SortVisualiser.vue"; // importing a component to be used
import { useCurrentSortInfo } from "../stores/SortInfo"; // imports a store type variable

// initialises the store with a variable
const useSortInfo = useCurrentSortInfo();

// props for this component
const props = defineProps({
	sortName: {
		type: String,
		required: true
	}
});

// a reactive variable that can change values. It is used in the slider component, so its value is updated as the value of the slider bar changes
const size = ref(8);


// when this component is loaded into memory, the below function runs
onMounted(() => {
	useSortInfo.UpdateCurrentSort(props.sortName); // this function sets the current sort property to the sortName property defined in this component's properties
});

</script>