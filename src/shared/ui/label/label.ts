import BaseComponent from '../../lib/base-component/base-component';
import styles from './label.module.scss';

interface LabelProps {
  text: string;
  className?: string | string[];
}

class Label extends BaseComponent<HTMLSpanElement> {
  constructor({ text, className = [] }: LabelProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'span',
      text,
      className: [styles.label, ...additionalClasses],
    });
  }
}

export default Label;
