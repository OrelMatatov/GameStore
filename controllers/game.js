const gameService = require('../services/game');
const axios = require('axios');

// Long-Live User Access Token
const exchangeShortLivedToken = async () => {
    const graphApiVersion = 'v17.0'; // Replace with the desired version
    const appId = '2069112576766387'; // Replace with your actual app ID
    const appSecret = '61bd850a1829cde3340854966ba08b06'; // Replace with your actual app secret
    const accessToken = 'EAAdZA2NAjcbMBOywcYbaIw56eOtnX7EpU2piVKF5G8C6Af5jkt9knGh6Jsj1Rt6XrINdyJ2pX3383aDwEj5CjlmhNZBOLHwgLK3mDKjx37H5TsNQEuOIKbWq6zILqTTW3Q2BdTIn4XIZBFCnRihiBI3E37PFAYcXd6ImnhkRVSD4yhgbel6PlnYejxkTRDapvUTYDbh10U7fu0fbMMbICdeuCkg8dZC5wagZCmZC7lotog';
    
    const tokenExchangeUrl = `https://graph.facebook.com/${graphApiVersion}/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${accessToken}`;

try {
    const response = await axios.get(tokenExchangeUrl);
    const longLivedToken = response.data.access_token;

    // Use the long-lived user access token to get the page access token
    const pageAccountsUrl = `https://graph.facebook.com/${graphApiVersion}/me/accounts?access_token=${longLivedToken}`;
    const pageAccountsResponse = await axios.get(pageAccountsUrl);

    // Assuming you want to post on a specific page, replace 'your-page-id' with the actual page ID
    const pageAccessToken = pageAccountsResponse.data.data.find(account => account.id === '116445611549272').access_token;
    return pageAccessToken;
    
} catch (error) {
    console.error('Error exchanging token:', error.response.data);
    throw error;
}
};

const createGame = async (req,res) => {
    const newGame = await gameService.createGame(req.body.title, req.body.platform, req.body.price, req.body.about, req.body.rating, req.body.releaseYear, req.body.supplier);
    // Post to Facebook
    try {
        const longLivedToken = await exchangeShortLivedToken();

        const response = await axios.post(
            'https://graph.facebook.com/116445611549272/feed',
            {
                message: `Check out our new game: ${newGame.title}! It's now available for only ${newGame.price}$.`,
                access_token: longLivedToken
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
    searchGamesByTitle,
    filterGames,
    groupByReleaseYear,
    groupByRating
}
