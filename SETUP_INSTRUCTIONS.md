# Database Setup Instructions

## Step 1: Run the Database Seeder

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the "SQL Editor" section

2. **Run the Seeder Script**
   - Copy the entire content of `supabase/seed_data.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

   **IMPORTANT**: This script creates users in both Supabase Auth and your custom tables, which is required for authentication to work properly.

3. **Verify the Data**
   - Check the "Table Editor" to see that all tables now have data
   - Check the "Authentication" section to see the created users
   - You should see users, products, tenants, roles, etc.

## Step 2: Test Login Credentials

After running the seeder, you can use these test accounts:

### Super Admin
- **Email**: `admin@jeffel.com`
- **Password**: `password123`
- **Access**: Full platform administration

### Sample Customers
- **Email**: `aminata@example.com` / **Password**: `password123`
- **Email**: `moussa@example.com` / **Password**: `password123`
- **Email**: `fatou@example.com` / **Password**: `password123`

### Vendor Admins
- **Email**: `marie@example.com` / **Password**: `password123` (Tech Paradise)
- **Email**: `pierre@example.com` / **Password**: `password123` (Éco Produits)

### Delivery Person
- **Email**: `amadou@example.com` / **Password**: `password123`

## Step 3: What's Included

The seeder creates:

- **4 Tenants**: JefJel Marketplace (main), Tech Paradise, Éco Produits, Fashion Sénégal
- **7 Users**: 1 Super Admin, 3 Customers, 2 Vendor Admins, 1 Delivery Person
- **8 Products**: Electronics, eco-friendly products, African fashion
- **Complete Role System**: 5 roles with 29 granular permissions
- **Sample Orders**: Order history with items and delivery information
- **Delivery Zones**: 7 zones covering Senegal
- **Categories**: 6 product categories
- **Authentication Users**: All users are created in Supabase Auth for login

## Step 4: Authentication Setup

The authentication system is now properly configured:

1. **Supabase Auth Users**: All test users are created in the auth.users table
2. **Custom User Data**: Extended user information in your custom tables
3. **Role Assignment**: Users are automatically assigned appropriate roles
4. **Tenant Association**: Users are linked to their respective tenants

## Troubleshooting

If you still encounter login issues:

1. **Check Supabase Connection**: Ensure your environment variables are set correctly
2. **Verify Auth Users**: In Supabase Dashboard > Authentication, check if users exist
3. **Check Console**: Look for any JavaScript errors in the browser console
4. **RLS Policies**: Ensure Row Level Security policies allow the operations
5. **Email Confirmation**: The seeder sets email_confirmed_at, so no email confirmation is needed

## Next Steps

After running the seeder:

1. Try logging in with `admin@jeffel.com` / `password123`
2. Browse the marketplace to see the products
3. Test the admin dashboard with the super admin account
4. Create new products and orders to test functionality

## Important Notes

- All test accounts use the password `password123`
- Users are created in both Supabase Auth and custom tables
- Email confirmation is automatically set to avoid email verification
- The marketplace tenant serves as the main platform aggregator