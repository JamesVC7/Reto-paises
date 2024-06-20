<template>
    <div class="flex flex-wrap justify-around p-4">
        <div class="flex flex-col items-center justify-center w-full sm:w-3/6">
            <h1 class="text-3xl">{{ country?.name }}</h1>
            <p>{{ country?.continent?.name }}</p>
            <img class="w-full p-0 my-5 lg:p-8 lg:m-0" v-if="image" :src="image.largeImageURL" style="height: 500px; object-fit: cover;">
            <div v-else>
                No se encontro la imagen
            </div>
        </div>
        <div class="flex flex-col justify-center items-center p-0 gap-4 w-full sm:w-1/2 sm:p-4 xl:w-5/12">
        <div class="flex flex-col items-start gap-4 p-4 bg-black text-white w-full sm:flex-row sm:items-end ">
            <div class="flex flex-col gap-4 w-full">
            <p class="font-bold">Capital:</p><p> {{ country?.capital }}</p>
            <p class="font-bold">Moneda:</p><p>{{ country?.currency }}</p>
            <div v-if="country?.languages.length">
                <p class="font-bold">Idiomas</p><br>
                <Listbox v-model="selectedState" :options="country.languages" optionLabel="name" class="w-full" listStyle="max-height:250px"/>
            </div>
            </div>
            <div class="w-full"v-if="country?.states.length">
                <p class="font-bold">Estados</p><br>
                <Listbox v-model="selectedState" :options="country.states" optionLabel="name" class="w-full" listStyle="max-height:250px"/>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { getImages } from '~/api/pixabay-api.js';

const GET_COUNTRY_DETAILS = gql`
    query GetCountryDetails($name: String!) {
      countries(filter: { name: { eq: $name } }) {
        code
        name
        capital
        currency
        states {
          name
        }
        continent {
          name
        }
        languages {
          name
        }
      }
    }
  `;

interface Country {
    code: string;
    name: string;
    capital: string;
    currency: string;
    states: { name: string }[];
    continent: { name: string };
    languages: { name: string }[];
}

interface CountryImage {
    largeImageURL: string;
}

const image = ref<CountryImage | null>(null);
const country = ref<Country | null>(null);
const route = useRoute();
const selectedState = ref<{ name: string } | null>(null);

const { result, onResult } = useQuery(GET_COUNTRY_DETAILS, {
    name: route.params.name
});


onResult((queryResult) => {
    if (queryResult.data && queryResult.data.countries.length > 0) {
        country.value = queryResult.data.countries[0];
    }
});

onMounted(async () => {
    try {
        const fetchedImages = await getImages(route.params.name);
        if (fetchedImages.length > 0) {
            image.value = fetchedImages[0];
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
});
</script>