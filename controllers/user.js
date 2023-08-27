const userService = require('../services/user');

const createUser = async (req,res) => {
    const newuser = await userService.createUser(req.body.username, req.body.password, req.body.age, req.body.city,req.body.gender, req.body.permissions);
    res.json(newuser);
    //res.sendFile(__dirname+'/../login.html');
}

const getUsers = async(req, res) => {
    const users = await userService.getUsers();
    res.json(users);
}

const getUser = async (req,res) => {
    const user = await userService.getUser(req.params.id);
    if (!user)
      return res.status(404).json({errors:['user not found']});
    res.json(user);
}

const identifyUser = async(req,res)=>{
    const user = await userService.identifyUser(req.query.username, req.query.password);
    if(!user)
        return res.status(404).json({errors:['user not found']});
    res.json({ user, redirectUrl: __dirname+'/../views/homePage.html' });
}

const updateUser = async(req, res) => {
    if(!req.body.username)
        res.status(400).json({message:'username is required'});
    if(!req.body.password)
        res.status(400).json({message:'password is required'});
    if(!req.body.age)
        res.status(400).json({message:'age is required'});


    const user = await userService.updateUser(req.params.id,req.body.username,req.body.password, req.body.age, req.body.city, req.body.gender);
    if (!user)
        return res.status(404).json({errors:['user not found']});
    res.json(user);
}

const deleteUser = async (req,res) => {
    const user = await userService.deleteUser(req.params.id);
    if (!user)
      return res.status(404).json({errors:['user not found']});
    res.send();
}

const filterUsersSearch = async (req, res) => {
    const users = await userService.filterUsersSearch(req.query.age, req.query.city, req.query.gender);
    res.json(users);
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
