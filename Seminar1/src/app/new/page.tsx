"use client";

import { useRouter } from 'next/navigation';
import JournalForm from '@/components/journal-form';
import type { JournalEntry } from '@/lib/types';

export default function NewEntryPage() {
  const router = useRouter();

  const handleSaveEntry = (newEntry: JournalEntry) => {
    const savedEntries = localStorage.getItem('journalEntries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];
    const updatedEntries = [newEntry, ...entries];
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
    router.push('/');
  };

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          New Journal Entry
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          What's on your mind?
        </p>
      </header>
      
      <div className="space-y-16">
        <JournalForm onSave={handleSaveEntry} />
      </div>
    </main>
  );
}
