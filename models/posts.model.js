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
    .select('*, parentPost:parent_id(*)')
    .eq('id', postId)
    .single();

    if (postError) throw postError;

    console.log(post);
    return post;
}

exports.fetchReplies = async (postId) => {
    const { data: replies, error: repliesError } = await supabase
    .from('posts')
    .select('*')
    .eq('parent_id', postId)
    .order('created_at', { ascending: true });

if (repliesError) throw repliesError;

console.log(replies);
return replies;
}