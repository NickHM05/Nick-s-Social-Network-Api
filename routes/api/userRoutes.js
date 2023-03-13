// changed more references and functions to users, thoughts. 
const router = require('express').Router();
const { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser, 
  createFriend, 
  deleteFriend 
} = require('../../controllers/userController');

// /api/users
// /api/users in JSON user {"username":"anonymous", "email":"anonymous email"}
router.route('/').get(getAllUsers).post(createUser);

// /api/users/userid#
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/user1Id/friends/user2Id
router.route('/:userId/friends/:friendId').post(createFriend).delete(deleteFriend);

module.exports = router;