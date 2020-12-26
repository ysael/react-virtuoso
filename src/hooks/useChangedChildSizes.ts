import { SizeRange } from '../sizeSystem'
import useSize from './useSize'

export default function useChangedChildSizes(callback: (ranges: SizeRange[]) => void, enabled: boolean) {
  return useSize((el: HTMLElement) => {
    const ranges = getChangedChildSizes(el.children, 'offsetHeight')
    if (ranges !== null) {
      callback(ranges)
    }
  }, enabled)
}

function getChangedChildSizes(children: HTMLCollection, field: 'offsetHeight' | 'offsetWidth') {
  const length = children.length

  if (length === 0) {
    return null
  }

  const results: SizeRange[] = []

  for (var i = 0; i < length; i++) {
    let child = children.item(i) as HTMLElement

    if (!child || child.dataset.index === undefined) {
      continue
    }

    const index = parseInt(child.dataset.index!)
    const knownSize = parseInt(child.dataset.knownSize!)
    const size = (child as HTMLElement)[field]

    if (size === 0) {
      throw new Error('Zero-sized element, this should not happen')
    }

    if (size === knownSize) {
      continue
    }

    const lastResult = results[results.length - 1]
    if (results.length === 0 || lastResult.size !== size || lastResult.endIndex !== index - 1) {
      results.push({ startIndex: index, endIndex: index, size })
    } else {
      results[results.length - 1].endIndex++
    }
  }

  return results
}
