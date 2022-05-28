<template>
    <PageWrapper>
        <PageHeader>
            <PageTitle :text="$t('pages.learn.title')" class="capitalize" />
        </PageHeader>
        <PageBody>
            <PageSection>
                <SortVisualiser></SortVisualiser>
            </PageSection>
        </PageBody>
    </PageWrapper>
</template>

<script lang="ts" setup>
definePageMeta({
    layout: 'page',
})
</script>
