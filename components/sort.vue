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
						<input id="minmax-range" type="range" min="5" max="12" class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" v-model="size">
					</div>
				</div>
			</div>
		</div>
	</div>
	<br>
	<SortVisualiser :array-size="size" :algorithm="sortName" />

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

const size = ref(8);

onMounted(() => {
	useSortInfo.UpdateCurrentSort(props.sortName);
});

</script>