import Quill from 'quill';

const Inline: any = Quill.import('blots/inline');

export class VariableBlot extends Inline {
  static blotName = 'variable';
  static tagName = 'span';
  static className = 'custom-variable';

  static create(value: string) {
    const node = super.create();
    node.setAttribute('data-variable', value);
    node.innerText = `<<${value}>>`;
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-variable');
  }
}

Quill.register(VariableBlot);
