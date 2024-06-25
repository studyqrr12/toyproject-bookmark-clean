import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

function isHtmlElement(obj: any): obj is HTMLElement {
  return obj != null && typeof obj.tagName === 'string'
}

function isHTMLInputelement(obj: any): obj is HTMLInputElement {
  return isHtmlElement(obj) && obj.tagName.toLowerCase() === 'input'
}

type InitFileSelectorParam = {
  select?: (files: FileList, cb: () => void) => void
}
export function initFileSelector(opt: InitFileSelectorParam = {}) {
  const _ref: Ref<any> = ref(null)

  const event = (e: Event): void => {
    const target = e.target
    if (isHTMLInputelement(target)) {
      const { files } = target

      const empty = () => {
        target.value = ''
      }

      if (opt.select && files != null && files.length) {
        opt.select(files, empty)
      }
    }
  }

  onMounted(() => {
    if (isHtmlElement(_ref.value)) {
      _ref.value.addEventListener('change', event)
    }
  })

  onBeforeUnmount(() => {
    if (isHtmlElement(_ref.value)) {
      _ref.value.removeEventListener('change', event)
    }
  })

  const trigger = () => {
    if (isHtmlElement(_ref.value)) {
      _ref.value.click()
    }
  }

  return { ref: _ref, trigger }
}

export function readFile(file: File, callback: (text: string) => void) {
  const reader = new FileReader()
  reader.readAsText(file)

  reader.addEventListener('load', function (e: ProgressEvent<FileReader>) {
    if (typeof e.target?.result === 'string') {
      callback(e.target?.result)
    } else {
      callback('')
    }
  })
}

export function saveFile(node: Node | null) {
  const header = [
    `<!DOCTYPE NETSCAPE-Bookmark-file-1>`,
    `<!-- This is an automatically generated file.`,
    `     It will be read and overwritten.`,
    `     DO NOT EDIT! -->`,
    `<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">`,
    `<TITLE>Bookmarks</TITLE>`,
    `<H1>Bookmarks</H1>`
  ].join('\n')

  if (node == null) node = new Node({ type: 'root' })

  const text = [header, node.toXML()].join('\n')

  const filename = 'bookmark_' + Date.now() + '.html'

  const blob = new Blob([text], {
    type: 'text/plain;charset=UTF-8'
  })

  const blobUrl = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = blobUrl
  link.download = filename
  link.click()
  link.remove()

  window.URL.revokeObjectURL(blobUrl)
  return text
}

const NodeIdSymbol = Symbol('NODE_ID')

type NodeConstructorOpt = { type?: 'root' | 'dir' | 'lnk'; raw?: string }
type NodeScope = { parent: NodeScope | null; children: Array<Node> | null }

declare class Node {
  constructor(opt: NodeConstructorOpt)
  id: number
  type: 'root' | 'dir' | 'lnk'
  parent: Node | null
  initScope: () => void
  parse: (raw?: string) => void
  append: (node: Node) => void
  remove: () => void
  merge: (node: Node) => void
  findNodeById: (
    id: number,
    opt: {
      children?: boolean
      parent?: boolean
    }
  ) => Node | null
  toJSON: () => any
  toXML: (depth?: number) => string
  toString: () => string;
  [Symbol.toStringTag]: string

  children: Array<Node> | null
  attribute?: { [key: string]: any }
  text?: string
}

export { Node }

function Node(this: Node, opt: NodeConstructorOpt) {
  this.id = Node[NodeIdSymbol] += 1

  this.initScope()
  this.parse(opt.raw)

  if (typeof opt.type === 'string') {
    this.type = opt.type
  }
}

Node[NodeIdSymbol] = 0
Node.prototype[Symbol.toStringTag] = 'Node'
Node.prototype.toJSON = function () {
  return Object.assign({}, this, { children: this.children })
}
Node.prototype.toXML = function (depth: number = 0): string {
  const tab = '    '
  const space = Array.from({ length: depth }).fill(tab).join('')

  if (this.type === 'root') {
    const prefix = space + '<DL><p>'
    const middle = (this.children ?? []).map((item: Node) => item.toXML(depth + 1)).join('\n')
    const suffix = space + '</DL><p>'
    return [prefix, middle, suffix].join('\n')
  }

  if (this.type === 'dir') {
    const attr = Object.entries(this.attribute ?? {})
      .map((item) => [item[0], `"${item[1]}"`].join('='))
      .join(' ')
    const head = `<DT><H3 ${attr}>북마크바</H3>`
    const open = '<DL><p>'
    const close = '</DL><p>'

    const middle = (this.children ?? []).map((item: Node) => item.toXML(depth + 1)).join('\n')

    return [space + head, space + open, middle, space + close].join('\n')
  }

  if (this.type === 'lnk') {
    const attr = Object.entries(this.attribute ?? {})
      .map((item) => [item[0], `"${item[1]}"`].join('='))
      .join(' ')

    return `${space}<DT><A ${attr}>${this.text ?? ''}</A>`
  }

  return space
}
Node.prototype.toString = function () {
  return JSON.stringify(this, null, 2)
}

