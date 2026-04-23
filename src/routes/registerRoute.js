const express = require('express');
const path = require('path')
const router = express.Router()
const registerController = require('../controllers/registerController')

router.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, '../../pages/usersList.html'))
})

router.get('/list/voters', registerController.listVoter)
router.post('/', registerController.registerVoter)

module.exports = router