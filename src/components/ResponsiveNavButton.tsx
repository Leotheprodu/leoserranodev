import { responsiveStore } from '../stores/store';
import { useStore } from '@nanostores/react';
import { IconsReact } from './IconsReact';
export const ResponsiveNavButton = () => {
    const $responsiveButton = useStore(responsiveStore);

    const handleClick = () => {
        if (
            $responsiveButton &&
            !document.getElementById('sectionNav').classList.contains('hidden')
        ) {
            responsiveStore.set(false);
            document.getElementById('sectionNav').classList.add('hidden');
            document.getElementById('sectionNav').classList.remove('block');
        } else {
            responsiveStore.set(true);
            document.getElementById('sectionNav').classList.add('block');
            document.getElementById('sectionNav').classList.remove('hidden');
        }
    };
    return (
        <button
            className="h-full w-20 flex justify-center items-center"
            onClick={handleClick}
        >
            <IconsReact name="menu" css="dark:fill-slate-300 h-12 w-12 z-50" />
        </button>
    );
};
