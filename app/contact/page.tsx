"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Button} from "@/components/ui/button"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import {getLinks} from "@/datas/links"
import Image from "next/image"
import emailjs from '@emailjs/browser';
import {useEffect, useState} from "react";
import {useTheme} from "next-themes";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Le nom doit contenir au moins 2 caractères.",
    }),
    email: z.string().email({
        message: "L'email n'est pas valide.",
    }),
    subject: z.string().min(2, {
        message: "Le sujet doit contenir au moins 2 caractères.",
    }),
    message: z.string().min(10, {
        message: "Le message doit contenir au moins 10 caractères.",
    }),
})


export default function Page() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [mounted, setMounted] = useState(false);
    const links = getLinks();
    const { theme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

    const getGitHubIcon = () => {
        if (!mounted) return "/icons/github-mark-white.png";
        console.log(theme);
        return theme === 'dark' ? "/icons/github-mark-white.png" : "/icons/github-mark.png";
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
        console.log(data)
        emailjs.send(
            'service_jbsrx8t',
            'template_2wx9hct',
            form.getValues(),
            {publicKey: 'lOg8roE8f-2e-UJVP'}
        ).then(() => {
            setLoading(false)
            setError(false)
            setSuccess(true)
            form.reset()
        }, (error) => {
            setError(true)
            setLoading(false)
            setSuccess(false)
            console.error(error);
        })
    }

    return (
        <>
            <div className="container mx-auto px-6 pt-10 pb-12 min-h-screen">
                <h1 className="text-3xl">Un message ?</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className={`w-full md:w-2/3 space-y-6 mt-8 p-12 rounded-lg shadow-md`}
                    >
                        {success && (
                            <div role="alert" className="alert alert-success">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>Votre message a bien été envoyé. Merci!</span>
                            </div>
                        )}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Nom</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ton nom" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="email@email.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Sujet du message" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Ton message . . ." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        {loading && (
                            <span className="loading loading-spinner loading-md"></span>
                        ) || <Button type="submit">Envoyer</Button>}
                    </form>
                    {error && <p className="text-red-500">Une erreur est survenue, veuillez réessayer plus tard.</p>}
                </Form>
                <div className="mt-32">
                    <h1 className="text-3xl">Liens utiles :</h1>
                    {links.map((link, key) => (
                        <div className="flex p-12" key={key}>
                            <Image
                                src={link.name === "GitHub" ? getGitHubIcon() : link.icon}
                                width={70}
                                height={70}
                                className={"inline-block"}
                                alt={link.name}
                            />
                            <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-5 mt-5 text-2xl text-blue-400"
                            >
                                {link.name}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

