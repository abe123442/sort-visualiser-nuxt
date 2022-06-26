<template>
    <div class="array-container">
        <template v-for="(number, index) in array" :key="index">
            <div class="bar" :class="barClasses(index)" :style="{ height: number + 'px' }"></div>
        </template>

    </div>
</template>
<script setup>


const props = defineProps({
    array: Array,
    sortName: String,
    visualValues: {
        type: Object,
        default: {}
    },
});

const barClasses = (index) => {
    return {
        current: index === props.visualValues.current,
        swap: index === props.visualValues.swap,
        sorted: index === props.visualValues.sorted
    }
}

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
    background-color: yellow !important;
}

.swap {
    background-color: greenyellow !important;
}

.sorted {
    background-color: blueviolet !important;
}
</style>
