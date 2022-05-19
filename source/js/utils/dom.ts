export const renderElement = (node: Node, locationRef: string | Node | null) => {
  const location = typeof locationRef === 'string' ? document.querySelector(locationRef) : locationRef;

  if (!location) {
    return;
  }

  const currentNode = location.childNodes[0];

  if (currentNode) {
    location.replaceChild(node, currentNode);
  } else {
    location.appendChild(node);
  }
};

export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export function htmlToElement<T>(html: string): T {
  var template = document.createElement('template');
  html = html.trim();
  template.innerHTML = html;
  return template.content.firstChild as unknown as T;
}

export const getInputValue = (element: HTMLInputElement) => {
  return element.value;
};

export const setInputValue = (element: HTMLInputElement, value: string) => {
  return (element.value = value);
};

export const showElement = (element: HTMLElement) => {
  element.classList.remove('u-display--none');
};

export const hideElement = (element: HTMLElement) => {
  element.classList.add('u-display--none');
};

export const getAttributes = (selector: string, keys: string[]): string[] => {
  const attributes = document.querySelector(selector)?.attributes;
  return keys.map((key) => attributes?.getNamedItem(key)?.nodeValue ?? '');
};
