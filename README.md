# Venite University Founder's Week
Premium full-stack event & voting platform for Venite University.

## Setup Instructions

### 1. Vercel Deployment Checklist
1. Create a new project in Vercel.
2. Link your Git repository.
3. In the Vercel dashboard, go to Settings -> Environment Variables.
4. Add all required variables from \`.env.example\`.
5. Ensure the \`NEXT_PUBLIC_APP_URL\` is set to your production Vercel URL.
6. Deploy the exact code. Prisma will automatically generate the client during the build phase via \`postinstall\` or standard build commands, but it's recommended to ensure Vercel runs \`prisma generate && next build\`.

### 2. Neon Database Setup
1. Create an account on Neon (https://neon.tech).
2. Create a new Postgres project.
3. Copy the \`DATABASE_URL\` connection string. 
4. In your local terminal, run: \`npx prisma db push\` to initialize the tables.
5. Save the \`DATABASE_URL\` in Vercel environment variables.

### 3. Paystack Configuration
1. Login to the Paystack Dashboard.
2. Go to Settings -> API Keys & Webhooks.
3. Copy your Secret Key and add it to \`PAYSTACK_SECRET_KEY\`.
4. Run \`NEXT_PUBLIC_APP_URL\` properly to accept redirects.
5. In Paystack Settings, add the Webhook URL: \`https://your-domain.com/api/paystack/webhook\`. This is required so transactions can asynchronously settle.

### 4. Admin Access
- The Admin dashboard is protected by Basic Auth.
- Configure \`ADMIN_USERNAME\` and \`ADMIN_PASSWORD\` in your `.env` file (or Vercel environment variables).
- Go to \`/admin\` and input the credentials into the browser prompt.
