# Database Setup Instructions

## Step 1: Run the Database Seeder

1. **Open your Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the "SQL Editor" section

2. **Run the Seeder Script**
   - Copy the entire content of `supabase/seed_data.sql`
   - Paste it into the SQL Editor
   - Click "Run" to execute the script

3. **Verify the Data**
   - Check the "Table Editor" to see that all tables now have data
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

## Step 4: Authentication Setup

The authentication system is configured to work with Supabase Auth. When users register through the app, they will be automatically:

1. Created in Supabase Auth
2. Added to the custom `users` table
3. Assigned appropriate roles
4. Linked to the marketplace tenant

## Troubleshooting

If you encounter any issues:

1. **Check Supabase Connection**: Ensure your environment variables are set
2. **Verify RLS Policies**: Make sure Row Level Security is properly configured
3. **Check Console**: Look for any JavaScript errors in the browser console
4. **Database Permissions**: Ensure your Supabase user has the necessary permissions

## Next Steps

After running the seeder:

1. Try logging in with the test accounts
2. Browse the marketplace to see the products
3. Test the admin dashboard with the super admin account
4. Create new products and orders to test functionality