const router = require('express').Router();
const { getAllUser, getUserById, createUser, deleteUser, updateUser, addFriend, deleteFriend} = require('../../controllers/user-controller')

//get all user and create user
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

//operation that involve only user id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//operation that involve user id and friend is
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)
    
module.exports = router;