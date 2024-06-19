<template>
  <div>
    <Paginator
      v-model:currentPage="currentPage"
      :rows="rowsPerPage"
      :totalRecords="totalCountries"
      :rowsPerPageOptions="[10, 20, 30]"
    ></Paginator>
    
    <div v-for="(country, index) in displayedCountries" :key="country.cod">
      <CardCountry
        :continent="country.continent.name"
        :name="country.name"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';


interface CountriesResults {
  countries: {
    cod: string;
    continent: {
      name: string;
    }
    name: string;
  }[]
}

const query = gql`
  query GetCountries {
    countries {
      code
      continent {
        name
      }
      name
    }
  }
`;

const { result } = useQuery<CountriesResults>(query);
const countries = ref<CountriesResults['countries']>([]);

if (result.value && result.value.countries) {
  countries.value = result.value.countries;
}

// Paginación
const currentPage = ref(1);
const rowsPerPage = ref(10);

const totalCountries = computed(() => countries.value.length);

const displayedCountries = computed(() => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  return countries.value.slice(startIndex, startIndex + rowsPerPage.value);
});
</script>

