
const {Router} = require ('express');
const router = Router();
const {storeForum} = require('../controller/forumController');
const {getPost} = require('../controller/forumController');

/**
 * @swagger
 * /api/store/forum:
 *  post:
 *      summary: Mostra na tela
 *      responses:
 *        201:
 *          descripition: Sucesso
 *          content:
 *              aplication/json:
 *                 schema:
 *                    type: array
 *                    items:
 *                       type: object
 */
router.post('/store/forum', storeForum);


/**
 * @swagger
 * /api/getposts:
 *  get:
 *      summary: Retorna um post
 *      responses:
 *        200:
 *          description: Postagem
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 */
router.get('/getposts', getPost);

module.exports = router
