// pixabay-api.js
/* import axios from 'axios'

const PIXABAY_API_KEY = '44452495-f6f145907b4a93aa486086642'

export const getCountryImage = async (countryName) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: PIXABAY_API_KEY,
      q: countryName,
      category: 'places',
      per_page: 1,
    },
  })

  const images = response.data.hits
  return images.length > 0 ? images[0].webformatURL : null
} */

/* const cargarlmagenes=async()=>{
    let input=document.querySelector("#imgC").value;

    const key="44452495-f6f145907b4a93aa486086642";
    const url=`https://pixabay.com/api/?key=${key}&q=${input}`;
    console. log(url);

    const respuesta=await fetch(url);
} */

const PIXABAY_API_KEY = '44452495-f6f145907b4a93aa486086642'

    export async function getImages(name) {
        const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${name}`);
        const data = await response.json();
        return data.hits;
      }
      