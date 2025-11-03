"use server";

import { analyzeJournalEntrySentiment } from "@/ai/flows/analyze-journal-entry-sentiment";
import type { JournalEntry } from "@/lib/types";

export async function createJournalEntry(entryText: string): Promise<JournalEntry> {
  const sentimentResult = await analyzeJournalEntrySentiment({
    journalEntry: entryText,
  });

  const newEntry: JournalEntry = {
    id: new Date().toISOString(), // simple unique ID for client-side
    text: entryText,
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    sentiment: sentimentResult.primaryEmotion,
  };

  return newEntry;
}
