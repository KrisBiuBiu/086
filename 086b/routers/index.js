const Router = require('koa-router');
const router = new Router();
const routers = require('../requireFolder')(__dirname);
const homeRouter = routers.home;
const loginRouter = routers.login;
const registerRouter = routers.register;
const accessRouter = routers.access;
const designRouter = routers.design;
const resourceRouter = routers.resource;
const controlRouter = routers.control;

router.use('/', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/register', registerRouter.routes(), registerRouter.allowedMethods());
router.use('/access', accessRouter.routes(), accessRouter.allowedMethods());
router.use('/design', designRouter.routes(), designRouter.allowedMethods());
router.use('/resource', resourceRouter.routes(), resourceRouter.allowedMethods());
router.use('/control', controlRouter.routes(), controlRouter.allowedMethods());
module.exports = router;