<template>
  <NoteListSkeleton v-if="isLoading" />

  <ErrorAlert v-if="isError">{{ error?.message }}</ErrorAlert>

  <main>
    <NoteItem v-if="isSuccess" v-for="note in notes" :key="note.id" :note />
    <EditModal v-if="isSuccess" />
  </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';

import { getNotes } from '@/services/apiNote';

import ErrorAlert from './ErrorAlert.vue';
import NoteItem from './NoteItem.vue';
import EditModal from './EditModal.vue';
import NoteListSkeleton from './NoteListSkeleton.vue';

const {
  data: notes,
  isLoading,
  isError,
  isSuccess,
  error,
} = useQuery({
  queryKey: ['notes'],
  queryFn: getNotes,
});
</script>
