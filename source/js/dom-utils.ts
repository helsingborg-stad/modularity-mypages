export const renderElement = (node: Node, locationSelector: string) => {
  const location = document.querySelector(locationSelector);

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
