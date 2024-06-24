import { ref, type Ref } from 'vue'
import type { Node } from './fileSelect'

export function createEditModalData() {
  const visible = ref<boolean>(false)
  const text = ref<string>('')
  const link = ref<string>('')

  const updateVisible = (value: boolean) => (visible.value = value)
  const updateText = (value: string) => (text.value = value)
  const updateLink = (value: string) => (link.value = value)

  const initValues = (opt: { visible?: boolean; text?: string; link?: string } = {}) => {
    const { visible: _visible, text: _text, link: _link } = opt
    if (_visible != void 0) visible.value = _visible
    if (_text != void 0) text.value = _text
    if (_link != void 0) link.value = _link
  }

  return { visible, text, link, updateVisible, updateText, updateLink, initValues }
}

export function createMoveModalData() {
  const visible = ref<boolean>(false)
  const items = ref([])

  const updateVisible = (value: boolean) => (visible.value = value)
  const updateItems = (value: any) => (items.value = value)
  const initValues = (opt: { visible?: boolean; items?: any } = {}) => {
    const { visible: _visible, items: _items } = opt
    if (_visible != void 0) visible.value = _visible
    if (_items != void 0) items.value = _items
  }

  return { visible, items, updateVisible, updateItems, initValues }
}

export function createContextMenuData() {
  const visible = ref<boolean>(false)
  const items = ref([
    { text: 'a', event: 'A' },
    { text: 'b', event: 'B' },
    { text: 'c', event: 'C' }
  ])

  const updateVisible = (value: boolean) => (visible.value = value)
  const updateItems = (value: any) => (items.value = value)
  const initValues = (opt: { visible?: boolean; items?: any } = {}) => {
    const { visible: _visible, items: _items } = opt
    if (_visible != void 0) visible.value = _visible
    if (_items != void 0) items.value = _items
  }

  return { visible, items, updateVisible, updateItems, initValues }
}

export function createBookmarkListData() {
  const items: Ref<Array<Node>> = ref([])
  return { items }
}
