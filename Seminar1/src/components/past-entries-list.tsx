"use client";

import type { JournalEntry } from '@/lib/types';
import JournalEntryCard from './journal-entry-card';

interface PastEntriesListProps {
  entries: JournalEntry[];
}

export default function PastEntriesList({ entries }: PastEntriesListProps) {
  if (entries.length === 0) {
    return (
        <section className="text-center py-16 px-6 border-2 border-dashed rounded-xl bg-card">
            <h2 className="text-2xl font-headline font-bold mb-2">Past Entries</h2>
            <p className="text-muted-foreground">Your saved entries will appear here.</p>
        </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-headline font-bold mb-6">Past Entries</h2>
      <div className="space-y-6">
        {entries.map((entry) => (
          <div key={entry.id} className="animate-in fade-in-0 duration-500">
             <JournalEntryCard entry={entry} />
          </div>
        ))}
      </div>
    </section>
  );
}
