export default function Footer({ label }: { label: string }) {
    return (
        <footer className="border-t border-border">
            <p className="mx-auto max-w-275 px-4 py-6 text-sm text-muted-foreground md:px-8">{label}</p>
        </footer>
    );
}
