const { User, Thought } = require('../models');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
      Thought.find()
        .sort({ createdAt: -1 })
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
  
    // Get a single thought
    getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    // create a new thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id }  },
                { new: true }
            );
        })
        .then((user) =>
         !user
         ? res.status(404).json({ message: 'Thought has been created but no user with this id!' })
         : res.json({ message: 'Thought has been created!' })
        )
        .catch((err) => res.status(500).json(err));
    },
  
    // update a thought
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      .then((thought) =>
         !thought
         ? res.status(404).json({ message: 'No thought with this id!' })
         : res.json(thought)
      )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
    },
  
    // Delete a thought
    deleteThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' })
            }

            return User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }  },
                { new: true }
            )
        })
        .then((user) =>
           !user
           ? res.status(404).json({ message: 'Thought has been deleted but no user with this id!' })
           : res.json({ message: 'Thought has been deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    },
  
    // add a reaction
    addReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }  },
        { runValidators: true, new: true }
      )
      .then((thought) =>
         !thought
         ? res.status(404).json({ message: 'No thought with this id!' })
         : res.json(thought)
        )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    },
  
    // remove a reaction
    removeReaction(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: {reactionId: req.params.reactionId }} },
        { runValidators: true, new: true }
      )
      .then((thought) =>
         !thought
         ? res.status(404).json({ message: 'No thought with this id!' })
         : res.json(thought)
      )
      .catch((err) => {
          console.log(err);
          res.status(500).json(err);
      });
    },
};