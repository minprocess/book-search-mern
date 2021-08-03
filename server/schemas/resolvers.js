const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');

// From user-controller.js
// getSingleUser
// createUser
// login
// saveBook
// deleteBook

const resolvers = {

/*
	Query type:
		me: Returns a User type.
*/

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('books');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
   },

/*
	Mutation type:
    addUser: Accepts a username, email, and password as parameters; returns an `Auth` type.
    login: Accepts an email and password as parameters; returns an `Auth` type.
    saveBook: Accepts a book author's array, description, title, bookId, image, and link as parameters; returns a `User` type. (Look into creating what's known as an `input` type to handle all of these parameters!)
    removeBook: Accepts a book's `bookId` as a parameter; returns a `User` type.
*/

  Mutation : {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    /*
    From readme: 'saveBook' accepts 
      book author array, 
      description,
      title,
      bookId, 
      image, 
      link
    as parameters; returns a `User` type. (Look into creating 
    what's known as an `input` type to handle all of these parameters!)
    */
      // replaces saveBook in user-controller.js which is REST api
    saveBook: async (parent, { body }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: body} },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    /*
    // This is the original REST API route
    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware function
    async saveBook({ user, body }, res) {
      console.log(user);
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: body } },
          { new: true, runValidators: true }
        );
        return res.json(updatedUser);
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    },
    */

    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new :true }
        );

        return updatedUser;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },  // End of Mutation:

};

module.exports = resolvers;

