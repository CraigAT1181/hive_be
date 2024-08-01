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

    console.log("Auth Response:", data); // Log the response data

    if (!data.user) {
      console.error("Auth Response does not contain user data");
      throw new Error("User creation failed");
    }

    return data; // Return the user ID
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

// Function to insert user details into the database
exports.insertUserDetails = async (userDetails) => {
  const {
    id,
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
        id,
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
    .select("*"); // Ensure we get the inserted row back

  if (error) {
    console.error("Error inserting user details:", error);
    throw error;
  }

  return data[0]; // Return the inserted user details
};

// Function to fetch user details by ID
exports.getUserById = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single(); // Use .single() to get a single object instead of an array

  if (error) {
    console.error("Error fetching user:", error);
    throw error;
  }

  return data;
};
