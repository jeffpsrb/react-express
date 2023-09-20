const router = require('express').Router();
const productRouter = require('./controller')

router.get('/products', productRouter.index)
router.get('/products/:id', productRouter.view)
router.post('/products', productRouter.store)
router.put('/products/:id', productRouter.update)

router.delete('/products/:id', productRouter.destroy)


module.exports = router;