const { Router } = require('express')
const { onGetLogin, onPostLogin } = require('../controllers/login_controller')
const router = Router()

router.get('/', onGetLogin)
router.post('/', onPostLogin)

module.exports = router
