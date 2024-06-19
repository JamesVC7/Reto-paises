<template>
    <div>
      <div>
        <img v-if="image" :src="image.previewURL" />
        <div v-else>
          No image found
        </div>
      </div>
      <p>{{ country?.name }}</p>
      <p>{{ country?.continent?.name }}</p>
      <p>Capital: {{ country?.capital }}</p>
      <p>Moneda: {{ country?.currency }}</p>
      <div v-if="country?.states.length">
        <p v-for="state in country.states" :key="state.name">Estados: {{ state.name }}</p>
      </div>
      <div v-if="country?.languages.length">
        <p v-for="language in country.languages" :key="language.name">Idiomas: {{ language.name }}</p>
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
    previewURL: string;
  }
  
  const image = ref<CountryImage | null>(null);
  const country = ref<Country | null>(null);
  const route = useRoute();
  
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
  