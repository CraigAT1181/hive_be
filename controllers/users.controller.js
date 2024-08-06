const { fetchUsers } = require("../models/users.model");
const { createUser, insertUserDetails } = require("../models/users.model");

exports.getUsers = async (req, res, next) => {
  try {
    const users = await fetchUsers();
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  try {
    const { email, password, full_name, handle, telephone, profile_pic, birthday, bio, country, city, county } = req.body;
    // Create user with authentication
    const authData = await createUser(email, password);

    // Check if authData contains user property
    if (!authData.user) {
      return res.status(400).json({ error: 'User creation failed' });
    }

    const authUserId = authData.user.id;

    const userDetails = {
      auth_user_id: authUserId,
      full_name,
      handle,
      email,
      telephone,
      profile_pic,
      birthday,
      bio,
      country,
      city,
      county
    };

    const user = await insertUserDetails(userDetails);

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};


