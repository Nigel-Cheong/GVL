import type { JournalEntry } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  const date = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/entry/${entry.id}`} className="block h-full">
      <Card className="flex flex-col h-full overflow-hidden hover:bg-muted/50 cursor-pointer">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold tracking-tight">{date}</CardTitle>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-sm font-medium text-muted-foreground">Mood:</span>
            <Badge variant="secondary" className="capitalize text-sm">{entry.sentiment}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow pt-0">
          <p className="text-base text-foreground/80 leading-relaxed line-clamp-5">{entry.text}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
