const Game = require('../models/game')

const createGame = async(title, platform, price, about, rating) =>{
    const game = new Game(
        {
            title:title,
            platform:platform,
            price:price,
            rating:rating
        });

        if(about)
            game.about = about;
        if(rating)
            game.rating = rating;

        return await game.save();
}

const getGameById = async(id) => {
    return await Game.findById(id)
}

const getGames = async() =>{
    return await Game.find({})
}

const updateGame = async (id, title, platform, price, about, rating ) => {
    const game = await getGameById(id);
    if(!game)
        return null;
    game.title = title; game.platform = platform; game.price = price; game.about = about; game.rating = rating;
    await game.save();
    return game;
}

const deleteGame = async (id) => {
    const game = await getGameById(id);
    if (!game)
        return null;
    await game.deleteOne();
    return game;
}

const searchGameByTitle = async (title) => {
    return await Game.find({title: title});
}

module.exports = {
    createGame,
    getGameById,
    getGames,
    updateGame,
    deleteGame,
    searchGameByTitle
}