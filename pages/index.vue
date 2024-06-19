<template>
    <p>{{ data }}</p>
  </template>
  <script lang="ts" setup>
  const query = gql`
    query GetCountry {
    country(code: "BR") {
    name
    native
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
  `
  const { data } = await useAsyncQuery(query)
  </script>