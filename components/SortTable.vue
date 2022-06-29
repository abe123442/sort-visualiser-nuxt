<template>
    <div class="array-container">
        <template v-for="(number, index) in array" :key="index">
            <div class="bar" :class="barClasses(index)" :style="{ height: number + 'px' }"></div>
            <!-- <div class="bar" :class="`current`" :style="{ height: number + 'px' }"></div> -->
        </template>

    </div>
</template>
<script setup>

const props = defineProps({
    array: Array,
    visualValues: Array
});


// const barClasses = (index) => {
//     if (props.visualValues[index].style.finished === true) {
//         return {
//             sorted: true
//         }
//     }
//     return {
//         current: props.visualValues[index].style.current,
//         swap: props.visualValues[index - 1].style.swap,
//         sorted: props.visualValues[index].style.sorted,
//     }
// };
const barClasses = (index) => {
    let styles = {};
    if (props.visualValues[index].style.finished === true) {
        styles = {
            sorted: true
        }

    } else {
        styles = {
            current: props.visualValues[index].style.current,
            // swap: index === 0? false: props.visualValues[index - 1].style.swap,
            sorted: props.visualValues[index].style.sorted,
        }
    }
    return styles;
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

.swap,
.minIndex {
    background-color: red !important;

}

.sorted {

    background-color: #374161 !important;
}
</style>
