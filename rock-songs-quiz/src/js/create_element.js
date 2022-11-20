function createDomElement(tag, parent, classlist, attributes, content) {
  const element = document.createElement(tag);
  if (classlist) element.classList = classlist;
  parent.appendChild(element);
  if (attributes) {
    for (const [key, value] of Object.entries(attributes)) {
      element[key] = value;
      element.setAttribute(key, value);
    }
  }
  element.textContent = content;
  return element;
}

export default createDomElement;
