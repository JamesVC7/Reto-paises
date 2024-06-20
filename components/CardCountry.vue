<template>
    <nuxt-link :to="{ name: 'countries-name', params: { name } }"
        class="w-full m-8 sm:w-5/12 sm:m-4 sm:m-0 lg:w-1/4 lg:m-4 hover:shadow-xl" id="link_card">
        <Card id="card">
            <template #header>
                <img v-if="image" :src="image.webformatURL" class="p-4 w-full" id="card-img"/>
                <div v-else>
                    Cargando ...
                </div>
            </template>
            <template #title>
                <div class="flex flex-row items-center gap-4">
                    <img class="w-1/5 h-auto" v-if="illustration" :src="illustration.webformatURL" />
                    <div>{{ name }}
                        <p class="font-normal text-base">{{ continent }}</p>
                    </div>
                </div>
            </template>
        </Card>
    </nuxt-link>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getImages, getIlustrations } from '~/api/pixabay-api.js';

interface CardCountryProps {
    continent: string;
    name: string;
}

const props = defineProps<CardCountryProps>();

interface CountryImage {
    webformatURL: string;
    type: string;
}

const image = ref<CountryImage | null>(null);
const illustration = ref<CountryImage | null>(null);

onMounted(async () => {
    try {
        const fetchedImages: CountryImage[] = await getImages(props.name);
        const fetchedIllustrations: CountryImage[] = await getIlustrations(props.name);

        if (fetchedImages.length > 0) {
            image.value = fetchedImages[0];
        }

        if (fetchedIllustrations.length > 0) {
            illustration.value = fetchedIllustrations[0];
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

#card-img {
    height: 230px;
    object-fit: cover;
}

#link_card .p-component {
    height: 100%;
}
#card:hover{
    background: #3679e4;
    color: white;
}
</style>
