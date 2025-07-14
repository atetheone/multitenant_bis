-- Simple Authentication Seed Script
-- This creates a test user directly in Supabase Auth
-- Run this in your Supabase SQL Editor

-- First, let's create the test user in auth.users
-- Note: This approach works for testing but in production you should use proper signup

DO $$
DECLARE
    user_id uuid;
BEGIN
    -- Generate a UUID for our test user
    user_id := gen_random_uuid();
    
    -- Insert into auth.users (this is the Supabase Auth table)
    INSERT INTO auth.users (
        id,
        instance_id,
        email,
        encrypted_password,
        email_confirmed_at,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token,
        aud,
        role
    ) VALUES (
        user_id,
        '00000000-0000-0000-0000-000000000000',
        'admin@jeffel.com',
        crypt('password123', gen_salt('bf')), -- This hashes the password
        now(),
        now(),
        now(),
        '',
        '',
        '',
        '',
        'authenticated',
        'authenticated'
    ) ON CONFLICT (email) DO NOTHING;
    
    -- Insert into auth.identities
    INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        created_at,
        updated_at
    ) VALUES (
        gen_random_uuid(),
        user_id,
        jsonb_build_object('sub', user_id::text, 'email', 'admin@jeffel.com'),
        'email',
        now(),
        now()
    ) ON CONFLICT (provider, id) DO NOTHING;
    
    -- Now create our custom user record
    INSERT INTO users (
        email,
        username,
        first_name,
        last_name,
        password,
        status,
        created_at,
        updated_at
    ) VALUES (
        'admin@jeffel.com',
        'admin',
        'Super',
        'Admin',
        '', -- We don't store the actual password here
        'active',
        now(),
        now()
    ) ON CONFLICT (email) DO NOTHING;
    
    -- Create user profile
    INSERT INTO user_profiles (
        user_id,
        bio,
        phone,
        avatar_url,
        website,
        created_at,
        updated_at
    ) 
    SELECT 
        u.id,
        'Super administrateur de la plateforme JefJel',
        '+221 77 123 45 67',
        null,
        'https://jeffel.com',
        now(),
        now()
    FROM users u 
    WHERE u.email = 'admin@jeffel.com'
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Create default tenant (marketplace)
    INSERT INTO tenants (
        slug,
        name,
        domain,
        description,
        status,
        rating,
        product_count,
        is_featured,
        created_at,
        updated_at
    ) VALUES (
        'jeffel-marketplace',
        'JefJel Marketplace',
        'marketplace.jeffel.com',
        'La plateforme e-commerce multilocataire du Sénégal',
        'active',
        5.0,
        0,
        true,
        now(),
        now()
    ) ON CONFLICT (slug) DO NOTHING;
    
    -- Create super admin role
    INSERT INTO roles (
        name,
        tenant_id,
        created_at,
        updated_at
    ) VALUES (
        'super_admin',
        null, -- Global role
        now(),
        now()
    ) ON CONFLICT (name, tenant_id) DO NOTHING;
    
    -- Create customer role
    INSERT INTO roles (
        name,
        tenant_id,
        created_at,
        updated_at
    ) VALUES (
        'customer',
        null, -- Global role
        now(),
        now()
    ) ON CONFLICT (name, tenant_id) DO NOTHING;
    
    -- Assign super admin role to our test user
    INSERT INTO user_roles (
        user_id,
        role_id,
        created_at,
        updated_at
    )
    SELECT 
        u.id,
        r.id,
        now(),
        now()
    FROM users u, roles r
    WHERE u.email = 'admin@jeffel.com' 
    AND r.name = 'super_admin'
    ON CONFLICT (user_id, role_id) DO NOTHING;
    
    -- Associate user with default tenant
    INSERT INTO user_tenants (
        user_id,
        tenant_id,
        created_at,
        updated_at
    )
    SELECT 
        u.id,
        t.id,
        now(),
        now()
    FROM users u, tenants t
    WHERE u.email = 'admin@jeffel.com' 
    AND t.slug = 'jeffel-marketplace'
    ON CONFLICT (user_id, tenant_id) DO NOTHING;
    
    RAISE NOTICE 'Test user created successfully: admin@jeffel.com / password123';
    
END $$;