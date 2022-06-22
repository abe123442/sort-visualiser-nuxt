<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.play.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <PageSectionTitle :text="$t('pages.play.counter')" class="capitalize" />
                <div
                    class="flex flex-col items-center justify-items-center space-y-2 lg:space-y-0 lg:flex-row lg:space-x-2">
                    <div>Score : {{ counter.count }}</div>
                    <Button class="w-full lg:w-auto capitalize" type="secondary" size="sm"
                        :text="$t('pages.play.increment')" @click.prevent="counter.increment" />
                    <Button class="w-full lg:w-auto capitalize" type="secondary" size="sm"
                        :text="$t('pages.play.reset')" @click.prevent="counter.reset" />
                </div>

            </PageSection>
            <PageSection>
                <SortGuesser receiveGuess="userGuess"></SortGuesser>
            </PageSection>
        </PageBody>
    </PageWrapper>
    
</template>

<script lang="ts" setup>

import { useCounter as streakCounter } from '~/stores/counter'
const counter = streakCounter()

function userGuess(guess: string) {
    console.log(guess)
}

definePageMeta({
    layout: 'page',
})
</script>
