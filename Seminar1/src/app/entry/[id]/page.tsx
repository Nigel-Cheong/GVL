'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { JournalEntry } from '@/lib/types';

export default function EntryDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState<JournalEntry | null>(null);

  useEffect(() => {
    if (id) {
      console.log('ID from URL:', id);
      const savedEntries = localStorage.getItem('journalEntries');
      console.log('Saved Entries from localStorage:', savedEntries);
      if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        console.log('Parsed Entries:', entries);
        const decodedId = decodeURIComponent(Array.isArray(id) ? id[0] : id);
        console.log('Decoded ID:', decodedId);
        const currentEntry = entries.find((e: JournalEntry) => e.id === decodedId);
        console.log('Found Entry:', currentEntry);
        setEntry(currentEntry);
      }
    }
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  const date = new Date(entry.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <main className="container mx-auto max-w-3xl py-12 px-4">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">{date}</h1>
        <p className="mt-2 text-lg text-muted-foreground capitalize">Mood: {entry.sentiment}</p>
      </header>
      <div className="prose prose-lg dark:prose-invert">
        <p>{entry.text}</p>
        {entry.images && entry.images.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {entry.images.map((image, index) => (
              <img key={index} src={image} alt={`Journal image ${index + 1}`} className="rounded-lg" />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
