import Router from './router/router';

const app = document.createElement('div');
app.id = 'app';
document.body.append(app);

const router = new Router(app);
router.init();
