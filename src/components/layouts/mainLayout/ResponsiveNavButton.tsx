import { $responsiveStore } from '@stores/store';
import { useStore } from '@nanostores/react';
import { IconsReact } from '@utils/IconsReact';
export const ResponsiveNavButton = () => {
  const responsiveButton = useStore($responsiveStore);

  const handleClick = () => {
    const nav = document.getElementById('sectionNav');
    if (responsiveButton && !nav.classList.contains('hidden')) {
      $responsiveStore.set(false);
      nav.classList.add('hidden');
      nav.classList.remove('block');
    } else {
      $responsiveStore.set(true);
      nav.classList.add('block');
      nav.classList.remove('hidden');
    }
  };
  return (
    <button
      className="h-full w-20 flex justify-center items-center active:scale-90 transition duration-300 ease-in-out "
      onClick={handleClick}
      aria-label="Menu"
    >
      <IconsReact
        name="menu"
        css="h-12 w-12 z-50 fill-primario dark:fill-secundario"
      />
    </button>
  );
};
