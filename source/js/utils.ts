export const renderElement = (node: Node, locationRef: string | Node) => {
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

export const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);