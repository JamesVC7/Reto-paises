<template>
    <div class="flex flex-wrap justify-around p-4">
        <div class="flex justify-center w-full sm:w-3/5">
            <img class="w-full" v-if="image" :src="image.largeImageURL" />
            <div v-else>
                No image found
            </div>
        </div>
        <div class="flex flex-col justify-center items-center p-4 gap-4">
            <div class="flex flex-col items-center gap-4">
            <h1>{{ country?.name }}</h1>
            <p>{{ country?.continent?.name }}</p>
        </div>
        <div class="flex flex-col gap-4">
            <p>Capital: {{ country?.capital }}</p>
            <p>Moneda: {{ country?.currency }}</p>
            <div v-if="country?.states.length">
                <p>Estados</p><br>
                <Listbox v-model="selectedState" :options="country.states" optionLabel="name" class="w-full md:w-[14rem]" listStyle="max-height:250px"/>
            </div>
            <div v-if="country?.languages.length">
                <p>Idiomas</p><br>
                <Listbox v-model="selectedState" :options="country.languages" optionLabel="name" class="w-full md:w-[14rem]" listStyle="max-height:250px"/>
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
    } else {
        console.error('No country data found');
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