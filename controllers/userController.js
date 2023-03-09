const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () =>
  User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers);

// Aggregate function for getting the overall grade using $avg
const grade = async (userId) =>
  User.aggregate([
    // only include the given user by using $match
    { $match: { _id: ObjectId(userId) } },
    {
      $unwind: '$assignments',
    },
    {
      $group: {
        _id: ObjectId(userId),
        overallGrade: { $avg: '$assignments.score' },
        
      },
    },
  ]);

module.exports = {
  // Get all Users
  getStudents(req, res) {
    Users.find()
      .then(async (UsersUsed) => {
        const userObj = {
          UsersUsed,
          userCount: await userCount(),
        };
        return res.json(userObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single User
  getSingleStudent(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then(async (userFirst) =>
        !userFirst
          ? res.status(404).json({ message: 'No user(First) with that ID' })
          : res.json({
              userFirst,
              grade: await grade(req.params.userId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new user
  createStudent(req, res) {
    User.create(req.body)
      .then((UsersUsed) => res.json(UsersUsed))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user and remove them from the Thoughts function. 
  deleteStudent(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((userFirst) =>
        !userFirst
          ? res.status(404).json({ message: 'No such user exists' })
          : Thoughts.findOneAndUpdate(
              { userFirst: req.params.userId },
              { $pull: { UsersUsed: req.params.userId } },
              { new: true }
            )
      )
      .then((Thought) =>
        !Thought
          ? res.status(404).json({
              message: 'User deleted, but no Thoughts found',
            })
          : res.json({ message: 'User successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a user
  addAssignment(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { assignments: req.body } },
      { runValidators: true, new: true }
    )
      .then((userFirst) =>
        !userFirst
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userFirst)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a user
  removeAssignment(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { assignment: { assignmentId: req.params.assignmentId } } },
      { runValidators: true, new: true }
    )
      .then((userFirst) =>
        !userFirst
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(userFirst)
      )
      .catch((err) => res.status(500).json(err));
  },
};
