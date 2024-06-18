<script setup lang="ts">
import VButton from '../components/VButton.vue';
import VListItem from '../components/VListItem.vue';
import VContextMenu from '../components/VContextMenu.vue';
import VMoveModal from '../components/VMoveModal.vue';
import VEditModal from '../components/VEditModal.vue';
import { createBookmarkListData, createContextMenuData, createEditModalData, createMoveModalData } from '@/data/data';

const { visible: editModalVisible, text: editModalText, link: editModalLink, initValues: initEditModalValues, updateVisible: updateEditModalVisible, updateText: updateEditModalText, updateLink: updateEditModalLink } = createEditModalData();
const { visible: moveModalVisible, items: moveModalItems, initValues: initMoveModalValues, updateVisible: updateMoveModalVisible, updateItems: updateMoveModalItems } = createMoveModalData();
const { visible: contentMenuVisible, items: contentMenuItems, updateVisible: updateContextMenuVisible } = createContextMenuData();
const { items: listItems } = createBookmarkListData();

updateContextMenuVisible(true);
updateMoveModalVisible(true);
updateEditModalVisible(true);

</script>

<template>
  <div class="container">
    <VButton>파일 추가</VButton>
    <VButton>파일 저장</VButton>

    <div class="mt-2">
      <VListItem v-for="itme in listItems" :key="itme.id">{{ itme.text }}</VListItem>
    </div>
    <VContextMenu :visible="contentMenuVisible" :items="contentMenuItems" @update:visible="updateContextMenuVisible" />
    <VMoveModal :visible="moveModalVisible" :items="moveModalItems" @update:visible="updateMoveModalVisible" />
    <VEditModal :visible="editModalVisible" :text="editModalText" :link="editModalLink"
      @update:visible="updateEditModalVisible" @update:text="updateEditModalText" @update:link="updateEditModalLink" />
  </div>
</template>

<style scoped>
.mt-2 {
  margin-top: .5rem !important;
}
</style>