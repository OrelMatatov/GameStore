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

router.route('/game/fromDeletedGames/:id')
    .get(gameController.getDeletedGameById)

router.route('/search')
    .get(gameController.searchGamesByTitle);

router.route('/filterGames')
    .get(gameController.filterGames);

router.route('/groupByReleaseYear')
    .get(gameController.groupByReleaseYear)

router.route('/groupByRating')
    .get(gameController.groupByRating)


module.exports = router;
