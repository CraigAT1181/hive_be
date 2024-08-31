const supabase = require("../config/supabase");

exports.fetchPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    throw error;
  }

  return data;
};
