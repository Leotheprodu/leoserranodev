export const LanguageSwitcher = ({ lang }: { lang: 'es' | 'en' }) => {
  return (
    <div className="flex gap-2">
      <a href="/">
        <small
          className={`${lang === 'en' ? 'opacity-100' : 'opacity-50'} text-xs`}
        >
          English
        </small>
      </a>
      <a href="/es">
        <small
          className={`${lang === 'es' ? 'opacity-100' : 'opacity-50'} text-xs`}
        >
          Español
        </small>
      </a>
    </div>
  );
};
