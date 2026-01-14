export function scrollToPageTop(behavior: ScrollBehavior = 'smooth') {
  if (typeof window === 'undefined') {
    return
  }

  window.scrollTo({
    top: 0,
    behavior,
  })
}
