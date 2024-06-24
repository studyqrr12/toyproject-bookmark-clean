import { reactive, ref, type Reactive, type Ref } from 'vue'

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
