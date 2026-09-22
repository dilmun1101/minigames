import BaseComponent from '../../lib/base-component/base-component';

const ICON_CLASS = 'material-symbols-outlined';

interface IconProps {
  name: string;
  className?: string | string[];
}

class Icon extends BaseComponent<HTMLSpanElement> {
  constructor({ name, className = [] }: IconProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'span',
      text: name,
      className: [ICON_CLASS, ...additionalClasses],
    });
  }
}

export default Icon;
