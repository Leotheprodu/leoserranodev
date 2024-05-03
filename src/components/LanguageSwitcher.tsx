import { useStore } from '@nanostores/react';
import { $languageStore } from '../stores/store';

export const LanguageSwitcher = () => {
    const lang = useStore($languageStore);
    const checked = lang === 'en';
    const handleChageLang = () => {
        $languageStore.set(checked ? 'es' : 'en');
    };
    return (
        <div>
            <input
                checked={checked}
                onChange={handleChageLang}
                type="checkbox"
                name="lang"
                id="langCheck"
                className="peer hidden"
            />
            <label className="peer-checked:bg-red-600" htmlFor="langCheck">
                {' '}
                {lang === 'en' ? 'EN' : 'ES'}
            </label>
        </div>
    );
};
