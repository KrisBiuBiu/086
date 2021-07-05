const Router = require('koa-router');
const router = new Router();
const routers = require('../requireFolder')(__dirname);
const homeRouter = routers.home;
const apiRouter = routers.api;
const loginRouter = routers.login;
const registerRouter = routers.register;
const signRouter = routers.sign;
const postRouter = routers.post;
const fileRouter = routers.file;
const plateRouter = routers.plate;
const designRouter = routers.design;
const resourceRouter = routers.resource;
const controlRouter = routers.control;
const userRouter = routers.user;

router.use('/', homeRouter.routes(), homeRouter.allowedMethods());
router.use('/api', apiRouter.routes(), apiRouter.allowedMethods());
router.use('/login', loginRouter.routes(), loginRouter.allowedMethods());
router.use('/register', registerRouter.routes(), registerRouter.allowedMethods());
router.use('/sign', signRouter.routes(), signRouter.allowedMethods());
router.use('/post', postRouter.routes(), postRouter.allowedMethods());
router.use('/file', fileRouter.routes(), fileRouter.allowedMethods());
router.use('/plate', plateRouter.routes(), plateRouter.allowedMethods());
router.use('/design', designRouter.routes(), designRouter.allowedMethods());
router.use('/resource', resourceRouter.routes(), resourceRouter.allowedMethods());
router.use('/control', controlRouter.routes(), controlRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());
module.exports = router;