<template>
    <div class="array-container">
        <!-- uses vue to loop over each item in the array and set the heights of each array element (bar) to the number  -->
        <template v-for="(number, index) in array" :key="index">
            <div class="bar" :style="{ height: number + 'px' }"></div>
        </template>
    </div>
</template>
<script setup>

// defining props for the component
const props = defineProps({
    array: Array,
    visualValues: Array
});

</script>

<style>
.array-container {
    display: flex;
    align-items: flex-end;
    height: 90%;
    padding: 1rem;
    flex-direction: row;
}

.bar {
    display: flex;
    align-items: flex-start;
    flex: 0.5;
    width: 0.00000001%;
    /* width: 0.000001%; */
    margin: 1px;
    background-color: #d6d6d6;
    resize: both;
    position: relative;
    /* transition: all 0.4s ease-in; */
}

.current {

    background-color: #0ea5e9 !important;
}

.swap,
.minIndex {
    background-color: red !important;

}

.sorted {

    background-color: #374161 !important;
}
</style>
