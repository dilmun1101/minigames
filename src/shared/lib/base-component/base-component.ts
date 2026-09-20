import type { BaseComponentProp } from './types';

class BaseComponent<T extends HTMLElement = HTMLElement> {
  public readonly node: T;
  private children: BaseComponent[] = [];

  constructor(
    {
      tag = 'div',
      className = '',
      text = '',
      attributes: attributes = {},
    }: BaseComponentProp,
    ...children: BaseComponent[]
  ) {
    const node = document.createElement(tag) as T;
    node.textContent = text;
    this.node = node;

    if (className) {
      if (Array.isArray(className)) {
        node.classList.add(...className);
      } else {
        node.className = className;
      }
    }

    Object.entries(attributes).forEach(([key, value]) => {
      node.setAttribute(key, value);
    });

    if (children.length > 0) {
      this.append(...children);
    }
  }

  public addClass(className: string): this {
    this.node.classList.add(className);
    return this;
  }

  public removeClass(className: string): this {
    this.node.classList.remove(className);
    return this;
  }

  public addAttribute(attribute: string, value: string): this {
    this.node.setAttribute(attribute, value);
    return this;
  }

  public removeAttribute(attribute: string): this {
    this.node.removeAttribute(attribute);
    return this;
  }

  public addText(text: string): this {
    this.node.textContent = text;
    return this;
  }

  public append(...children: BaseComponent[]): this {
    this.children.push(...children);
    children.forEach((child) => this.node.append(child.node));
    return this;
  }

  public destroy(): void {
    this.node.remove();
    this.destroyChildren();
  }

  public destroyChildren(): void {
    this.children.forEach((child) => child.destroy());
    this.node.replaceChildren();
    this.children = [];
  }
}

export default BaseComponent;
