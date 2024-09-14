const {
  fetchPosts,
  fetchPostWithParent,
  fetchReplies,
  postNewPost,
  uploadPostMedia,
  savePostMedia,
} = require("../models/posts.model");

exports.getPosts = async (req, res, next) => {
  try {
    const { room } = req.params;
    console.log(room);
    const data = await fetchPosts(room);
    
    if (data) {
      res.status(200).send({ posts: data });
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    next(error);  // Pass the error to the error-handling middleware
  }
};

exports.getSinglePost = async (req, res, next) => {
  const {postId} = req.params;

  try {
    // Fetch the specific post and its parent
    const {post, parentPost} = await fetchPostWithParent(postId);
    
    // Fetch replies (children posts)
    const replies = await fetchReplies(postId);

    // Combine the results
    res.status(200).json({ post, parentPost, replies });
  } catch (error) {
    console.error("Error fetching single post or replies:", error);
    next(error);
  }
};

exports.addPost = async (req, res, next) => {
  try {
    const { user_id, parent_id, content, is_reply, room, region } = req.body;
    const postDetails = {
      user_id,
      parent_id: parent_id || null,
      content,
      is_reply,
      room,
      region,
    };

    const files = req.files;
    const newPost = await postNewPost(postDetails);
    const post_id = newPost.id;

    let mediaURLs = [];

    if (files && files.length > 0) {
      mediaURLs = await uploadPostMedia(post_id, files);
      await savePostMedia(post_id, mediaURLs);
    }

    res.status(200).json({ post: newPost, mediaURLs });
  } catch (error) {
    console.error("Error adding new post:", error);
    next(error);
  }
};
