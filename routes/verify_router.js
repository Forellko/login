const { Router } = require('express')
const {
  onGetVerify,
  onPostVerify,
} = require('../controllers/verify_controller')

const router = Router()

router.get('/', onGetVerify)
router.post('/', onPostVerify)

module.exports = router
