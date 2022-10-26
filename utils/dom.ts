export const contains = (root: Node | null | undefined, n: Node | null) => {
  if(!root) return false

  // use native if support
  if(root.contains) {
    return root.contains(n)
  }

  // document contain not support with IE11
  let node = n
  while(node) {
    if(node === root) {
      return true
    }
    node = node.parentNode
  }
  return false
}

// if Element or Svg is visible
export const isVisible = (element: HTMLElement | SVGGraphicsElement): boolean => {
  if(!element) return false
  /*
    url: 
      https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent

    Note: offsetParent returns null in the following situations:
      The element or its parent element has the display property set to none.
      The element has the position property set to fixed (Firefox returns <body>).
      The element is <body> or <html>.
  */
 // HTMLElement not display: none
  if(element instanceof HTMLElement && element.offsetParent) {
    return true
  }
  // SVG not invisible
  // getBBbox return SVGRect of svg: x, y, width, height
  if(element instanceof SVGGraphicsElement && element.getBBox) {
    const { width, height } = element.getBBox()
    if(width || height) return true
  }
  // element
  if(element instanceof HTMLElement && element.getBoundingClientRect) {
    const { width, height } = element.getBoundingClientRect()
    if(width || height) {
      return true
    }
  }
  return false
}

export const canUseDom = (): boolean => {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  )
}

export const isStyleNameSupport = (styleName: string | string[]): boolean => {
  const { documentElement } = window.document
  if(canUseDom() && documentElement) {
    const styleNameList = Array.isArray(styleName) ? styleName : [styleName]
    const { style } = documentElement
    // why some ? should every?
    return styleNameList.some(name => name in style)
  }
  
  return false
}

// if value of style is valid
type CSSStyleDeclarationData = {
  [key: string]: any
}
export const isStyleValueSupport = (styleName: string, value: any): boolean => {
  if(!isStyleNameSupport(styleName)) return false
  // if set value is work, that's equal support
  const ele = document.createElement('div')
  const origin = (ele.style as CSSStyleDeclarationData)[styleName]
  (ele.style as CSSStyleDeclarationData)[styleName] = value
  return (ele.style as CSSStyleDeclarationData)[styleName]  !== origin
}