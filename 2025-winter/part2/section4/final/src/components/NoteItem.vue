<template>
  <div class="collapse bg-base-100 border border-base-300">
    <input type="radio" name="my-accordion-1" defaultChecked />
    <div
      class="collapse-title font-semibold lg:text-4xl flex justify-between items-center pr-3"
    >
      {{ note.title }}

      <div class="flex gap-2 relative z-10 pointer-events-auto">
        <button
          class="btn btn-square btn-accent lg:btn-lg cursor-pointer"
          @click="openEditModal"
          aria-label="edit-button"
        >
          <PhPencilLine :size="24" weight="thin" />
        </button>
        <button
          @click.prevent="deleteNote(note.id)"
          class="btn btn-square btn-error lg:btn-lg"
          aria-label="delete-button"
        >
          <span v-if="isDeleting" class="loading loading-spinner"></span>
          <PhTrash v-else :size="24" weight="thin" />
        </button>
      </div>
    </div>

    <div class="collapse-content text-sm lg:text-lg">{{ note.content }}</div>
  </div>
</template>

<script setup lang="ts">
import { openModal } from '@/composables/model';
import { deleteNoteById } from '@/services/apiNote';
import { useNoteStore } from '@/stores/note';
import type { Note } from '@/types/Note';
import { PhPencilLine, PhTrash } from '@phosphor-icons/vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';

const { note } = defineProps<{
  note: Note;
}>();

const { note: noteStore } = storeToRefs(useNoteStore());
const toast = useToast();
const queryClient = useQueryClient();

const { mutate: deleteNote, isPending: isDeleting } = useMutation({
  mutationKey: ['deleteNote'],
  mutationFn: deleteNoteById,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notes'] });
    toast.success('Note deleted successfully');
  },
});

function openEditModal() {
  noteStore.value = note;
  openModal('my_modal_5');
}
</script>
