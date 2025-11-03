'use client';

import type { JournalEntry } from '@/lib/types';
import JournalEntryCard from './journal-entry-card';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PastEntriesListProps {
  entries: JournalEntry[];
}

export default function PastEntriesList({ entries }: PastEntriesListProps) {
  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-6">Past Entries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/new">
          <Card className="hover:bg-muted/50 cursor-pointer h-full flex flex-col items-center justify-center text-center">
            <CardHeader>
              <CardTitle>New Entry</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                <p className="text-muted-foreground mt-2">Click here to create a new journal entry.</p>
            </CardContent>
          </Card>
        </Link>
        {entries.map((entry) => (
          <div key={entry.id} className="animate-in fade-in-0 duration-500">
            <JournalEntryCard entry={entry} />
          </div>
        ))}
      </div>
    </section>
  );
}
