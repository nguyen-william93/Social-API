const router = require('express').Router();
const { getAllThought, getThoughtById, createThought, deleteReaction, deleteThought, addReaction, updateThought} = require('../../controllers/thought-controller');

//no id
router
    .route('/')
    .get(getAllThought)
    .post(createThought)

//with thought id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//route with reaction
router
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction)

module.exports = router;