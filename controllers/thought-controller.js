const { Thought, User } = require('../models');

const thoughtController = {
    //get all thought
    getAllThought(req, res){
        Thought.find({})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v'
                }
            )
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => res.json(thoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    //get single thought by id
    getThoughtById({params}, res){
        Thought.findOne({ _id: params.id})
            .populate(
                {
                    path: 'reactions',
                    select: '-__v',
                }
            )
            .select('-__v')
            .sort({ _id: -1 })
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(400).json({ message: 'No thought can be found with this ID'});
                    return;
                }
                res.json(thoughtData)
            })
            .catch(err => res.status(400).json(err))
    },

    //create thought
    createThought({ body }, res){
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {username: body.username},
                    {$push: { thoughts: _id }},
                    {new: true}
                );
            })
            .then(userData => {
                if(!userData){
                    res.status(400).json({ message: 'No user found with this username!'})
                    return;
                }
                res.json(userData)
            })
            .catch(err => res.status(400).json(err))
    },

    //update thought
    updateThought({ body, params}, res){
        Thought.findOneAndUpdate(
            { _id: params.id},
            body,
            {new: true, runValidators: true}
        )
        .then(thougthData => {
            if(!thoughtData){
                res.status(400).json({ message: 'No thought can be found with this ID'})
                return;
            };
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    //delete thought
    deleteThought({ params }, res){
        Thought.findOneAndDelete({ _id: params.id })
            .then(thoughtData => {
                if(!thoughtData){
                    res.status(400).json({ message: 'No thought can be found with this ID'});
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => res.status(400).json(err))
    },

    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $push: { reactions: body }},
            { new: true, runValidators: true}
        )
        .then(thoughtData => {
            if(!thoughtData){
                res.status(400).json({ message: 'No thought can be found with this ID'});
                return;
            }
            res.json(thoughtData);
        })
    },

    //delete reaction
    deleteReaction({ params, body}, res){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId},
            { $pull: { reactions: {reactionId: params.reactionId }}},
            { new: true, runValidators: true}
        )
        .then(thoughtData => {
            if(!thoughtData){
                res.status(400).json({ message: "No thought can be found with this ID"});
                return;
            }
            res.json(thoughtData)
        })
        .catch(err => res.status(400).json(err))
    }
};

module.exports = thoughtController;