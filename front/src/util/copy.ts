export function copy(el) {
  let isStr = (typeof el === 'string')
  if (isStr) {
    const dom = document.createElement(`div`);
    dom.innerHTML = el;
    el = dom;
    document.body.appendChild(el)
  }
	const range = document.createRange();
	const end = el.childNodes.length;
	range.setStart(el, 0);
	range.setEnd(el, end);

	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
	document.execCommand("copy", false, null);
  selection.removeRange(range);
  if (isStr) {
    el.remove()
  }
}
