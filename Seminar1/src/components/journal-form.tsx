"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createJournalEntry } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { JournalEntry } from '@/lib/types';
import { Save, Loader2 } from 'lucide-react';

const formSchema = z.object({
  entry: z.string().min(10, { message: "Your entry should be at least 10 characters long." }),
});

interface JournalFormProps {
  onSave: (entry: JournalEntry) => void;
}

export default function JournalForm({ onSave }: JournalFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    try {
      const newEntry = await createJournalEntry(values.entry);
      onSave(newEntry);
      form.reset();
    } catch (error) {
      console.error("Failed to save entry:", error);
      toast({
        title: "Error",
        description: "Failed to analyze and save your entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="entry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">New Journal Entry</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your day..."
                    className="min-h-[200px] text-base"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Entry
              </>
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
}
