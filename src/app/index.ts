import Layout from './layouts/layout';
import Router from './router/router';

const layout = new Layout();
document.body.append(layout.node);

const router = new Router(layout.content.node);
router.init();
