# Plesk deployment bundle

Upload the CONTENTS of this folder to your Plesk site root (e.g. httpdocs/).

Layout:
  httpdocs/
    app.js               (Application Startup File)
    index.html
    assets/...
    server/index.mjs  (Nitro node-server bundle)
    server/...
    package.json
    web.config           (IIS + iisnode)

## Plesk Node.js panel
- Application startup file: app.js
- Application mode: production
- Click "NPM Install", then "Restart App"

## Required environment variables
SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SUPABASE_SERVICE_ROLE_KEY,
VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY,
RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET

## Update later
  npm run build:plesk
  # re-upload contents of plesk-deploy/ and Restart App
