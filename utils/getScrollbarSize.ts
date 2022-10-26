// get the width of scrollbar

export const getScrollbarWidth = () => {
  if(typeof document === 'undefined') return 0

  let barWidth

  const outer = document.createElement('div')
  const outerStyle = outer.style
  outerStyle.width = '200px'
  outerStyle.height = '500px'
  outerStyle.visibility = 'hidden'
  outerStyle.pointerEvents = 'none'
  outerStyle.position = 'absolute'
  outerStyle.top = '0'
  outerStyle.left = '0'
  outerStyle.overflow = 'hidden'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  inner.style.height = '600px'

  document.body.appendChild(outer)
  outer.appendChild(inner)

  const widthContained = inner.offsetWidth
  outerStyle.overflow = 'scroll'
  let widthScroll = inner.offsetWidth

  // 'widthContained === widthScroll' is real exist ?
  if(widthContained === widthScroll) {
    widthScroll = outer.clientWidth
  }

  return widthContained - widthScroll
}