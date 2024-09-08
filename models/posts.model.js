const supabase = require("../config/supabase");

exports.fetchPosts = async () => {
    const { data, error } = await supabase
    .from('posts')
    .select(`
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
    `)
    
    .order('created_at', { ascending: false });
  
    if (error) {
        throw error;
      }

  return data;
};

exports.fetchPostWithParent = async (postId) => {
    const { data: post, error: postError } = await supabase
    .from('posts')
    .select(`
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
    `)
    .eq('id', postId)
    .single();

    if (postError) throw postError;

    console.log(post);
    return post;
}

exports.fetchReplies = async (postId) => {
    const { data: replies, error: repliesError } = await supabase
    .from('posts')
    .select(`
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
    `)
    .eq('parent_id', postId)
    .order('created_at', { ascending: true });

    if (repliesError) throw repliesError;

    console.log(replies);
    return replies;
}

exports.postNewPost = async (postDetails) => {

    const {
user_id,
parent_id,
content,
is_reply,
page,
region,
    } = postDetails;
  
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
  
    return data[0];
  };

  exports.uploadPostMedia = async (post_id, files) => {
    try {
      const fileNames = `${authUserId}/${Date.now()}_${file.originalname}`;
  
      const { data, error } = await supabase.storage
      .from('post-media')
      .upload(fileNames, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: files.mimetype,
      });
  
      if (error) {
        console.error("Error uploading profile picture:", error);
        throw error;
      }
  
      const { data: publicUrlData } = supabase
        .storage
        .from('profile-pictures')
        .getPublicUrl(fileName);
  
      return publicUrlData.publicUrl;
  
    } catch (error) {
      console.error("Error in uploadProfilePicture:", error);
      throw error;
    }
  }