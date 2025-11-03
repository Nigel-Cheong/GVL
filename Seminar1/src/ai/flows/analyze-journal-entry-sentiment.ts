'use server';
/**
 * @fileOverview This file defines a Genkit flow for analyzing the sentiment of a journal entry.
 *
 * analyzeJournalEntrySentiment - Analyzes the sentiment of a journal entry and returns the primary emotion.
 * AnalyzeJournalEntrySentimentInput - The input type for the analyzeJournalEntrySentiment function.
 * AnalyzeJournalEntrySentimentOutput - The return type for the analyzeJournalEntrySentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeJournalEntrySentimentInputSchema = z.object({
  journalEntry: z
    .string()
    .describe('The journal entry to analyze for sentiment.'),
});
export type AnalyzeJournalEntrySentimentInput = z.infer<
  typeof AnalyzeJournalEntrySentimentInputSchema
>;

const AnalyzeJournalEntrySentimentOutputSchema = z.object({
  primaryEmotion: z
    .string()
    .describe(
      'The primary emotion expressed in the journal entry (e.g., joy, sadness, anger, fear, surprise, neutral). Limit to one or two words.'
    ),
});
export type AnalyzeJournalEntrySentimentOutput = z.infer<
  typeof AnalyzeJournalEntrySentimentOutputSchema
>;

export async function analyzeJournalEntrySentiment(
  input: AnalyzeJournalEntrySentimentInput
): Promise<AnalyzeJournalEntrySentimentOutput> {
  return analyzeJournalEntrySentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJournalEntrySentimentPrompt',
  input: {schema: AnalyzeJournalEntrySentimentInputSchema},
  output: {schema: AnalyzeJournalEntrySentimentOutputSchema},
  prompt: `Analyze the following journal entry and identify the primary emotion expressed in it. Respond with only the emotion.

Journal Entry: {{{journalEntry}}}

Primary Emotion:`,
});

const analyzeJournalEntrySentimentFlow = ai.defineFlow(
  {
    name: 'analyzeJournalEntrySentimentFlow',
    inputSchema: AnalyzeJournalEntrySentimentInputSchema,
    outputSchema: AnalyzeJournalEntrySentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
