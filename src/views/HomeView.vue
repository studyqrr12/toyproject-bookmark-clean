<script setup lang="ts">
import VButton from '../components/VButton.vue';
import VListItem from '../components/VListItem.vue';
import VContextMenu from '../components/VContextMenu.vue';
import VMoveModal from '../components/VMoveModal.vue';
import VEditModal from '../components/VEditModal.vue';
import { createBookmarkListData, createContextMenuData, createEditModalData, createMoveModalData } from '@/data/data';
import { Node, initFileSelector, readFile, xmlToNodes } from '@/data/fileSelect';

const { visible: editModalVisible, text: editModalText, link: editModalLink, initValues: initEditModalValues, updateVisible: updateEditModalVisible, updateText: updateEditModalText, updateLink: updateEditModalLink } = createEditModalData();
const { visible: moveModalVisible, items: moveModalItems, initValues: initMoveModalValues, updateVisible: updateMoveModalVisible, updateItems: updateMoveModalItems } = createMoveModalData();
const { visible: contentMenuVisible, items: contentMenuItems, updateVisible: updateContextMenuVisible } = createContextMenuData();
const { items: listItems } = createBookmarkListData();

/** 북마크간 병합할 최상위 노드 */
let root: Node | null = null;

/** 리스트를 구성할 노드(루트 뿐 아니라 하위 디렉토리도 가능) */
let target: Node | null = null;

const { ref: fileRef, trigger: selectFile } = initFileSelector({
  select: (files: FileList, cb: () => void) => {
    Array.from(files).forEach(file => readFile(file, ((text: string) => {
      const _root = xmlToNodes(text);

      // 한번 북마크 트리가 생성된 이후로는 병합을 시도합니다
      if (root == null) {
        root = _root
        target = _root;
      } else {
        root.merge(_root);
      }

      cb();

      //TODO: 리스트 업데이트
    })));
  }
})

// updateContextMenuVisible(true);
// updateMoveModalVisible(true);
// updateEditModalVisible(true);

</script>

<template>
  <div class="container">
    <input type="file" class="hidden" ref="fileRef" accept=".html, .xml" multiple>
    <VButton @click="selectFile">파일 추가</VButton>
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
.hidden {
  display: none;
}

.mt-2 {
  margin-top: .5rem !important;
}
</style>