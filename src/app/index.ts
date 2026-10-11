import Layout from './layouts/layout';
import Router from './router/router';
import urlState from '@/shared/lib/url-state/url-state';

const layout = new Layout();
document.body.append(layout.node);

const router = new Router(layout.content.node);
router.init();
urlState.update();
