const { Router } = require('express')
const { onGetAuth, onPostAuth } = require('../controllers/auth_controller')
const router = Router()

router.get('/', onGetAuth)
router.post('/', onPostAuth)

module.exports = router
