import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold">404</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-4">Tu t&#39;es perdu</p>
            <Button asChild className="mt-8">
                <Link href="/">
                    Retourner à l&#39;accueil
                </Link>
            </Button>
        </div>
    )
}