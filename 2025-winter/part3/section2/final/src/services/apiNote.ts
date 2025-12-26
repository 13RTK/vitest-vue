import type { Note } from '@/types/Note';

const API_URL = import.meta.env.VITE_API_URL;

export async function getNotes(): Promise<Note[] | undefined> {
  const response = await fetch(API_URL);

  return response.json();
}

export async function deleteNoteById(id: number): Promise<Note | undefined> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  return response.json();
}

export async function updateNoteById(
  id: number,
  note: Partial<Note>
): Promise<Note | undefined> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

  return response.json();
}

export async function createNote(
  note: Partial<Note>
): Promise<Note | undefined> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...note, id: Date.now() }),
  });

  return response.json();
}
