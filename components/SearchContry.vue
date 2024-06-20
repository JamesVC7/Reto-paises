<template>
<div class="flex justify-center">
<IconField class="w-6/12 shadow-md">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText v-model="searchTerm" placeholder="Busca un pais" class="w-full shadow-none"/>
    </IconField>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      continent {
        name
      }
    }
  }
`;

interface Country {
  cod: string;
  name: string;
  continent: {
    name: string;
  };
}

interface CountriesResult {
  countries: Country[];
}

const { result } = useQuery<CountriesResult>(GET_COUNTRIES);
const countries = ref<Country[]>([]);

// Obtenemos la lista de países cuando la consulta está lista
if (result.value && result.value.countries) {
  countries.value = result.value.countries;
}

const searchTerm = ref('');


</script>