export const LanguageSwitcher = ({ lang }: { lang: 'es' | 'en' }) => {
  return (
    <div className="flex gap-2">
      <a href="/">
        <small
          className={`${
            lang === 'en' ? 'text-indigo-700' : 'text-slate-700'
          } text-xs`}
        >
          English
        </small>
      </a>
      <a href="/es">
        <small
          className={`${
            lang === 'es' ? 'text-indigo-700' : 'text-slate-700'
          } text-xs`}
        >
          Español
        </small>
      </a>
    </div>
  );
};
