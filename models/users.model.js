const supabase = require("../config/supabase");

exports.fetchUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("is_test_data", true);

  if (error) {
    throw error;
  }

  return data;
};
