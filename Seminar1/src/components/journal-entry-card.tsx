import type { JournalEntry } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays } from 'lucide-react';

interface JournalEntryCardProps {
  entry: JournalEntry;
}

export default function JournalEntryCard({ entry }: JournalEntryCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-medium text-muted-foreground">
          <CalendarDays className="h-5 w-5" />
          <span>{entry.date}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 whitespace-pre-wrap">{entry.text}</p>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 bg-muted/50 p-4">
        <h3 className="text-sm font-semibold">How I felt today:</h3>
        <Badge variant="secondary" className="text-base font-normal capitalize">
          {entry.sentiment}
        </Badge>
      </CardFooter>
    </Card>
  );
}
