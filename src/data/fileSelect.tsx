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
