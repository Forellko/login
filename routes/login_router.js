const { Router } = require('express')
const validation = require('../middlewares/validation')
const { onGetLogin, onPostLogin } = require('../controllers/login_controller')
const router = Router()

router.get('/', onGetLogin)
router.post('/', validation, onPostLogin)

module.exports = router
