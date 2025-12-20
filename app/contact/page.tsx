"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getLinks } from "@/datas/links"
import emailjs from '@emailjs/browser'
import { zodResolver } from "@hookform/resolvers/zod"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
        return theme === 'dark' ? "/icons/github-mark-white.png" : "/icons/github-mark.png";
    };

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setLoading(true)
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
        }, () => {
            setError(true)
            setLoading(false)
            setSuccess(false)
        })
    }

    return (
        <>
            <div className="p-8 min-h-screen md:ml-12">
                <h1 className="text-3xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Un message ?</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full md:w-2/3 space-y-6 mt-8 p-8 md:p-12 rounded-2xl border shadow-lg"
                    >
                        {success && (
                            <div role="alert" className="flex items-center gap-3 p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-500">
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
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                <span>Envoi en cours...</span>
                            </div>
                        ) : <Button type="submit">Envoyer</Button>}
                    </form>
                    {error && <p className="text-red-500">Une erreur est survenue, veuillez réessayer plus tard.</p>}
                </Form>
                <div className="mt-16">
                    <h2 className="text-2xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">Liens utiles</h2>
                    <div className="flex flex-wrap gap-6">
                        {links.map((link, key) => (
                            <a
                                key={key}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-blue-400"
                            >
                                <Image
                                    src={link.name === "GitHub" ? getGitHubIcon() : link.icon}
                                    width={40}
                                    height={40}
                                    alt={link.name}
                                />
                                <span className="text-lg font-medium">{link.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

