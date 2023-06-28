const Game = require('../models/game')

const createGame = async(title, platform, price, about, rating, releaseYear) =>{
    const game = new Game(
        {
            title:title,
            platform:platform,
            price:price,
            rating:rating,
            releaseYear: releaseYear
        });

        if(about)
            game.about = about;
        if(rating)
            game.rating = rating;
        if(releaseYear)
            game.releaseYear = releaseYear;

        return await game.save();
}

const getGameById = async(id) => {
    return await Game.findById(id)
}

const getGames = async() =>{
    return await Game.find({})
}

const updateGame = async (id, title, platform, price, about, rating, releaseYear ) => {
    const game = await getGameById(id);
    if(!game)
        return null;
    game.title = title; game.platform = platform; game.price = price; 
    game.about = about; game.rating = rating; game.releaseYear = releaseYear;
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

const searchGamesByTitle = async (title) => {
    return await Game.find({title: title});
}

const filterGames = async (price, platform, rating) => {

    try{
        const query = {};

    if (price) {
      const priceValues = price.split(",");
      const priceConditions = [];
      priceValues.forEach((value) => {
        if (value.includes("lessThan")) {
          priceConditions.push({ price: { $lt: 20 } });
        } 
        else if (value.includes("to")) {
          priceConditions.push({ price: { $gte: 20, $lte: 50},
          });
        } 
        else if(value.includes("greaterThan")) {
            priceConditions.push({ price: { $gt: 50 } });
        }
      });
  
      query.$or = priceConditions;

    }
  
    if (platform) {
      const platformValues = platform.split(",");
      query.platform = { $in: platformValues };
    }
  
    if (rating) {
        const ratingValues = rating.split(",").map((value) => parseFloat(value));
        query.rating = { $in: ratingValues };
    }
  
    return await Game.find(query);
    
} catch (error) { console.error('Error connecting to the database:', error);}
    
};

const groupByReleaseYear = async () => {
    return await Game.aggregate([
        {
          $group: {
            _id: { releaseYear: "$releaseYear" },
            games: { $push: "$$ROOT" }
          }
        }
      ]);
}


module.exports = {
    createGame,
    getGameById,
    getGames,
    updateGame,
    deleteGame,
    searchGamesByTitle,
    filterGames,
    groupByReleaseYear
}