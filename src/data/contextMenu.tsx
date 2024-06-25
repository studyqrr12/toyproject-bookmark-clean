import VContextMenu from '../components/VContextMenu.vue'

import { reactive, ref, type Reactive, type Ref } from 'vue'
import type { Node } from './fileSelect'

export function initContextMenu() {
  const contextMenuView: Reactive<{ [name: string]: any }> = reactive({
    visible: false,
    x: 0,
    y: 0,
    targetId: null
  })

  const contextMenuItems: Ref<Array<any>> = ref([])

  const updateContextMenuVisible = (value: boolean) => {
    contextMenuView.visible = value
  }

  const updateContextMenuView = (value: any) => {
    Object.entries(value).forEach((item) => {
      const [key, value] = item

      if (key == 'items') {
        contextMenuItems.value = value as Array<any>
      } else {
        contextMenuView[key] = value
      }
    })
  }

  return { contextMenuView, contextMenuItems, updateContextMenuVisible, updateContextMenuView }
}

export const dirItemObj = {
  'dir-remove-child': '하위 중복제거',
  'dir-only-link': '링크만 유지',
  'dir-rename': '이름 바꾸기',
  'dir-move': '이동',
  'dir-remove': '삭제'
}

export const lnkItemObj = {
  'lnk-edit': '편집',
  'lnk-move': '이동',
  'lnk-remove': '삭제'
}

type dirItemKeyType = keyof typeof dirItemObj
type lnkItemKeyType = keyof typeof lnkItemObj
export type mixItemKeyType = dirItemKeyType | lnkItemKeyType

export const dirItem = Object.entries(dirItemObj).map((item) => ({ event: item[0], text: item[1] }))
export const lnkItem = Object.entries(lnkItemObj).map((item) => ({ event: item[0], text: item[1] }))

interface ClickContextMenuParam {
  getTarget: () => { target: Node | null | undefined; eventName: mixItemKeyType }
  updateList: () => void
  openMoveModal: (cb: (target: Node) => void) => void
}

export function clickContextMenu(param: ClickContextMenuParam) {
  const { getTarget, updateList, openMoveModal } = param

  const { target, eventName } = getTarget()

  switch (eventName) {
    case 'dir-remove':
    case 'lnk-remove':
      target?.remove()
      break
    case 'dir-move':
    case 'lnk-move':
      openMoveModal((item) => {
        console.log('openMoveModal', item)
      })
      break

    case 'dir-rename':
    case 'lnk-edit':
      break
  }

  updateList()
}

interface createClickContextMenuFnParam {
  getRoot: () => Node | null
  updateList: () => void
}

export function createClickContextMenuFn(param: createClickContextMenuFnParam) {
  const { getRoot, updateList } = param
  return function (ev: MouseEvent, eventName: string, targetId?: number) {
    const target = getRoot()?.findNodeById(targetId ?? 1, {})
    console.log(eventName, target)

    switch (eventName) {
      case 'dir-remove':
      case 'lnk-remove':
        target?.remove()
        break
      case 'dir-move':
      case 'lnk-move':
        // openMoveModal((item) => {
        //   console.log('openMoveModal', item)
        // })
        break

      case 'dir-rename':
      case 'lnk-edit':
        break
    }
    updateList()
  }
}

interface createOpenContextMenuFnParam {
  updateContextMenuView: (_: any) => void
}
export function createOpenContextMenuFn(param: createOpenContextMenuFnParam) {
  const { updateContextMenuView } = param
  return function (ev: MouseEvent, node: Node) {
    const { clientX, clientY } = ev
    updateContextMenuView({
      visible: true,
      x: clientX,
      y: clientY,
      targetId: node.id,
      items: node.type === 'lnk' ? lnkItem : dirItem
    })
  }
}

export { VContextMenu }
export default VContextMenu
