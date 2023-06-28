const gameService = require('../services/game');

const createGame = async (req,res) => {
    const newGame = await gameService.createGame(req.body.title, req.body.platform, req.body.price, req.body.about, req.body.rating, req.body.releaseYear);
    res.json(newGame)
}

const getGames = async(req, res) => {
    const games = await gameService.getGames();
    res.json(games);
}

const getGame = async (req,res) => {
    const game = await gameService.getGameById(req.params.id);
    if (!game)
      return res.status(404).json({errors:['Game not found']});
    res.json(game);
}

const updateGame = async(req, res) => {
    if(!req.body.title)
        res.status(400).json({message:'title is required'});
    if(!req.body.platform)
        res.status(400).json({message:'platform is required'});
    if(!req.body.price)
        res.status(400).json({message:'price is required'});

    var about = null;
    var rating = null;
    if(!req.body.about)
        about = req.body.about;
    if(!req.body.rating)
        about = req.body.rating;


    const game = await gameService.updateGame(req.params.id,req.body.title, req.body.platform, req.body.price, about, rating);
    if (!game)
        return res.status(404).json({errors:['Game not found']});
    res.json(game);
}

const deleteGame = async (req,res) => {
    const game = await gameService.deleteGame(req.params.id);
    if (!game)
      return res.status(404).json({errors:['Game not found']});
    res.send();
}

const searchGamesByTitle = async (req, res) => {
    const game = await gameService.searchGamesByTitle(req.query.title);
    res.json(game);
}

const filterGames = async (req, res) => {
    /*req.query = {
        price: 'lessThan20',
        platform: 'ps4',
        rating: '4'
      }*/

    const games = await gameService.filterGames(req.query.price, req.query.platform, req.query.rating);
    res.json(games);
}

const groupByReleaseYear = async (req, res) => {
    const games = await gameService.groupByReleaseYear()
    res.json(games)
}

module.exports = {
    createGame,
    getGame,
    getGames,
    updateGame,
    deleteGame,
    searchGamesByTitle,
    filterGames,
    groupByReleaseYear
}