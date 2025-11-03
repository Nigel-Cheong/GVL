'use client';

import { useState, useEffect } from 'react';
import PastEntriesList from '@/components/past-entries-list';
import type { JournalEntry } from '@/lib/types';

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <header className="text-center mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
            Journal Summary
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A summary of all your journal entries.
          </p>
        </div>
      </header>
      
      <div className="space-y-16">
        <PastEntriesList entries={entries} />
      </div>
    </main>
  );
}
