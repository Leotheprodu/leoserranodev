import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import { IconsReact } from '@utils/IconsReact';
import { useTranslations } from '@/i18n/utils';

export function ContactForm({ lang }: { lang: 'es' | 'en' }) {
  const t = useTranslations(lang);
  const [formStatus, setFormStatus] = useState<string>('');
  const [statusenviado, setStatusEnviado] = useState<boolean>(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const captcha = useRef(null);

  const onChange = () => {
    if (captcha.current.getValue()) {
      setFormStatus('');
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setFormStatus(t('contact.form-formStatus-sending'));
    if (captcha.current.getValue()) {
      emailjs
        .send('service_51za005', 'template_n9buauj', form, 'hu1gXn4JXbvqONlBp')
        .then(
          function () {
            setFormStatus(t('contact.form-formStatus-sent'));
            setStatusEnviado(true);
          },
          function () {
            setFormStatus(t('contact.form-formStatus-error'));
          },
        );
    } else setFormStatus(t('contact.form-formStatus-verify'));
  };

  return (
    <>
      <div className=" max-w-[900px]">
        {!statusenviado && (
          <form
            className="shadow-xl flex flex-col gap-3 justify-center items-center w-full p-10 rounded-xl"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-1 w-full">
              <label className="" htmlFor="name">
                {t('contact.form-name')}
              </label>
              <input
                className="border-none rounded-sm shadow-md dark:bg-primario bg-secundario px-3 py-2"
                type="text"
                name="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="" htmlFor="email">
                {t('contact.form-email')}
              </label>
              <input
                className="border-none rounded-sm shadow-md dark:bg-primario bg-secundario px-3 py-2"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="" htmlFor="mensaje">
                {t('contact.form-message')}
              </label>
              <textarea
                className="border-none rounded-sm shadow-md dark:bg-primario bg-secundario px-3 py-2"
                required
                value={form.message}
                name="message"
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-3 rounded-md">
              <ReCAPTCHA
                ref={captcha}
                sitekey="6LdG60QoAAAAAN-hvEVxmJmjb4awhHq_sr58-duS"
                onChange={onChange}
              />
            </div>

            {formStatus && (
              <p className=" dark:text-red-300 text-red-600 p-4 rounded-md shadow-md mb-5">
                {formStatus}
              </p>
            )}

            <button
              className="bg-indigo-700 p-3 text-center text-neutral-100 rounded-lg w-32 uppercase hover:bg-indigo-950 transition-colors duration-300 ease-in-out"
              type="submit"
            >
              {t('contact.form-send')}
            </button>
          </form>
        )}
        {statusenviado && (
          <div className="flex items-center justify-center gap-4">
            <IconsReact name="sendEmail" css="w-20 h-20 fill-indigo-300" />
            <h2 className="text-2xl text-indigo-300">{formStatus}</h2>
          </div>
        )}
      </div>
    </>
  );
}
