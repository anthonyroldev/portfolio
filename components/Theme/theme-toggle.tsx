"use client";

import { Moon, Sun } from "lucide-react";
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
                    size="icon"
                    aria-label={labels.toggle}
                    className="relative size-9 rounded-lg shadow-none hover:bg-card hover:text-foreground [&>svg]:size-4"
                >
                    <Sun
                        aria-hidden="true"
                        data-icon="inline-start"
                        className="rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
                    />
                    <Moon
                        aria-hidden="true"
                        data-icon="inline-start"
                        className="absolute rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
                    />
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
