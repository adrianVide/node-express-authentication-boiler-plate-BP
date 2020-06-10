const User = require('../models/user')

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
      return res.status(422).send(
      { error: 'You must provide email and password' }
    )
  }

  //See if the user / email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    //Error if the user with that email exists
    if (existingUser) {
      return res.status(422).send({ error: "Email already registered" });
    }
    //Create user record if the user doesn't exist
    const user = new User({
      email: email,
      password: password,
    });

    user.save(function (err) {
      if (err) {
        return next(err);
      }
      res.json(user);
    });
    //Respond with success when created
  });
};
