import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from 'emailjs-com';
import { IconsReact } from './IconsReact';

export function ContactForm() {
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
        setFormStatus('...Sending');
        if (captcha.current.getValue()) {
            emailjs
                .send(
                    'service_51za005',
                    'template_n9buauj',
                    form,
                    'hu1gXn4JXbvqONlBp',
                )
                .then(
                    function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                        setFormStatus('Message Sent!');
                        setStatusEnviado(true);
                    },
                    function (error) {
                        console.log('FAILED...', error);
                    },
                );

            /* console.log(conFom); */
        } else setFormStatus('Please verify that you are a human!');
    };

    return (
        <>
            <div className="mx-auto max-w-[900px]">
                {!statusenviado && (
                    <form
                        className="dark:bg-slate-800 shadow-xl flex flex-col gap-3 justify-center items-center w-full p-10 rounded-2xl"
                        onSubmit={onSubmit}
                    >
                        <div
                            className="flex flex-col gap-1 w-full"
                            data-te-input-wrapper-init
                        >
                            <label className="" htmlFor="nombre">
                                Name
                            </label>
                            <input
                                className="text-neutral-900 dark:text-neutral-200 border-none rounded dark:bg-slate-900 bg-slate-100 px-3 py-2 focus:outline-1 focus:outline-neutral-200 dark:focus:outline-none"
                                type="text"
                                required
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="text-neutral-900 dark:text-neutral-200 border-none rounded dark:bg-slate-900 bg-slate-100 px-3 py-2 focus:outline-1 focus:outline-neutral-200 dark:focus:outline-none"
                                type="email"
                                required
                                value={form.email}
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-1 w-full">
                            <label className="" htmlFor="mensaje">
                                Message
                            </label>
                            <textarea
                                className="text-neutral-900 dark:text-neutral-200 border-none rounded dark:bg-slate-900 bg-slate-100 px-3 py-2 focus:outline-1 focus:outline-neutral-200 dark:focus:outline-none"
                                required
                                value={form.message}
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
                            Send
                        </button>
                    </form>
                )}
                {statusenviado && (
                    <div className="flex items-center justify-center gap-4">
                        <IconsReact
                            name="sendEmail"
                            css="w-20 h-20 fill-indigo-300"
                        />
                        <h2 className="text-2xl text-indigo-300">
                            {formStatus}
                        </h2>
                    </div>
                )}
            </div>
        </>
    );
}
