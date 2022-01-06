const { UserList, MovieList } = require("../FakeData");
const _ = require("lodash");

const resolvers = {
  Query: {
    //USER RESOLVERS
    users: (parent, args, context, info) => {
      // We are basically setting up two options for the query or two possibilities: is the successful one and the other one is the error
      if (UserList) return { users: UserList }; // this is the first option

      return { message: "Yo. there was an error" }; // this is the second option error
    },
    user: (parent, args, context, info) => {
      const id = args.id;
      const user = _.find(UserList, {
        id: Number(id),
      });
      return user;
    },

    //MOVIE RESOLVERS
    movies: () => {
      return MovieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(MovieList, {
        name: name,
      });
      return movie;
    },
  },

  User: {
    favoriteMovies: () => {
      return _.filter(MovieList, (movie) => {
        return (
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
        );
      });
    },
  },

  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = UserList[UserList.length - 1].id;
      user.id = lastId + 1;
      UserList.push(user);
      return user;
    },

    updateUsername: (parent, args) => {
      // const id = args.input.id;
      // const newUserName = args.input.newUserName;
      //same logic as above

      const { id, newUsername } = args.input;
      let userUpdated;

      UserList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;

          userUpdated = user;
        }
      });

      return userUpdated;
    },

    deleteUser: (parent, args) => {
      const id = args.id;
      _.remove(UserList, (user) => user.id === Number(id));
      return null;
    },
  },

  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersSuccessfulResult";
      }
      if (obj.message) {
        return "UsersErrorResult";
      }

      return null;
    },
  },
};

// UsersResult is the resolver function for the Union Boxes back in typedefs. Return the actual string of the two possibilities UsersSuccessfulResult will return the same value.

// remember when using callback functions always return values ALWAYS. because i encountered a bug in graphql that when I tried to call a callback function without adding the 'return' word it doesn't work
module.exports = { resolvers };
