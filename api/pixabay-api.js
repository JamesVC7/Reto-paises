// pixabay-api.js

const PIXABAY_API_KEY = '44452495-f6f145907b4a93aa486086642';

export async function getImages(name) {
    const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${name}`);
    const data = await response.json();
    // Filtrar las imágenes de tipo "photo"
    const photoImages = data.hits.filter(image => image.type === 'photo');
    return photoImages;
}

export async function getIlustrations(name) {
    const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${name}+flag`);
    const data = await response.json();
    // Filtrar las imágenes de tipo ""
    const photoImages = data.hits.filter(image => image.type === 'illustration');
    return photoImages;
}


      