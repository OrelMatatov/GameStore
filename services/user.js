const User = require('../models/user');

const createUser = async(username, password, age, city, gender, permissions) =>{
    const user = new User(
        {
            username:username,
            password:password,
            age:age,
            city:city,
            gender: gender
        });
    if(permissions)
        user.permissions = permissions;
    
    return await user.save();
}

const getUser = async(id) => {
    return await User.findById(id);
}

const getUsers = async() =>{
    return await User.find({})
}

const identifyUser = async(username, password) => {
    return await User.find({username:username, password:password})
}

const updateUser = async (id, username, password, age, city, gender) => {
    const user = await getUser(id);
    if(!user)
        return null;
    user.username = username; user.password = password; user.age = age;user.city = city; user.gender=gender;
    await user.save();
    return user;
}

const deleteUser = async (id) => {
    const user = await getUser(id);
    if (!user)
        return null;
    await user.deleteOne();
    return user;
}

const filterUsersSearch = async (age, city, gender) => {
    try{
        const query = {};

    if (age) {
      const ageValues = age.split(",");
      const ageConditions = [];
      ageValues.forEach((age) => {
        if (age.includes("below")) {
            ageConditions.push({ age: { $lt: 18 } });
        } 
        else if (age.includes("to")) {
            ageConditions.push({ age: { $gte: 18, $lte: 30},
          });
        } 
        else if(age.includes("above")) {
            ageConditions.push({ age: { $gt: 30 } });
        }
      });
  
      query.$or = ageConditions;

    }
  
    if (city) {
      const cityValues = city.split(",");
      query.city = { $in: cityValues };
    }
  
    if (gender) {
        const genderValues = gender.split(",");
        query.gender = { $in: genderValues };
    }
  
    return await User.find(query);
    
} catch (error) { console.error('Error connecting to the database:', error);}
}

module.exports = {
    createUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    identifyUser,
    filterUsersSearch
}