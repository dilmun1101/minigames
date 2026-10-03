import BaseComponent from '../../lib/base-component/base-component';
import styles from './empty-state.module.scss';

interface EmptyStateProps {
  text: string;
  className?: string | string[];
}

class EmptyState extends BaseComponent {
  constructor({ text, className = [] }: EmptyStateProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const message = new BaseComponent({
      tag: 'p',
      className: styles.message,
      text,
    });

    super(
      {
        tag: 'div',
        className: [styles.container, ...additionalClasses],
      },
      message
    );
  }
}

export default EmptyState;
