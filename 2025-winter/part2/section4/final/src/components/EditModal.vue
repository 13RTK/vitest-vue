<template>
  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box p-0 w-full shadow-2xl overflow-hidden">
      <!-- {/* Modal content */} -->
      <div class="card bg-base-100 shrink-0">
        <div class="card-body">
          <fieldset class="fieldset">
            <label class="label">Title</label>
            <input
              type="text"
              class="input w-full"
              placeholder="Enter the note title"
              v-model="title"
            />

            <div v-show="title.length > 35" class="label text-red-600">
              Limit 35 Characters
            </div>

            <label class="label">Content</label>
            <textarea
              class="textarea w-full"
              placeholder="Enter the note content"
              v-model="content"
            />
            <div v-show="content.length > 100" class="label text-red-600">
              Limit 100 Characters
            </div>

            <button class="btn btn-accent mt-4" @click.prevent="handleSubmit">
              <span v-if="isLoading" class="loading loading-spinner"></span>
              <span v-else>{{ isUpdate ? 'Update' : 'Add' }}</span>
            </button>
          </fieldset>
        </div>
      </div>

      <!-- {/* Modal actions */} -->
      <div class="modal-action">
        <form method="dialog">
          <!-- {/* if there is a button in form, it will close the modal */} -->
          <button
            class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-2xl"
          >
            ✕
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'vue-toastification';

import { closeModal } from '@/composables/model';
import { useNoteStore } from '@/stores/note';
import {
  updateNoteById,
  createNote as createNoteApi,
} from '@/services/apiNote';

import type { Note } from '@/types/Note';

const { note } = storeToRefs(useNoteStore());
const toast = useToast();
const queryClient = useQueryClient();

const title = ref<string>(note.value.title);
const content = ref<string>(note.value.content);

const isUpdate = computed(() => {
  return note.value.id !== 999;
});

watch(
  () => note.value,
  () => {
    title.value = note.value.title;
    content.value = note.value.content;
  }
);

const { mutate: updateNote, isPending: isUpdating } = useMutation({
  mutationKey: ['updateNote'],
  mutationFn: ({ id, note }: { id: number; note: Partial<Note> }) =>
    updateNoteById(id, note),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    closeModal('my_modal_5');
    toast.success('Note updated successfully');
  },
});

const { mutate: createNote, isPending: isCreating } = useMutation({
  mutationKey: ['createNote'],
  mutationFn: createNoteApi,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    closeModal('my_modal_5');
    toast.success('Note created successfully');
  },
});

function handleSubmit() {
  if (isUpdate.value) {
    const updatedNote = {
      id: note.value.id,
      note: {
        title: title.value,
        content: content.value,
      },
    };

    updateNote(updatedNote);
  } else {
    createNote({
      title: title.value,
      content: content.value,
    });
  }
}

const isLoading = computed(() => isUpdating.value || isCreating.value);
</script>

<style scoped></style>
