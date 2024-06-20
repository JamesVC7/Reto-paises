<template>
    <nuxt-link :to="{ name: 'countries-name', params: { name } }"
        class="w-full m-8  sm:w-5/12 sm:m-4 sm:m-0 lg:w-1/4 lg:m-4">
        <Card id="card">
            <template #header>
                <img v-if="image" :src="image.largeImageURL" class="p-4 w-full" />
                <div v-else>
                    No hay imagenes
                </div>
            </template>
            <template #title>{{ name }}</template>
            <template #subtitle>{{ continent }}</template>
        </Card>
    </nuxt-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getImages } from '~/api/pixabay-api.js';

interface CardCountryProps {
    continent: string;
    name: string;
}

const props = defineProps<CardCountryProps>();

interface CountryImage {
    largeImageURL: string;
    webformatWidth: 640,
    webformatHeight: 260,
    type: "photo",
}

const image = ref<CountryImage | null>(null);

onMounted(async () => {
    try {
        const fetchedImages = await getImages(props.name);
        if (fetchedImages.length > 0) {
            image.value = fetchedImages[0];
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
});
</script>

<style>
#card .p-card-content {
    display: none;
}
</style>