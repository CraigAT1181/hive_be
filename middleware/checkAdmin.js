exports.checkAdmin = (req, res, next) => {
    const user = req.user;
  
    if (user && user.user_metadata && user.user_metadata.role === 'admin') {
      next();
    } else {
      res.status(403).json({ error: 'Access denied' });
    }
  };
  