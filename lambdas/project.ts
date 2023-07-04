import axios from 'axios';

const urls = [
    'https://colonialnavy.webstudio.so',
    'https://colonial.navy',

    'https://voids.webstudio.so',
    'https://voids.app',
    
    'https://ethdublin23.webstudio.so',
    'https://agenda.ethdublin.io',

    'https://unityprefab.webstudio.so',
    'https://unityprefab.com',

    'https://geonitioriginal.webstudio.so',
    'https://geoniti.com'
]

export const handler = async () => {
    const target = Math.floor(Math.random() * urls.length);
    console.log(`Requesting target ${urls[target]}`)
    await axios.get(urls[target]);
    console.log(`Target request completed`)
}
