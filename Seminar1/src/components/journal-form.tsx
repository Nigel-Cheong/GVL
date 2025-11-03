'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, ChangeEvent } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { createJournalEntry } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import type { JournalEntry } from '@/lib/types';
import { Save, Loader2, ImagePlus } from 'lucide-react';

const formSchema = z.object({
  entry: z.string().min(10, { message: 'Your entry should be at least 10 characters long.' }),
  images: z.custom<FileList>().optional(),
});

interface JournalFormProps {
  onSave: (entry: JournalEntry) => void;
}

export default function JournalForm({ onSave }: JournalFormProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entry: '',
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPreviews: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result as string);
          if (newPreviews.length === files.length) {
            setImagePreviews(newPreviews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true);
    try {
      const imageUrls: string[] = [];
      if (values.images) {
        for (const file of Array.from(values.images)) {
            const arrayBuffer = await file.arrayBuffer();
            const base64 = Buffer.from(arrayBuffer).toString('base64');
            const dataUrl = `data:${file.type};base64,${base64}`;
            imageUrls.push(dataUrl);
        }
      }

      const newEntry = await createJournalEntry(values.entry);
      const entryWithImages: JournalEntry = {
        ...newEntry,
        images: imageUrls
      };

      onSave(entryWithImages);
      form.reset();
      setImagePreviews([]);
    } catch (error) {
      console.error('Failed to save entry:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze and save your entry. Please try again.',
        variant: 'destructive',
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <ImagePlus className="h-5 w-5" />
                    <span>Add Images</span>
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleImageChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {imagePreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative">
                  <img src={src} alt={`Preview ${index + 1}`} className="rounded-md object-cover w-full h-full" />
                </div>
              ))}
            </div>
          )}

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
