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
