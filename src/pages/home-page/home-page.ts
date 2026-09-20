import Navigation from '../../widgets/navigation/navigation';

export class HomePage {
  render() {
    const page = document.createElement('div');
    const navigation = new Navigation();
    const p = document.createElement('p');
    p.innerHTML = `Home page`;
    page.append(navigation.node, p);
    return page;
  }
}
