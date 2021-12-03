const { User } = require('../models');

const userController = {
    getAllUser(req, res){
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //get user by ID
    getUserById({ params }, res){
        User.findOne({ _id: params.id })
            .then(userData => {
                if(!userData){
                    res.status(400).json({ message: "No user is found with this ID"});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //create a new user
    createUser({ body}, res){
        User.create(body)
            .then(userData => res.json(userData))
            .catch(err => res.status(400).json(err))
    },

    //update a user by id
    updateUser({ params, body}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(userData => {
            if(!userData){
                res.status(400).json({ message: 'No user can be found with this ID'})
                return;
            }
            res.json(userData)
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a user
    deleteUser({ params }, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(userData => {
            if(!userData){
                res.status(400).json({ message: 'No user is found with this ID'})
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    //add new friend to user list
    addFriend({ params }, res){
        User.findOneAndUpdate(
            {_id: params.userId},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(userData => {
            if(!userData){
                res.status(400).json({ message: 'No user can be found with ID'});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete a friend
    deleteFriend({ params }, res){
        User.findOneAndDelete(
            {_id: params.userId},
            {$pull: { friends: params.friendId}},
            {new: true}
        )
        .then(userData => {
            if(!userData){
                res.status(400).json({ message: "No user can be found with this ID"});
                return;
            }
            res.json(userData);
        })
        .catch(err => res.status(400).json(err))
    }
}

module.exports = userController;
