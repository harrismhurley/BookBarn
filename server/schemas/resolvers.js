const resolvers = {
    Query: {
      users: async () => {
        return User.find({});
      },
      user: async (parent, { id }) => {
        return User.findById(id);
      },
    },
    Mutation: {
      addUser: async (parent, { username, email, password }) => {
        const user = new User({ username, email, password });
        await user.save();
        return user;
      },
      addBook: async (parent, { userId, bookInput }) => {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        user.savedBooks.push(bookInput);
        await user.save();
        return user;
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('Invalid credentials');
        }
        const valid = await user.isCorrectPassword(password);
        if (!valid) {
          throw new AuthenticationError('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: '1h' });
        return { token, user };
      },
    },
    User: {
      bookCount: (parent) => parent.savedBooks.length,
    },
  };
  
  module.exports = resolvers;