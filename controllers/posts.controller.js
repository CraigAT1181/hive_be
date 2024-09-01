const { fetchPosts, fetchPostWithParent, fetchReplies } = require("../models/posts.model");

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

exports.getSinglePost = async (req, res, next) => {
    const postId = req.params.postId;

    try {
        // Fetch the specific post and its parent
const postWithParent = await fetchPostWithParent(postId);

        // Fetch replies (children posts)
const replies = await fetchReplies(postId);

        // Combine the results
        res.status(200).json({ postWithParent, replies });
    } catch (error) {
        next(error);
    }
}