import { http, HttpResponse } from 'msw';
import { notes } from './collections/note';
import { generateNote } from './utils/note';
import type { Note } from '@/types/Note';

const API_URL = import.meta.env.VITE_API_URL;

await notes.createMany(10, (idx: number) => {
  return generateNote(idx + 1);
});

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(notes.all());
  }),

  http.delete<{ id: string }>(`${API_URL}/:id`, ({ params }) => {
    const { id } = params;

    const deletedNote = notes.delete((q) => q.where({ id: Number(id) }));

    return HttpResponse.json(deletedNote);
  }),

  http.post(API_URL, async ({ request }) => {
    const newNote = await request.clone().json(); // Post

    const createdNote = await notes.create(newNote as Note);

    return HttpResponse.json(createdNote);
  }),
];
