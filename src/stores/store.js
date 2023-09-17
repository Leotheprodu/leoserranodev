import { atom } from 'nanostores';

//configuracion de darkmode
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
export const $darkModeStore = atom(darkModeMediaQuery.matches);
darkModeMediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        $darkModeStore.set(true);
    } else {
        $darkModeStore.set(false);
    }
});
