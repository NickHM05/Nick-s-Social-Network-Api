const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create a course model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdat: {
      type: Date,
      default: Date.now,
      get: createdatVal => moment(createdatVal).format("MMM DD, YYYY")
    },
    username: {
      type: String,
      required: true,
    },

    reactions: [
      reactionSchema
    ],
    // endDate: {
    //   type: Date,
    //   // Sets a default value of 12 weeks from now
    //   default: () => new Date(+new Date() + 84 * 24 * 60 * 60 * 1000),
    // },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

// thoughtSchema.virtual('reactionCount').get(function() {
//   return this.reactions.length;
// })

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
