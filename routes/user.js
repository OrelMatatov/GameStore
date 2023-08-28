const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser)

router.route('/user/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/pass')
    .get(userController.identifyUser)

router.route('/filterUsers')
    .get(userController.filterUsersSearch);

module.exports = router;
