import BaseComponent from '@/shared/lib/base-component/base-component';
import Icon from '@/shared/ui/icon/icon';
import type { SortOption } from '../../model/filters';
import styles from './sort-select.module.scss';

const SORT_PREFIX = 'Sort by: ';
const CLOSED_ICON = 'arrow_drop_down';
const CHECK_ICON = 'check';

function getLabel(options: SortOption[], value: string): string {
  const option = options.find((item) => item.value === value);

  if (!option) {
    return '';
  }

  return option.label;
}

interface SortSelectProps {
  options: SortOption[];
  selectedValue: string;
  className?: string | string[];
}

class SortSelect extends BaseComponent<HTMLDivElement> {
  constructor({ options, selectedValue, className = [] }: SortSelectProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const triggerText = new BaseComponent({
      tag: 'span',
      className: styles.triggerText,
      text: `${SORT_PREFIX}${getLabel(options, selectedValue)}`,
    });

    const triggerIcon = new Icon({
      name: CLOSED_ICON,
      className: styles.triggerIcon,
    });

    const trigger = new BaseComponent<HTMLButtonElement>(
      {
        tag: 'button',
        className: styles.trigger,
        attributes: {
          type: 'button',
        },
      },
      triggerText,
      triggerIcon
    );

    const items = [];

    for (let i = 0; i < options.length; i++) {
      const option = options[i];

      const check = new Icon({
        name: CHECK_ICON,
        className: styles.check,
      });

      const label = new BaseComponent({
        tag: 'span',
        text: option.label,
      });

      const optionClasses = [styles.option];

      if (option.value === selectedValue) {
        optionClasses.push(styles.optionSelected);
      }

      const button = new BaseComponent<HTMLButtonElement>(
        {
          tag: 'button',
          className: optionClasses,
          attributes: {
            type: 'button',
          },
        },
        check,
        label
      );

      items.push(
        new BaseComponent(
          {
            tag: 'li',
            className: styles.item,
          },
          button
        )
      );
    }

    const menu = new BaseComponent(
      {
        tag: 'ul',
        className: [styles.menu],
      },
      ...items
    );

    super(
      {
        tag: 'div',
        className: [styles.sortSelect, ...additionalClasses],
      },
      trigger,
      menu
    );
  }
}

export default SortSelect;
