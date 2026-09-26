import BaseComponent from '../../lib/base-component/base-component';
import styles from './page-title.module.scss';

interface PageTitleProps {
  title: string;
  description: string;
  className?: string | string[];
}

class PageTitle extends BaseComponent<HTMLElement> {
  constructor({ title, description, className = [] }: PageTitleProps) {
    const additionalClasses = Array.isArray(className)
      ? className
      : [className];

    const heading = new BaseComponent({
      tag: 'h1',
      className: styles.title,
      text: title,
    });

    const text = new BaseComponent({
      tag: 'p',
      className: styles.description,
      text: description,
    });

    super(
      {
        tag: 'div',
        className: [styles.pageTitle, ...additionalClasses],
      },
      heading,
      text
    );
  }
}

export default PageTitle;
