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
  toJSON: () => any
  toString: () => string;
  [Symbol.toStringTag]: string

  children: Array<Node> | null
  attribute?: { [key: string]: any }
  text?: string
}

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
Node.prototype.toString = function () {
  // TODO tag
  const openTag = ''
  const closeTag = ''
  const middle = ''

  // return openTag + middle + closeTag; // <A>TEXT</A>

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
  if (!Array.isArray(this.children)) {
    this.children = []
  }

  return this.children.push(node)
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
