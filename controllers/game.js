const gameService = require('../services/game');
const axios = require('axios');

const createGame = async (req,res) => {
    const newGame = await gameService.createGame(req.body.title, req.body.platform, req.body.price, req.body.about, req.body.rating, req.body.releaseYear, req.body.supplier);
    // Post to Facebook
    const longLivedUserToken = 'EAAdZA2NAjcbMBO2zKPfJJZC0r07Jbqq9ZAQc50pyWsaZBnRB9NkMHNj3Ju7g4i7Axi0aFx2C5i0SxyqprZA7xqzAp8JWvTmkAFmszrTS9kai3AAKbR0nixwTa5lWd7IVX2ypW08Xu79z5IaXudApmVzGZAqzoIJbzJdbZCjPnEXqZCBvSIjXOlDLZBC67lVReYMNSUZAO24PDG';//await exchangeShortLivedToken();
    try {
        const tokenURL = `https://graph.facebook.com/v17.0/me/accounts?access_token=${longLivedUserToken}`;
        const responseGet = await axios.get(tokenURL);
        const longLivedPageToken = responseGet.data.data[0].access_token;
         const response = await axios.post(
             'https://graph.facebook.com/116445611549272/feed',
             {
                 message: `Check out our new game: ${newGame.title}! It's now available for only ${newGame.price}$.`,
                 access_token: longLivedPageToken
             }
             );
        console.log('Facebook post successful:', response.data);
    } catch (error) {
        console.error('Error posting to Facebook:', error.response.data);
    }

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

    /*var about = null;
    var rating = null;
    if(!req.body.about)
        about = req.body.about;
    if(!req.body.rating)
        rating = req.body.rating;
    */

    const game = await gameService.updateGame(req.params.id,req.body.title, req.body.platform, req.body.price, req.body.about, req.body.rating,req.body.releaseYear, req.body.supplier);
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

const getDeletedGameById = async (req,res) => {
    const game = await gameService.getDeletedGameById(req.params.id);
    res.json(game)
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

const groupByRating = async (req, res) => {
    const games = await gameService.groupByRating();
    res.json(games);
}

module.exports = {
    createGame,
    getGame,
    getGames,
    updateGame,
    deleteGame,
    getDeletedGameById,
    searchGamesByTitle,
    filterGames,
    groupByReleaseYear,
    groupByRating
}
