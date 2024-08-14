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

exports.createUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing up:", error);
      throw error;
    }

    console.log("Auth Response:", data);

    if (!data.user) {
      console.error("Auth Response does not contain user data");
      throw new Error("User creation failed");
    }

    return data;
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

exports.insertUserDetails = async (userDetails) => {
  const {
    auth_user_id,
    full_name,
    handle,
    email,
    telephone,
    profile_pic,
    birthday,
    bio,
    country,
    city,
    county,
  } = userDetails;

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        auth_user_id,
        full_name,
        handle,
        email,
        telephone,
        profile_pic,
        birthday,
        bio,
        country,
        city,
        county,
      },
    ])
    .select("*");

  if (error) {
    console.error("Error inserting user details:", error);
    throw error;
  }

  return data[0];
};

exports.signInUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing in:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in signInUser", error);
    throw error;
  }
};

exports.authenticateUser = async (token) => {

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new Error('Invalid token');
    }

    return user;
    
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (user_id) => {

  const trimmedID = user_id.trim();
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", trimmedID)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

  if (!data) {
    console.error("No user found with the provided auth_user_id.");
    throw new Error("No user found with the provided auth_user_id.");
  }

  return data;
};

exports.logUserOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error('Error during sign out');
    }

    return {"message": "Signed out successfully."};
  } catch (error) {
    console.error("Error signing out", error);
    next(error);
  }
}

exports.deleteUserById = async (userId) => {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(error.message);
  }

  return { message: 'User deleted successfully' };
}