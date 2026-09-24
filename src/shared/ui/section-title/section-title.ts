import BaseComponent from '../../lib/base-component/base-component';
import styles from './section-title.module.scss';

interface SectionTitleProps {
  text: string;
  className?: string | string[];
}

class SectionTitle extends BaseComponent<HTMLHeadingElement> {
  constructor({ text, className = [] }: SectionTitleProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'h2',
      text,
      className: [styles.sectionTitle, ...additionalClasses],
    });
  }
}

export default SectionTitle;
