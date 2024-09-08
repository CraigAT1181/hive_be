const { fetchPosts, fetchPostWithParent, fetchReplies, postNewPost, uploadPostMedia } = require("../models/posts.model");

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

exports.addPost = async (req, res, next) => {
  try {
    const {
      user_id,
      parent_id,
      content,
      is_reply,
      page,
      region,
    } = req.body;

    const postDetails = {user_id, parent_id, content, is_reply, page, region};
    
    const files = req.file;

    const newPost = await postNewPost(postDetails);

    const post_id = newPost.post_id;

    let mediaURLs = [];

    if (files) {
      mediaURLs = await uploadPostMedia(post_id, files)
    }


    res.status(200).json({post, mediaURLs})

  } catch (error) {
    next(error);
  }
}