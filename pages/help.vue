<template>
    <PageWrapper class="flex flex-col justify-center items-center">
        <PageHeader>
            <PageTitle text="User Manual" class="capitalize" />
        </PageHeader>
        <PageBody>

            <div class="flex flex-col items-center">
                <table>
                <tr >
                    <td><h1 class="mt-10 mb-5 text-xl text-gray-700 font-black uppercase dark:text-gray-400"> About simulsort</h1></td>
                </tr>
                   <tr >
                    <td><h1 class="text-lg text-gray-700 font-medium dark:text-gray-400">SIMULSORT is intended to be a visual tool to help students learn various sorting algorithms. First version of SIMULSORT is focussing on 3 techniques - Bubble, Selection and Insertion </h1></td>
                </tr>

                 <tr >
                    <td><h1 class="mt-10 mb-5 text-xl text-gray-700 font-black uppercase dark:text-gray-400"> Learn</h1></td>
                </tr>
                <tr >
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400"> Learn page lists the sorting algorithms visualised in the tool. </h1></td>
                </tr>
                <tr>
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400"> Navigation: Click on the Learn button on the home page. Alternatively, one can click on Learn on top menu. </h1></td>
                </tr>

                    <tr>
                    <td><img src="assets/images/help/learn-img-01.png" class="border-2 border-sky-200 my-5 py-5 w-full"/></td>
                </tr>

                <tr>
                    <td><h1 class="mt-10 mb-5 text-xl text-gray-700 font-black uppercase dark:text-gray-400">Inside Learn</h1></td>
                </tr>

                    <tr>
                    <td><img src="assets/images/help/learn-img-03.png" class="border-2 border-sky-200 my-5 py-5 w-full"/></td>
                </tr>

                <tr>
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400"> Click the play button next to the sorting algorithm to start the visualisation. This gives a glimpse of the working of the algorithm. For a deep dive into the algortihm, click on the explore button.</h1></td>
                </tr>

                   <tr >
                    <td><h1 class="mt-10 mb-5 text-xl text-gray-700 font-black uppercase dark:text-gray-400"> Explore</h1></td>
                </tr>

                 <tr>
                    <td><img src="assets/images/help/learn-img-04.png" class="border-2 border-sky-200 my-5 py-5 w-full"/></td>
                </tr>


                <tr>
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400" >Change the array size to see the impact of bigger array sizes on the performance </h1></td>
                </tr>

                   <tr>
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400">Click on Generate Array to randomnly generate a new array for sorting.</h1></td>
                </tr>


                 <tr>
                    <td><img src="assets/images/help/learn-img-05.png" class="border-2 border-sky-200 my-5 py-5 w-full"/></td>
                </tr>

                <tr>
                    <td><h1 class="text-lg text-gray-700 font-bold dark:text-gray-400" >Click on pause / back / next to step through each step of the sort. </h1></td>
                </tr>

                </table>
            </div>

        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'page',
})
</script>
