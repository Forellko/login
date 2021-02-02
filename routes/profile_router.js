const { Router } = require('express')
const {
  onGetProfile,
  onPostProfile,
} = require('../controllers/profile_controller')
const router = Router()

router.get('/', onGetProfile)
router.post('/', onPostProfile)

module.exports = router
