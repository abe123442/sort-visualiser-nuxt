<template>
	<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
		@click="$emit('start-visualiser', props.name)">
		<svg xmlns="http://www.w3.org/2000/svg" class="fill-current w-4 h-4 mr-2" viewBox="0 0 24 24">
			<path d="M2 24v-24l20 12-20 12z" />
		</svg>
		<span>{{ name }}</span>
	</button>
</template>
<!-- Need to decide what sorting algorithm to call depending on the value of "name" -->
<script lang="ts" setup>
const algorithmNames = ["Bubble", "Insertion", "Selection"]

const props = defineProps({
	name: {
		type: String,
		required: true
	},
})

const emit = defineEmits(["start-visualiser"])

// emit the algorithm to be run in this function
// const emitRunVisualiser = () => {
// 	if (!algorithmNames.includes(props.name)) return
// 	emit("start-visualiser", props.name)
// }


</script>