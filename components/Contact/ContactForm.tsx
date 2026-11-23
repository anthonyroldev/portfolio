"use client";

import { useState, type ReactElement } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod/mini";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type ContactDictionary = Dictionary["contact"];

function createContactSchema(messages: ContactDictionary["validation"]) {
    return z.object({
        name: z.string().check(z.trim(), z.minLength(2, { error: messages.name })),
        email: z.string().check(z.trim(), z.email({ error: messages.email })),
        subject: z.string().check(z.trim(), z.minLength(2, { error: messages.subject })),
        message: z.string().check(z.trim(), z.minLength(10, { error: messages.message })),
    });
}

type ContactFields = z.infer<ReturnType<typeof createContactSchema>>;

function ContactControl({ children }: { children: ReactElement }) {
    const { error, formMessageId } = useFormField();
    return <FormControl aria-describedby={error ? formMessageId : undefined}>{children}</FormControl>;
}

export default function ContactForm({ dictionary }: { dictionary: ContactDictionary }) {
    const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
    const form = useForm<ContactFields>({
        resolver: zodResolver(createContactSchema(dictionary.validation)),
        defaultValues: { name: "", email: "", subject: "", message: "" },
    });
    const { isSubmitting } = form.formState;

    async function onSubmit(fields: ContactFields) {
        setFeedback(null);
        try {
            const { default: emailjs } = await import("@emailjs/browser");
            await emailjs.send(
                "service_jbsrx8t",
                "template_2wx9hct",
                fields,
                { publicKey: "lOg8roE8f-2e-UJVP" },
            );
            form.reset();
            setFeedback("success");
        } catch {
            setFeedback("error");
        }
    }

    const inputClass = "h-11 rounded-lg border-input bg-background text-base shadow-none md:text-base aria-invalid:border-destructive";

    return (
        <Form {...form}>
            <p id="contact-required" className="mb-4 text-sm text-muted-foreground">{dictionary.required}</p>
            <form
                noValidate
                aria-busy={isSubmitting}
                aria-describedby="contact-required"
                onSubmit={isSubmitting ? (event) => event.preventDefault() : form.handleSubmit(onSubmit, () => setFeedback(null))}
                className="space-y-4"
            >
                <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.name}</FormLabel>
                                <ContactControl>
                                    <Input {...field} autoComplete="name" required className={inputClass} />
                                </ContactControl>
                                <FormMessage className="text-label" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{dictionary.fields.email}</FormLabel>
                                <ContactControl>
                                    <Input {...field} type="email" autoComplete="email" required className={inputClass} />
                                </ContactControl>
                                <FormMessage className="text-label" />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.fields.subject}</FormLabel>
                            <ContactControl>
                                <Input {...field} required className={inputClass} />
                            </ContactControl>
                            <FormMessage className="text-label" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{dictionary.fields.message}</FormLabel>
                            <ContactControl>
                                <Textarea
                                    {...field}
                                    required
                                    className="min-h-28 rounded-lg border-input bg-background text-base shadow-none md:text-base aria-invalid:border-destructive"
                                />
                            </ContactControl>
                            <FormMessage className="text-label" />
                        </FormItem>
                    )}
                />
                <Button type="submit" aria-disabled={isSubmitting} className="h-11 shadow-none aria-disabled:opacity-70">
                    {dictionary.submit}
                </Button>
            </form>
            <p
                role="status"
                className={cn("mt-3 min-h-6 text-sm", feedback === "error" ? "text-destructive" : "text-muted-foreground")}
            >
                {isSubmitting ? dictionary.loading : feedback && dictionary[feedback]}
            </p>
        </Form>
    );
}
