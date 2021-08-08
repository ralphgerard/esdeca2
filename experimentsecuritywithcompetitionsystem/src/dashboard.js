const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('dashboard', req.userinfo)
})

module.exports = router;