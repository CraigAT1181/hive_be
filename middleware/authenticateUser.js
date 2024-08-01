const supabase = require('../config/supabase');

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token missing' });
  }

  try {
    const { data: user, error } = await supabase.auth.getUser(token);

    if (error) {
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};
