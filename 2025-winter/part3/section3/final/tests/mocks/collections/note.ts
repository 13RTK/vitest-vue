import { Collection } from '@msw/data';
import z from 'zod';

export const notes = new Collection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
  }),
});
