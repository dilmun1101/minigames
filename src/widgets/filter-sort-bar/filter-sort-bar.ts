import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './filter-sort-bar.module.scss';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import type { CategoryDto } from '@/shared/api/types/types';
import CategoryChip from './ui/category-chip/category-chip';
import SortSelect from './ui/sort-select/sort-select';
import { DEFAULT_SORT, SORT_OPTIONS } from './model/filters';

const ERROR_MESSAGE = 'Failed to load categories';

class FilterSortBar extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private chipsList: BaseComponent;
  private chips: CategoryChip[] = [];

  constructor() {
    const chipsList = new BaseComponent({
      tag: 'ul',
      className: styles.chips,
    });

    const sortSelect = new SortSelect({
      options: SORT_OPTIONS,
      selectedValue: DEFAULT_SORT,
    });

    super(
      {
        tag: 'div',
        className: styles.container,
      },
      chipsList,
      sortSelect
    );

    this.chipsList = chipsList;
    this.loadCategories();
  }

  private async loadCategories(): Promise<void> {
    try {
      const categories = await this.api.getCategories();

      this.showCategories(categories);
    } catch {
      const message = new BaseComponent({
        tag: 'li',
        className: styles.message,
        text: ERROR_MESSAGE,
      });

      this.chipsList.append(message);
    }
  }

  private showCategories(categories: CategoryDto[]): void {
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];

      const chip = new CategoryChip({
        text: category.label,
        isActive: category.isDefault,
      });

      chip.onClick(() => this.selectChip(chip));
      this.chips.push(chip);

      const item = new BaseComponent(
        {
          tag: 'li',
          className: styles.chipItem,
        },
        chip
      );

      this.chipsList.append(item);
    }
  }

  private selectChip(selected: CategoryChip): void {
    this.chips.forEach((chip) => {
      chip.addActive(chip === selected);
    });
  }
}

export default FilterSortBar;
