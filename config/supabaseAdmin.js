require('dotenv').config()
const { createClient } = require('@supabase/supabase-js');

exports.supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);