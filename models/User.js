const { Schema, model, Types } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
  },
  {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false,
  }
);

// create the User model using the userSchema
const User = model('user', userSchema);

// get total count of friends
userSchema
  .virtual('friendCount')
  .get(function(){
    return this.friends.length
});

module.exports = User;