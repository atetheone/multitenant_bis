## Database Setup Instructions

### Step 1: Configure Supabase Connection

1. **Check Environment Variables**
   - Make sure you have clicked "Connect to Supabase" in the top right corner
   - Or manually create a `.env` file with:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

### Step 2: Run the Simple Authentication Seeder

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the "SQL Editor" section

2. **Run the Simple Seeder Script**
   - Copy the entire content of `supabase/simple_auth_seed.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

   **This script creates:**
   - A test user in Supabase Auth: `admin@jeffel.com` / `password123`
   - Corresponding user record in your custom tables
   - Basic roles and tenant setup

### Step 3: Verify the Setup

1. **Check Authentication**
   - Go to Supabase Dashboard → Authentication → Users
   - You should see `admin@jeffel.com` in the users list

2. **Check Custom Tables**
   - Go to Table Editor
   - Verify that `users`, `roles`, `tenants` tables have data

### Step 4: Test Login

1. **Try logging in** with:
   - Email: `admin@jeffel.com`
   - Password: `password123`

### Troubleshooting

If you still get "Invalid login credentials":

1. **Check Supabase Connection**
   - Verify your environment variables are set correctly
   - Check browser console for configuration errors

2. **Verify User Creation**
   - In Supabase Dashboard → Authentication, confirm the user exists
   - Check that the user's email is confirmed (should show green checkmark)

3. **Check RLS Policies**
   - Ensure your tables have proper Row Level Security policies
   - The seeder creates basic data but RLS might block access

4. **Browser Console**
   - Check for any JavaScript errors
   - Look for Supabase connection issues

### Next Steps

Once login works:
1. You can run the full `supabase/seed_data.sql` for complete test data
2. Create additional users through the registration form
3. Set up proper RLS policies for production use

### Important Notes

- The simple seeder creates minimal data for authentication testing
- Password is `password123` for all test accounts
- This is for development/testing only - use proper signup in production