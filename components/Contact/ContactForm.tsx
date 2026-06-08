"use client";

import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ContactLink {
    name: string;
    url: string;
    icon: string;
}

interface ContactFormProps {
    dictionary: {
        title: string;
        success: string;
        loading: string;
        submit: string;
        error: string;
        linksTitle: string;
        fields: {
            name: string;
            email: string;
            subject: string;
            message: string;
        };
        placeholders: {
            name: string;
            email: string;
            subject: string;
            message: string;
        };
        validation: {
            name: string;
            email: string;
            subject: string;
            message: string;
        };
    };
    links: ContactLink[];
}

function createContactSchema(messages: ContactFormProps["dictionary"]["validation"]) {
    return z.object({
        name: z.string().min(2, {
            message: messages.name,
        }),
        email: z.string().email({
            message: messages.email,
        }),
        subject: z.string().min(2, {
            message: messages.subject,
        }),
        message: z.string().min(10, {
            message: messages.message,
        }),
    });
}

export default function ContactForm({ dictionary, links }: ContactFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const formSchema = createContactSchema(dictionary.validation);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
    });

    function onSubmit() {
        setLoading(true);

        emailjs
            .send(
                "service_jbsrx8t",
                "template_2wx9hct",
                form.getValues(),
                { publicKey: "lOg8roE8f-2e-UJVP" },
            )
            .then(
                () => {
                    setLoading(false);
                    setError(false);
                    setSuccess(true);
                    form.reset();
                },
                () => {
                    setError(true);
                    setLoading(false);
                    setSuccess(false);
                },
            );
    }

    return (
        <section className="py-10 md:py-16">
            <h1 className="bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent dark:from-green-400 dark:to-blue-500 md:text-4xl">
                {dictionary.title}
            </h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="mt-8 w-full space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-slate-900 md:p-10 lg:w-2/3"
                >
                    {success && (
                        <div
                            role="alert"
                            className="flex items-center gap-3 rounded-lg border border-green-500 bg-green-500/20 p-4 text-green-600 dark:text-green-400"
                        >
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
                            <span>{dictionary.success}</span>
                        </div>
                    )}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.name}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={dictionary.placeholders.name}
                                        autoComplete="name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.email}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder={dictionary.placeholders.email}
                                        autoComplete="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.subject}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder={dictionary.placeholders.subject}
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.message}</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder={dictionary.placeholders.message}
                                        className="min-h-30"
                                        autoComplete="off"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span>{dictionary.loading}</span>
                        </div>
                    ) : (
                        <Button
                            type="submit"
                            className="w-full cursor-pointer bg-linear-to-r from-green-400 to-blue-500 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:from-green-500 hover:to-blue-600 hover:shadow-lg sm:w-auto"
                        >
                            {dictionary.submit}
                        </Button>
                    )}
                </form>
                {error && <p className="mt-4 text-red-500">{dictionary.error}</p>}
            </Form>

            <div className="mt-16">
                <h2 className="mb-8 bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent dark:from-green-400 dark:to-blue-500 md:text-3xl">
                    {dictionary.linksTitle}
                </h2>
                <div className="flex flex-wrap gap-4 md:gap-6">
                    {links.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:scale-105 hover:border-accent hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 md:gap-4"
                        >
                            <Image
                                src={link.icon}
                                width={32}
                                height={32}
                                alt={link.name}
                                className={
                                    link.name === "GitHub"
                                        ? "h-8 w-8 dark:invert md:h-10 md:w-10"
                                        : "h-8 w-8 md:h-10 md:w-10"
                                }
                            />
                            <span className="text-base font-medium md:text-lg">{link.name}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
