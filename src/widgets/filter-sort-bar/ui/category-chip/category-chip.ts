import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './category-chip.module.scss';

interface CategoryChipProps {
  text: string;
  isActive?: boolean;
  className?: string | string[];
}

class CategoryChip extends BaseComponent<HTMLButtonElement> {
  constructor({ text, isActive = false, className = [] }: CategoryChipProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const chipClasses = isActive ? [styles.chip, styles.active] : [styles.chip];

    super({
      tag: 'button',
      text,
      className: [...chipClasses, ...additionalClasses],
      attributes: {
        type: 'button',
      },
    });
  }

  public addActive(isActive: boolean): this {
    this.node.classList.toggle(styles.active, isActive);
    return this;
  }

  public onClick(handler: (event: MouseEvent) => void): this {
    this.node.addEventListener('click', handler);
    return this;
  }
}

export default CategoryChip;
