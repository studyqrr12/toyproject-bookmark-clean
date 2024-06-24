<script setup lang="ts">
import { initContextMenu } from '@/data/contextMenu';
import { createBookmarkListData, createEditModalData, createMoveModalData } from '@/data/data';
import { Node, initFileSelector, readFile, saveFile, xmlToNodes } from '@/data/fileSelect';
import VButton from '../components/VButton.vue';
import VContextMenu from '../components/VContextMenu.vue';
import VEditModal from '../components/VEditModal.vue';
import VListItem from '../components/VListItem.vue';
import VMoveModal from '../components/VMoveModal.vue';

const { visible: editModalVisible, text: editModalText, link: editModalLink, initValues: initEditModalValues, updateVisible: updateEditModalVisible, updateText: updateEditModalText, updateLink: updateEditModalLink } = createEditModalData();
const { visible: moveModalVisible, items: moveModalItems, initValues: initMoveModalValues, updateVisible: updateMoveModalVisible, updateItems: updateMoveModalItems } = createMoveModalData();

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

      if (target) {
        listItems.value = [...target.children as Array<Node>];
      }

      cb(); //다시 파일을 선택 할 수 있도록 value 값을 비웁니다

    })));
  }
})

/** 상위 노드로 이동하여 목록을 다시 생성 합니다 */
function topDirectoryMove() {
  if (target?.parent) {
    target = target?.parent;
    listItems.value = [...target.children as Array<Node>];
  }
}

/** 하위 노드로 이동하여 목록을 다시 생성 합니다 */
function subDirectoryMove(item: Node) {
  if (item.type === 'dir' || item.type == 'root') {
    target = item;
    if (target) {
      listItems.value = [...target.children as Array<Node>];
    }
  }
}

const { contextMenuItems, contextMenuView, updateContextMenuVisible, updateContextMenuView } = initContextMenu();

// updateContextMenuVisible(true);
// updateMoveModalVisible(true);
// updateEditModalVisible(true);

function openContextMenu(ev: MouseEvent, node: Node) {
  const { clientX, clientY } = ev;

  updateContextMenuView({
    visible: true,
    x: clientX,
    y: clientY,
    targetId: node.id,
    items: [
      { text: 'a', event: 'A' },
      { text: 'b', event: 'B' },
      { text: 'c', event: 'C' },
    ]
  });
}

function clickContextMenu(ev: MouseEvent, eventName: string, targetId?: number) {
  console.log({ eventName, targetId });
}

</script>

<template>
  <div class="container">
    <input type="file" class="hidden" ref="fileRef" accept=".html, .xml" multiple>
    <VButton @click="selectFile">파일 추가</VButton>
    <VButton @click="saveFile(root)">파일 저장</VButton>

    <div class="mt-2">
      <VListItem @click="topDirectoryMove">...</VListItem>
      <VListItem v-for="itme in listItems" :key="itme.id" @click="subDirectoryMove(itme)"
        @contextmenu="ev => openContextMenu(ev, itme)">{ {{ itme.type }} } {{
          itme.text }}
      </VListItem>
    </div>
    <VContextMenu :visible="contextMenuView.visible" :view="contextMenuView" :items="contextMenuItems"
      @update:visible="updateContextMenuVisible" @click="clickContextMenu" />
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