const { fetchPosts } = require("../models/posts.model");

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await fetchPosts();
    
    res.status(200).send({posts});
  } catch (error) {
    next(error);
  }
};
