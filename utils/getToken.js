const supabase = require("../config/supabase");

exports.getToken = async (email, password) => {
    console.log(supabase.auth, "<<<<");
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Error signing in:", error);
    throw error;
  }

  return data.session.access_token;
};
