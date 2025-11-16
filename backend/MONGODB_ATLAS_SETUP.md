# MongoDB Atlas Setup Guide

This guide will help you set up MongoDB Atlas for your e-commerce application.

## Step 1: Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create your account

## Step 2: Create a Cluster

1. After logging in, click "Build a Database"
2. Choose the **FREE** tier (M0 Sandbox)
3. Select a cloud provider and region (choose closest to you)
4. Click "Create Cluster"
5. Wait for the cluster to be created (2-3 minutes)

## Step 3: Create Database User

1. In the Security section, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter a username and generate a secure password (save this!)
5. Set user privileges to "Atlas admin" or "Read and write to any database"
6. Click "Add User"

## Step 4: Whitelist IP Address

1. In the Security section, click "Network Access"
2. Click "Add IP Address"
3. For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - **Note**: For production, use specific IP addresses
4. Click "Confirm"

## Step 5: Get Connection String

1. Click "Clusters" in the left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and version "5.5 or later"
5. Copy the connection string
   - It will look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

## Step 6: Update Your .env File

1. Open `backend/.env`
2. Replace the connection string:
   ```
   MONGO_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```
   - Replace `yourusername` with your database username
   - Replace `yourpassword` with your database password
   - Replace `cluster0.xxxxx` with your cluster name
   - Add `/ecommerce` before the `?` to specify the database name

## Step 7: Test Connection

1. Start your backend server:
   ```bash
   cd backend
   npm run dev
   ```

2. You should see "MongoDB Connected" in the console

## Troubleshooting

### Connection Timeout
- Check if your IP address is whitelisted
- Verify the connection string is correct
- Check if your firewall is blocking the connection

### Authentication Failed
- Verify username and password are correct
- Make sure special characters in password are URL-encoded
- Check if the database user has proper permissions

### Network Error
- Ensure you're using the correct connection string format
- Check if MongoDB Atlas cluster is running
- Verify network access settings

## Security Best Practices

1. **Never commit `.env` files** to version control
2. Use **strong passwords** for database users
3. **Restrict IP access** in production (don't use 0.0.0.0/0)
4. **Rotate passwords** regularly
5. Use **environment variables** for all sensitive data

## Production Considerations

- Use a dedicated cluster (not free tier)
- Enable backup and monitoring
- Set up alerts for unusual activity
- Use VPC peering for better security
- Implement connection pooling
- Monitor database performance

