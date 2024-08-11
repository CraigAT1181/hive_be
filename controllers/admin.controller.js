// const supabaseAdmin = require('../config/supabaseAdmin');

// exports.createAdminUser = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const { user, error } = await supabaseAdmin.auth.api.createUser({
//       email,
//       password,
//       email_confirm: true,
//       user_metadata: { role: 'admin' }
//     });

//     if (error) {
//       throw error;
//     }

//     res.status(201).json({ user });
//   } catch (error) {
//     console.error('Error creating admin user:', error);
//     res.status(400).json({ error: error.message });
//   }
// };


