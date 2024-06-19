<template>
    <nuxt-link :to="{ name: 'countries-name', params: { name } }" >
    <Card >
        
      <template #header>
        <img v-if="image" :src="image.previewURL" />
        <div v-else>
          No image found
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
    previewURL: string;
  }

  const image = ref<CountryImage | null>(null);
  
  onMounted(async () => {
    try {
      const fetchedImages = await getImages(props.name);
      if (fetchedImages.length > 0) {
        image.value = fetchedImages[1]; 
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  });
  </script>
  

  