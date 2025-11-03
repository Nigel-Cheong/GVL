"use client";

import { useState } from 'react';
import JournalForm from '@/components/journal-form';
import PastEntriesList from '@/components/past-entries-list';
import type { JournalEntry } from '@/lib/types';

export default function Home() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const handleSaveEntry = (newEntry: JournalEntry) => {
    setEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          My AI Journal
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Capture your thoughts and let AI discover the emotions within.
        </p>
      </header>
      
      <div className="space-y-16">
        <JournalForm onSave={handleSaveEntry} />
        <PastEntriesList entries={entries} />
      </div>
    </main>
  );
}
