<script setup lang="ts">
import VButton from '../components/VButton.vue';
import VListItem from '../components/VListItem.vue';
import VContextMenu from '../components/VContextMenu.vue';
import VMoveModal from '../components/VMoveModal.vue';
import VEditModal from '../components/VEditModal.vue';
import { ref } from 'vue';

const contentMenuItems = ref([
  { text: 'a', event: 'A' },
  { text: 'b', event: 'B' },
  { text: 'c', event: 'C' }
]);

const listItems = ref([
  { id: 1, text: "List 1" },
  { id: 2, text: "List 2" },
  { id: 3, text: "List 3" }
]);

const modalitems = ref([
  { text: 'AA', event: 'A' },
  { text: 'BB', event: 'B' },
  { text: 'CC', event: 'C' }
]);

</script>

<template>
  <div class="container">
    <VButton>파일 추가</VButton>
    <VButton>파일 저장</VButton>

    <div class="mt-2">
      <VListItem v-for="itme in listItems" :key="itme.id">{{ itme.text }}</VListItem>
    </div>
    <VContextMenu :items="contentMenuItems" />
    <VMoveModal :visible="true" :items="modalitems" />
    <VEditModal :visible="true" />
  </div>
</template>

<style scoped>
.mt-2 {
  margin-top: .5rem !important;
}
</style>