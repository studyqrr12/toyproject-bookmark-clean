import { reactive, ref, type Reactive, type Ref } from 'vue'
import type { Node } from './fileSelect'

export function initContextMenu() {
  //
  //   const visible = ref<boolean>(false)
  //   const items = ref([
  //     { text: 'a', event: 'A' },
  //     { text: 'b', event: 'B' },
  //     { text: 'c', event: 'C' }
  //   ])
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

export const dirItem = [
  { text: '하위 중복제거', event: 'dir-remove-child' },
  { text: '링크만 유지', event: 'dir-only-link' },
  { text: '이름 바꾸기', event: 'dir-rename' },
  { text: '이동', event: 'dir-move' },
  { text: '삭제', event: 'dir-remove' }
]

export const lnkItem = [
  { text: '편집', event: 'lnk-edit' },
  { text: '이동', event: 'lnk-move' },
  { text: '삭제', event: 'lnk-remove' }
]

export function clickContextMenu(
  getTargetCallback: () => {
    target: Node | null | undefined
    eventName: mixItemKeyType
  }
) {
  const opt = getTargetCallback()
  const { target, eventName } = opt

  // console.log(eventName, target)

  switch (eventName) {
    case 'dir-remove':
    case 'lnk-remove':
      target?.remove()
      break
    case 'dir-move':
    case 'lnk-move':
      break

    case 'dir-rename':
    case 'lnk-edit':
      break
  }

  // console.log(eventName, target)

  // if (target?.type === 'lnk') {
  //
  // }

  // if (target?.type === 'dir') {
  //
  // }
}
