import BaseComponent from '@/shared/lib/base-component/base-component';
import Header from '@/widgets/header/header';
import styles from './layout.module.scss';

class Layout extends BaseComponent<HTMLElement> {
  public content: BaseComponent<HTMLElement>;

  constructor() {
    const header = new Header();
    const content = new BaseComponent<HTMLElement>({
      tag: 'main',
      className: styles.content,
    });

    super(
      {
        tag: 'div',
        className: styles.app,
      },
      header,
      content
    );

    this.content = content;
  }
}

export default Layout;
