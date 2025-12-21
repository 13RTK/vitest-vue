<template>
  <button
    @click="openCreateModal"
    class="btn btn-primary btn-circle btn-lg fixed bottom-6 right-6 shadow-xl z-50"
  >
    <PhPlus size="{52}" weight="thin" />
  </button>
</template>

<script setup lang="ts">
import { openModal } from '@/composables/model';
import { useNoteStore } from '@/stores/note';
import type { Note } from '@/types/Note';
import { storeToRefs } from 'pinia';
import { PhPlus } from '@phosphor-icons/vue';

const { note } = storeToRefs(useNoteStore());

function openCreateModal() {
  // Set default values for a new note
  note.value = {
    id: 999,
    title: 'Example Title',
    content: 'Example Content',
  } as Note;
  openModal('my_modal_5');
}
</script>
