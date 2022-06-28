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
    visualValues: {
        type: Object,
        default: {}
    },
});

const barClasses = (index) => {
    if (props.visualValues.finished === true) {
        return {
            sorted: true
        }
    }
    console.log(props.visualValues.swap);
    return {
        current: index === props.visualValues.current,
        swap: index - 1 === props.visualValues.swap,
        sorted: index === props.visualValues.sorted,
    }
};

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

.swap, .minIndex {
    background-color: red !important;
    
}

.sorted {
    
    background-color: #374161 !important;
}
</style>
