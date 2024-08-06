exports.checkAdmin = (req, res, next) => {
  const user = req.user;

  // Debugging logs
  console.log('User:', user);
  console.log('User metadata:', user?.user_metadata);
  console.log('User role:', user?.user_metadata?.role);

  if (user && user.user_metadata && user.user_metadata.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied' });
  }
};
