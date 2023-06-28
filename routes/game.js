const express = require('express');
const router = express.Router();

const gameController = require('../controllers/game')

router.route('/')
    .get(gameController.getGames)
    .post(gameController.createGame)

router.route('/game/:id')
    .get(gameController.getGame)
    .put(gameController.updateGame)
    .delete(gameController.deleteGame)

router.get('/search', gameController.searchGamesByTitle)

router.get('/filterGames', gameController.filterGames)

router.get('/groupByReleaseYear', gameController.groupByReleaseYear)


module.exports = router;
