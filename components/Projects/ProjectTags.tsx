import { Badge } from "@/components/ui/badge";

export default function ProjectTags({ tags }: { tags: string[] }) {
    return (
        <ul className="mt-4 flex flex-wrap gap-2" role="list">
            {tags.map((tag) => (
                <li key={tag}>
                    <Badge variant="outline" className="border-border">
                        <span className="font-mono text-label font-normal text-muted-foreground">{tag}</span>
                    </Badge>
                </li>
            ))}
        </ul>
    );
}
