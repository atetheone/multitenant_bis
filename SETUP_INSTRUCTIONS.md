## Database Setup Instructions

### ⚠️ IMPORTANT: You MUST complete ALL steps below for login to work!

### Step 1: Configure Supabase Connection

1. **Check Environment Variables**
   - Make sure you have clicked "Connect to Supabase" in the top right corner
   - Or manually create a `.env` file with:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Step 2: Create Authentication User

**🔴 CRITICAL STEP**: You must create the user in Supabase Auth first!

1. **Go to Supabase Dashboard → Authentication → Users**
2. **Click "Add User"**
3. **Enter:**
   - Email: `admin@jeffel.com`
   - Password: `password123`
   - Email Confirm: ✅ (checked)
4. **Click "Create User"**
5. **Verify the user appears in the users list with a green checkmark**

### Step 3: Run the Database Setup Script

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the "SQL Editor" section

2. **Run the Setup Script**
   - Copy the entire content of `supabase/fix_auth_setup.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

### Step 4: Verify the Setup

1. **Check Authentication**
   - Go to Supabase Dashboard → Authentication → Users
   - You should see `admin@jeffel.com` in the users list

2. **Check Custom Tables**
   - Go to Table Editor
   - Verify that `users`, `user_profiles`, `user_roles`, `user_tenants` tables have data

### Step 5: Test Login

1. **Try logging in** with:
   - Email: `admin@jeffel.com`
   - Password: `password123`

### Troubleshooting

**If you get "Invalid login credentials":**
1. Verify the user exists in Supabase Dashboard → Authentication → Users
2. Make sure the email is confirmed (green checkmark)
3. Try resetting the password in the Auth dashboard

**If you get "JSON object requested, multiple (or no) rows returned":**
1. Make sure you ran the `fix_auth_setup.sql` script
2. Check that the user exists in the `public.users` table
3. Verify the user has entries in `user_profiles`, `user_roles`, and `user_tenants`

**If profile fetching fails:**
1. Check Row Level Security policies on your tables
2. Ensure the user has proper permissions
3. Verify the database schema is up to date

### Important Notes

- **You MUST create the user in Supabase Auth first** before running the SQL script
- The SQL script only creates the custom table entries, not the auth user
- This is for development/testing only - use proper signup in production
- All test accounts use `password123` as the password