<template>

	<!-- Sets up a button that emits a signal to start the visualisation of the appropriate algorithm -->
	<button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded border-b-4 border-blue-700 hover:border-blue-500 inline-flex items-center h-10 px-6 text-base rounded" 
		@click="$emit('start-visualiser', name)">
		<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24">
			<path d="M2 24v-24l20 12-20 12z" />
		</svg>
		<span>{{ name }}</span>
	</button>
</template>

<script lang="ts" setup>
defineProps({
	name: {
		type: String,
		required: true
	},
});

defineEmits(["start-visualiser"]);
</script>