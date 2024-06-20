// pixabay-api.js

const PIXABAY_API_KEY = '44452495-f6f145907b4a93aa486086642';
const API_KEY='44486199-0deb6864182bedf9f1aa7d2d8';

export async function getImages(name) {
    const response = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${name}`);
    const data = await response.json();
    if (data.hits && Array.isArray(data.hits)) {
        // Filtrar las imágenes de tipo "photo"
        return data.hits.filter(image => image.type === 'photo');
    }
    return [];
}

export async function getIlustrations(name) {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${name}+flag`);
    const data = await response.json();
    if (data.hits && Array.isArray(data.hits)) {
        // Filtrar las imágenes de tipo "illustration"
        return data.hits.filter(image => image.type === 'illustration');
    }
    return [];
}
