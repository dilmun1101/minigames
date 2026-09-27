import BaseComponent from '@/shared/lib/base-component/base-component';
import Icon from '@/shared/ui/icon/icon';
import type { SortOption } from '../../model/filters';
import styles from './sort-select.module.scss';

const SORT_PREFIX = 'Sort by: ';
const CLOSED_ICON = 'arrow_drop_down';
const OPENED_ICON = 'arrow_drop_up';
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
  private options: SortOption[];
  private optionButtons: BaseComponent<HTMLButtonElement>[];
  private triggerText: BaseComponent;
  private triggerIcon: Icon;
  private menu: BaseComponent;
  private isOpened = false;

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

    const optionButtons = [];
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

      optionButtons.push(button);

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
        className: [styles.menu, styles.hidden],
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

    this.options = options;
    this.optionButtons = optionButtons;
    this.triggerText = triggerText;
    this.triggerIcon = triggerIcon;
    this.menu = menu;

    trigger.node.addEventListener('click', () => this.toggle());

    this.optionButtons.forEach((button, index) => {
      button.node.addEventListener('click', () => this.select(index));
    });
  }

  private select(index: number): void {
    const option = this.options[index];

    this.optionButtons.forEach((button, buttonIndex) => {
      const isSelected = buttonIndex === index;

      button.node.classList.toggle(styles.optionSelected, isSelected);
    });

    this.triggerText.addText(`${SORT_PREFIX}${option.label}`);
    this.close();
  }

  private toggle(): void {
    if (this.isOpened) {
      this.close();
      return;
    }

    this.open();
  }

  private open(): void {
    this.isOpened = true;
    this.menu.removeClass(styles.hidden);
    this.triggerIcon.addText(OPENED_ICON);
  }

  private close(): void {
    this.isOpened = false;
    this.menu.addClass(styles.hidden);
    this.triggerIcon.addText(CLOSED_ICON);
  }
}

export default SortSelect;
