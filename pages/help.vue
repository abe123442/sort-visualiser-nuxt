<template>
    <PageWrapper class="flex flex-col justify-center items-center">
        <PageHeader>
            <PageTitle :text="$t('pages.help.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <div class="flex flex-col items-center">
                <h1>Coming Soon...</h1>
            </div>
        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'page',
})
</script>
