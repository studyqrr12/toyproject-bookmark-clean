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
  children: Array<Node> | null
  initScope: () => void
  parse: (raw?: string) => void
  toJSON: () => any
  toString: () => string;
  [Symbol.toStringTag]: string
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
  } else if (raw.startsWith('<H3 ')) {
    //Directory
  } else {
    //DL
    // console.log(raw)
  }

  return this
  //TODO: Parse
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

  data.forEach((item: string, idx: number, array: Array<string>) => {
    //TODO: create Tree

    if (item.startsWith('<DL><p>')) {
      //OPEN
    } else if (item.startsWith('</DL><p>')) {
      //CLOSE
    } else {
      const node = new Node({ raw: item })
      // console.log(JSON.stringify(node, null, 2))
    }
  })
}
