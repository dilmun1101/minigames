import BaseComponent from '@/shared/lib/base-component/base-component';
import styles from './filter-sort-bar.module.scss';
import MinigamesApi from '@/shared/api/minigames-api/minigames-api';
import type { CategoryDto } from '@/shared/api/types/types';
import CategoryChip from './ui/category-chip/category-chip';
import SortSelect from './ui/sort-select/sort-select';
import { DEFAULT_SORT, SORT_OPTIONS } from './model/filters';
import urlState from '@/shared/lib/url-state/url-state';
import { URL_PARAMS } from '@/shared/constants/url-params';

const ERROR_MESSAGE = 'Failed to load categories';
const NO_CATEGORY = '';

class FilterSortBar extends BaseComponent<HTMLElement> {
  private api = new MinigamesApi();
  private chipsList: BaseComponent;
  private chips: CategoryChip[] = [];
  private categories: CategoryDto[] = [];
  private category = NO_CATEGORY;

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

  public showCategory(category: string): void {
    this.category = category;
    this.showActiveChip();
  }

  private async loadCategories(): Promise<void> {
    try {
      this.categories = await this.api.getCategories();

      this.showCategories();
      this.showActiveChip();
    } catch {
      const message = new BaseComponent({
        tag: 'li',
        className: styles.message,
        text: ERROR_MESSAGE,
      });

      this.chipsList.append(message);
    }
  }

  private showCategories(): void {
    for (let i = 0; i < this.categories.length; i++) {
      const category = this.categories[i];

      const chip = new CategoryChip({
        text: category.label,
      });

      chip.onClick(() => this.changeCategory(category.slug));
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

  private showActiveChip(): void {
    this.chips.forEach((chip, index) => {
      chip.addActive(this.isActive(this.categories[index]));
    });
  }

  private isActive(category: CategoryDto): boolean {
    if (this.category === NO_CATEGORY) {
      return category.isDefault;
    }

    return category.slug === this.category;
  }

  private changeCategory(slug: string): void {
    urlState.setParams({ [URL_PARAMS.CATEGORY]: slug });
  }
}

export default FilterSortBar;
