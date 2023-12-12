const { User, Champion } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('champions')
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('champions');
        },
        champions: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Champion.find(params).sort({ createdAt: -1 });
        },
        champion: async (parent, { championId }) => {
            return Champion.findOne({ _id: championId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw AuthenticationError
            }

            const token = signToken(user);

            return { token, user };
        },
        // The below mutation is for the container were gonna have of favorites that the user is gonna have. Do we also need to have a mutation to add the champions into that container?
        removeChampion: async (parent, { thoughtId }) => {
            return champion.findOneAndDelete({ _id: thoughtId });
        },
    }
};

module.exports = resolvers;