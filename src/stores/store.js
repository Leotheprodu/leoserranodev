import { atom } from 'nanostores';

//configuracion de darkmode
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

//Store
export const $darkModeStore = atom(darkModeMediaQuery.matches);
export const $responsiveStore = atom(true);
export const $languageStore = atom('en');

//funcion para detectar cambio a darkmode
darkModeMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        $darkModeStore.set(true);
    } else {
        $darkModeStore.set(false);
    }
});
