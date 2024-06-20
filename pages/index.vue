<template>
  <div class="flex justify-center sticky top-0 bg-black gap-2">
    <div class="w-1/5 ml-2"><SidebarContry/></div>
    <div class="flex flex-row gap-2 w-4/5 mr-2 p-4">
    <IconField class="w-3/5 shadow-md">
      <InputIcon>
        <i class="pi pi-search" />
      </InputIcon>
      <InputText v-model="searchTerm" placeholder="Busca un país" class="w-full shadow-none" />
      <ul v-if="showDropdown" class="absolute z-10 mt-1 bg-white border border-gray-300 w-full rounded-md shadow-lg">
        <div class="flex flex-row items-center justify-between p-4"><p>Filtrar por continente</p>
          <div class="justify-between"><button @click="showDropdown=false" class="hover:text-green-500"><i class="pi pi-check"/>&nbsp;Guardar&nbsp;&nbsp;</button>
            <button @click="uncheckAll" class="hover:text-blue-500"><i class="pi pi-trash"/>&nbsp;Limpiar</button></div></div>
        <li v-for="continent in continents" :key="continent.code">
          <label class="inline-flex items-center cursor-pointer w-full px-4">
            <Checkbox v-model="selectedContinents" inputId="ingredient1" name="check_continent" :value="continent" />
            <span class="ml-2">{{ continent.name }}</span>
          </label>
        </li>
      </ul>
    </IconField>
    <Button @click="toggleDropdown">Filtrar</Button> </div>
  </div>
  <div class="p-4 flex" id="countriesView">
    <div class="flex flex-wrap justify-center w-full" v-if="filteredCountries.length > 0">
      <CardCountry v-for="country in filteredCountries" :key="country.code" :continent="country.continent.name" :name="country.name" />
    </div>
    <div class="flex flex-wrap justify-center" v-else>
      No se encontraron países
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import CardCountry from '~/components/CardCountry.vue';
import { gql } from 'graphql-tag';
definePageMeta({
  layout: 'principal'
});

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      continent {
        name
      }
    }
  }
`;

const GET_CONTINENTS = gql`
  query GetContinents {
    continents {
      name
      code
    }
  }
`;

interface Country {
  code: string;
  name: string;
  continent: {
    name: string;
  };
}

interface Continent {
  name: string;
  code: string;
}

interface CountriesResult {
  countries: Country[];
}

interface ContinentsResult {
  continents: Continent[];
}

const { result: countryResult } = useQuery<CountriesResult>(GET_COUNTRIES);
const { result: continentResult } = useQuery<ContinentsResult>(GET_CONTINENTS);

const countries = ref<Country[]>([]);
const continents = ref<Continent[]>([]);
const showDropdown = ref(false);
const selectedContinents = ref<Continent[]>([]); 
const searchTerm = ref('');

onMounted(() => {
  if (countryResult.value && countryResult.value.countries) {
    countries.value = countryResult.value.countries;
  }
  if (continentResult.value && continentResult.value.continents) {
    continents.value = continentResult.value.continents;
  }
});

const filteredCountries = computed(() => {
  return countries.value.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    const matchesContinent = selectedContinents.value.length === 0 || selectedContinents.value.some(c => c.name === country.continent.name);
    return matchesSearch && matchesContinent;
  });
});

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const uncheckAll = () => {
  selectedContinents.value = [];
};
</script>
