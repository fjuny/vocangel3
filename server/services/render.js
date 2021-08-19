const axios = require('axios');

exports.homeRoutes = (req,res) => {
    //Make get request to /api/users
    axios.get('/api/users')
        .then(function(response){
            console.log(response)
            res.render('index', {users: response.data});
        })
        .catch(err =>{
            console.log(err);
            res.send(err);
        })
}
//remove, isolate!!!
exports.add_user = (req,res) =>{
    res.render('add_user');
}

exports.update_user = (req,res) =>{
    axios.get('/api/users', {params: { id: req.query.id}})
    .then(function(userdata){
        res.render("update_user", {user : userdata.data})
    })
    .catch(err =>{
        res.send(err);
    })
}
