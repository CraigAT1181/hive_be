const { fetchPosts } = require("../models/posts.model");

exports.getPosts = async (req, res, next) => {
  try {
    const data = await fetchPosts();
    if (data) {
        res.status(200).send({"posts": data});
    }
    
  } catch (error) {
    next(error);
  }
};
