# 🚨 COMPLETE SETUP GUIDE - JefJel Authentication

## ⚠️ CRITICAL: Follow ALL steps in order!

### Step 1: Verify Supabase Connection
1. Make sure you clicked **"Connect to Supabase"** in the top right corner
2. Verify you have a `.env` file with your Supabase credentials

### Step 2: Create Authentication User (REQUIRED!)
**🔴 This step is MANDATORY - the app will not work without it!**

1. **Open your Supabase Dashboard**
2. **Go to Authentication → Users**
3. **Click "Add User"**
4. **Fill in EXACTLY:**
   - Email: `admin@jeffel.com`
   - Password: `password123`
   - ✅ **Email Confirm: MUST be checked**
5. **Click "Create User"**
6. **Verify** the user appears in the list with a green checkmark

### Step 3: Run Database Setup Script
1. **Go to your Supabase Dashboard**
2. **Navigate to SQL Editor**
3. **Copy the ENTIRE content** of `supabase/fix_auth_setup.sql`
4. **Paste it** into the SQL Editor
5. **Click "Run"** to execute

### Step 4: Test Login
1. **Go to** `http://localhost:5173/auth/login`
2. **Login with:**
   - Email: `admin@jeffel.com`
   - Password: `password123`

## 🔧 Troubleshooting

### "Invalid login credentials" Error
- ✅ Check: User exists in Supabase Dashboard → Authentication → Users
- ✅ Check: Email is confirmed (green checkmark)
- ✅ Check: You used the exact email `admin@jeffel.com`

### "User not found" Error
- ❌ You skipped Step 2 - go back and create the user in Auth Dashboard
- ❌ You used a different email - must be exactly `admin@jeffel.com`

### "JSON object requested, multiple rows returned"
- ❌ You didn't run the SQL script from Step 3
- ❌ Run `supabase/fix_auth_setup.sql` in SQL Editor

## 📝 Additional Test Users

After the main setup works, you can create these additional test users:

**Customer Account:**
- Email: `aminata@example.com`
- Password: `password123`

**Another Customer:**
- Email: `moussa@example.com` 
- Password: `password123`

## ⚡ Quick Fix Commands

If you're still having issues, run these in Supabase SQL Editor:

```sql
-- Check if user exists in custom table
SELECT * FROM users WHERE email = 'admin@jeffel.com';

-- Check if user has roles
SELECT u.email, r.name as role 
FROM users u 
JOIN user_roles ur ON u.id = ur.user_id 
JOIN roles r ON ur.role_id = r.id 
WHERE u.email = 'admin@jeffel.com';
```

## 🎯 Success Indicators

You'll know it's working when:
- ✅ Login page accepts `admin@jeffel.com` / `password123`
- ✅ You're redirected to the homepage after login
- ✅ You see "Super Administrateur" in the top right corner
- ✅ You can access `/dashboard` without errors

---

**🚨 Remember: You MUST create the user in Supabase Auth Dashboard FIRST, then run the SQL script!**