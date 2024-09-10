const supabase = require("../config/supabase");

exports.fetchPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      content,
      created_at,
      updated_at,
      parent_id,
      is_reply,
      likes_count,
      retweets_count,
      page,
      region,
      reply_count,
      users (
        profile_pic,
        full_name,
        handle
      ),
      media (
        media_url
      )
    `
    )

    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

exports.fetchPostWithParent = async (postId) => {
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select(
      `
        id,
        content,
        created_at,
        updated_at,
        parent_id,
        is_reply,
        likes_count,
        retweets_count,
        page,
        region,
        reply_count,
        users (
            profile_pic,
            full_name,
            handle
        ),
        media (
            media_url
        ),
        parentPost:parent_id (
            id,
            content,
            created_at,
            updated_at,
            is_reply,
            likes_count,
            retweets_count,
            page,
            region,
            reply_count,
            users (
                profile_pic,
                full_name,
                handle
            ),
            media (
                media_url
            )
        )
    `
    )
    .eq("id", postId)
    .single();

  if (postError) throw postError;

  console.log(post);
  return post;
};

exports.fetchReplies = async (postId) => {
  const { data: replies, error: repliesError } = await supabase
    .from("posts")
    .select(
      `
        id,
        content,
        created_at,
        updated_at,
        parent_id,
        is_reply,
        likes_count,
        retweets_count,
        page,
        region,
        reply_count,
        users (
            profile_pic,
            full_name,
            handle
        ),
        media (
            media_url
        )
    `
    )
    .eq("parent_id", postId)
    .order("created_at", { ascending: true });

  if (repliesError) throw repliesError;

  console.log(replies);
  return replies;
};

exports.postNewPost = async (postDetails) => {
  const { user_id, parent_id, content, is_reply, page, region } = postDetails;

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id,
        parent_id,
        content,
        is_reply,
        page,
        region,
      },
    ])
    .select("*");

  if (error) {
    console.error("Error adding new post:", error);
    throw error;
  }
  console.log("New Post", data[0]);

  return data[0];
};

exports.uploadPostMedia = async (post_id, files) => {
  try {
    let mediaURLs = [];

    for (const file of files) {
      const fileName = `${post_id}/${Date.now()}_${file.originalname}`;

      const { data, error } = await supabase.storage
        .from("post-media")
        .upload(fileName, file.buffer, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.mimetype,
        });

      if (error) {
        console.error("Error uploading media file:", error);
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from("post-media")
        .getPublicUrl(fileName);

      if (publicUrlData) {
        mediaURLs.push(publicUrlData.publicUrl);
      }
    }

    return mediaURLs;
  } catch (error) {
    console.error("Error in uploadProfilePicture:", error);
    throw error;
  }
};

exports.savePostMedia = async (post_id, mediaURLs) => {
  try {
    const mediaEntries = mediaURLs.map((url) => ({
      post_id,
      media_url: url,
    }));
    console.log("Post ID:", post_id);
    console.log("Media URLs:", mediaURLs);

    const { data, error } = await supabase
      .from("media")
      .insert(mediaEntries);

    if (error) {
      console.error("Error saving media URLs:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in savePostMedia:", error);
    throw error;
  }
};
