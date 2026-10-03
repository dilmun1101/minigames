import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './skeleton.module.scss';

interface SkeletonProps {
  className?: string | string[];
}

class Skeleton extends BaseComponent {
  constructor({ className = [] }: SkeletonProps = {}) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    super({
      tag: 'div',
      className: [styles.skeleton, ...additionalClasses],
    });
  }
}

export default Skeleton;
