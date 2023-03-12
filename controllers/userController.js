const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find({})
      .then((users) => res.json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)});
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : res.json(user)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err)} );

  },

  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
    .then((user) =>
       !user
       ? res.status(404).json({ message: 'No user with this id!' })
       : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },

  // Delete a user and associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and associated thoughts are deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId }  },
      { new: true }
    )
    .then((user) =>
       !user
       ? res.status(404).json({ message: 'No user with this id!' })
       : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },

  // remove a friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId }  },
      { new: true }
    )
    .then((user) =>
       !user
       ? res.status(404).json({ message: 'No user with this id!' })
       : res.json(user)
    )
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  },
};