export function getWidth(s: HTMLInputElement) {
  const target = document.querySelector<HTMLDivElement>('div.hide')
  if (!target) throw new Error('없다')

  const tmp = document.createElement('span')
  tmp.setAttribute('class', 'hide')
  tmp.innerText = s.value
  target.appendChild(tmp)
  const res = tmp.offsetWidth
  tmp.remove()

  return res
}

export function getOneLineHeight() {
  const target = document.querySelector<HTMLDivElement>('div.hide')
  if (!target) throw new Error('없다')

  const tmp = document.createElement('textarea')
  tmp.setAttribute('class', 'hide')
  target.appendChild(tmp)

  tmp.value = 'a'
  tmp.style.height = '0'
  const res1 = tmp.scrollHeight

  tmp.value = 'a\na'
  tmp.style.height = '0'
  const res2 = tmp.scrollHeight

  tmp.remove()

  return res2 - res1
}
