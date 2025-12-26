"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { getLinks } from "@/datas/links"
import emailjs from '@emailjs/browser'
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { useState } from "react"
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
    const links = getLinks();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    })

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
        <section className="py-10 md:py-16">
            <h1 className="text-3xxl md:text-4xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Un message ?
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full lg:w-2/3 space-y-6 mt-8 p-6 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg bg-white dark:bg-slate-900"
                >
                    {success && (
                        <div role="alert" className="flex items-center gap-3 p-4 rounded-lg bg-green-500/20 border border-green-500 text-green-600 dark:text-green-400">
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
                                    <Input placeholder="Ton nom" {...field} autoComplete="name" />
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
                                    <Input type="email" placeholder="email@email.com" {...field} autoComplete="email" />
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
                                <FormLabel>Sujet</FormLabel>
                                <FormControl>
                                    <Input placeholder="Sujet du message" {...field} autoComplete="off" />
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
                                    <Textarea 
                                        placeholder="Ton message . . ." 
                                        className="min-h-30"
                                        autoComplete="off"
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                            <span>Envoi en cours...</span>
                        </div>
                    ) : (
                        <Button 
                            type="submit" 
                            className="w-full sm:w-auto cursor-pointer bg-linear-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-semibold shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                        >
                            Envoyer
                        </Button>
                    )}
                </form>
                {error && (
                    <p className="text-red-500 mt-4">
                        Une erreur est survenue, veuillez réessayer plus tard.
                    </p>
                )}
            </Form>
            
            <div className="mt-16">
                <h2 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-8">
                    Liens utiles
                </h2>
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {links.map((link, key) => (
                        <a
                            key={key}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 md:gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 
                            bg-white dark:bg-slate-900 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:border-accent 
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                        >
                            <Image
                                src={link.icon}
                                width={32}
                                height={32}
                                alt={link.name}
                                className="w-8 h-8 md:w-10 md:h-10"
                            />
                            <span className="text-base md:text-lg font-medium">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}

