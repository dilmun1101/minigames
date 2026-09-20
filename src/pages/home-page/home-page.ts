import Header from '../../widgets/header/header';

export class HomePage {
  render() {
    const page = document.createElement('div');
    const header = new Header();
    const p = document.createElement('p');
    p.innerHTML = `Home page`;
    page.append(header.node, p);
    return page;
  }
}
