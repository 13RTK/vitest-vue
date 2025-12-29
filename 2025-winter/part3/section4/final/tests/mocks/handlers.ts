import { http, HttpResponse } from 'msw';
import { notes } from './collections/note';
import { generateNote } from './utils/note';

const API_URL = import.meta.env.VITE_API_URL;

await notes.createMany(10, (idx: number) => {
  return generateNote(idx + 1);
});

export const handlers = [
  http.get(API_URL, () => {
    return HttpResponse.json(notes.all());
  }),
];
