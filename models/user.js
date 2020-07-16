const bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false, // tells whether or not the user model can be empty (false means can't)
      unique: true, // makes it so that you can't use the same email for multiple accs
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // compares pass from bcrypt and the object above
  // created a custom .validPassword, which compares the password sent and matches the hashed password AFTER it is unhashed.
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null // no extra callback after
    );
  });

  return User;
};
