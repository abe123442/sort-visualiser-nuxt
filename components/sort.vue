<template>
		<div class="md:grid md:grid-cols-2 md:gap-6">
			<div class="mt-5 md:mt-0 md:col-span-2">
				<div class="shadow sm:rounded-md sm:overflow-hidden">
					<div class="px-4 py-5 bg-gray-50 dark:bg-gray-700 space-y-6 sm:p-6">
						<div class="grid grid-cols-3 gap-6">
							<div class="col-span-3 sm:col-span-2">
								<label for="input-data" class="block text-sm font-medium">
									Array values (optional) </label>
								<div class="mt-1 flex rounded-md shadow-sm">
									<input type="text" name="input-data" id="input-data"
										class="flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
										placeholder=" [15, 22, 8, 2, 12, 9, 6] " />
								</div>
							</div>

						</div>
						<div class="margin-bottom-15">
							<label id="arraysizeLabel" for="arraysize" class="dark large label weight-600">Array
								size: </label>
							<select id="arraysize" class="nice-select dark">
								<option value="5">5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option selected value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
						</div>
					</div>
					<!-- <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" @click="displayVisualiser()">Run</button>
					</div> -->
				</div>
			</div>
		</div>

		<SortVisualiser/>

</template>

<script lang="ts" setup>
import { useCurrentSortInfo } from "../stores/SortInfo";
import "@/components/SortVisualiser.vue";
const useSortInfo = useCurrentSortInfo();

const props = defineProps({
	sortName: {
		type: String,
		required: true
	}
});

let showVisualiser = false;

function displayVisualiser() {
	showVisualiser = true;
	console.log("entered function" + showVisualiser);
}

onMounted(() => {
	useSortInfo.UpdateCurrentSort(props.sortName);
});

</script>