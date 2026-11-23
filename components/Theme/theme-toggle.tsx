"use client";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ModeToggle({ labels }: { labels: Dictionary["theme"] }) {
    const { theme, setTheme } = useTheme();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    aria-label={labels.toggle}
                    className="h-11 px-2 shadow-none hover:bg-card hover:text-foreground md:px-3"
                >
                    {labels.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border shadow-none duration-150">
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light" className="min-h-11">{labels.light}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark" className="min-h-11">{labels.dark}</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system" className="min-h-11">{labels.system}</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
