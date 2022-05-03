const express = require('express');
const router = express.Router();
const controller = require('../Controller/userController')

router.get('/', controller.get)

router.get('/:id', controller.getAllOrderByUserId)

router.get('/:email/:password', controller.getById)

router.post('/', controller.post)

router.delete('/:id', controller.deleteU)

router.put('/:id', controller.put)

module.exports = router;