Node.prototype.initScope = function () {
  const scope: NodeScope = { parent: null, children: null }

  Object.defineProperty(this, 'parent', {
    get: function () {
      return scope.parent
    },
    set: function (value) {
      scope.parent = value
      return this
    },
    enumerable: false,
    configurable: false
  })

  Object.defineProperty(this, 'children', {
    get: function () {
      return scope.children
    },
    set: function (value) {
      scope.children = value
      return this
    },
    enumerable: false,
    configurable: false
  })
}

Node.prototype.parse = function (raw?: string): Node {
  if (typeof raw !== 'string') {
    this.type = 'root'
    return this
  }

  if (raw.startsWith('<A ')) {
    //Anchor
    this.type = 'lnk'
  } else if (raw.startsWith('<H3 ')) {
    //Directory
    this.type = 'dir'
  }

  let text = raw

  const closeTag = text.substring(raw.lastIndexOf('</'), text.length)
  text = text.substring(0, text.length - closeTag.length)

  const openTag = text.substring(0, text.indexOf('>'))
  text = text.substring(openTag.length + 1, text.length)

  const attribute = Object.fromEntries(
    openTag
      .split(' ')
      .splice(1)
      .map((item) => {
        const [key, value] = item.split('=')
        return [key, value.substring(1, value.length - 1)]
      })
  )

  this.text = text
  this.attribute = attribute

  return this
}

Node.prototype.append = function (node: Node) {
  // this.remove()

  if (!Array.isArray(this.children)) {
    this.children = []
  }

  node.parent = this

  return this.children.push(node)
}

Node.prototype.remove = function () {
  if (this.parent == null) return

  const parent = this.parent

  if (!Array.isArray(parent.children)) {
    parent.children = []
  }

  parent.children = parent.children.filter((item) => item.id != this.id)
  this.parent = null
}

Node.prototype.merge = function (node: Node) {
  /** 루트나 디렉터리가 아니라면, 링크라면 append */
  if (!Array.isArray(node.children)) {
    this.append(node)
    return
  }

  const toolbarFolder = this?.children?.find((item) => item?.attribute?.PERSONAL_TOOLBAR_FOLDER)

  if (toolbarFolder == null) {
    // 북마크바 폴더가 없다면 모두 append
    node.children.forEach((item) => this.append(item))
    return
  }

  // 북마크바 폴더가 있다면
  node.children.forEach((item) => {
    const isToolbarFolder = item?.attribute?.PERSONAL_TOOLBAR_FOLDER != void 0

    if (!isToolbarFolder) {
      this.append(item)
    } else {
      //북마크바 아이템은 기존 북마크바에 append
      item.children?.forEach((subItem) => toolbarFolder.append(subItem))
    }
  })
}

Node.prototype.findNodeById = function (
  id: number,
  opt: { children?: boolean; parent?: boolean } = {}
): Node | null {
  if (id == this.id) return this

  const children = this.children ?? []

  // 자식노드에서 찾기
  let item = children.find((item) => item.id === id)
  if (item != null) return item

  // 만약 자식노드에서 찾지 못하면 하위 탐색 합니다
  if (opt.children) {
    item =
      children
        .map((item) => item.findNodeById(id, { children: true }))
        .filter((item) => item != null)[0] ?? void 0
    if (item != null) return item
  }

  // 만약 하위 탐색에서 찾지 못하면 상위 탐색 합니다.
  if (opt.parent) {
    //
  }

  return null
}

export function xmlToNodes(text: string) {
  const data = text
    .split('<H1>Bookmarks</H1>')
    .at(-1)
    .replaceAll('\r', '')
    .replaceAll('<DT>', '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length)

  const stack: Array<Node> = []
  let root: Node | undefined = void 0

  data.forEach((item: string, idx: number, array: Array<string>) => {
    if (item.startsWith('<DL>')) {
      //새로운 그룹이 생성됩니다.
      const group = new Node({ raw: array[idx - 1] })

      if (stack[stack.length - 1]) {
        const lastItem = stack[stack.length - 1]
        lastItem.append(group)
      }

      stack.push(group)

      if (group.type == 'root') root = group
    } else if (item.startsWith('</DL>')) {
      //그룹을 닫습니다
      stack.pop()
    } else if (item.startsWith('<A ')) {
      //링크를 생성합니다
      const link = new Node({ raw: item })
      if (stack[stack.length - 1]) {
        const lastItem = stack[stack.length - 1]
        lastItem.append(link)
      }
    }
  })

  return root ?? new Node({})
}
