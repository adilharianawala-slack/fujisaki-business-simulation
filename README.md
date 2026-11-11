# Fujisaki password reset update

This update adds a working instructor password recovery flow:
- Forgot password link on instructor login
- Supabase recovery email request
- Password reset form shown after a valid recovery link
- Password update through Supabase Auth

## Important before uploading
The `app.js` in this package has placeholder values for:
- `FUJISAKI_SUPABASE_URL`
- `FUJISAKI_SUPABASE_PUBLISHABLE_KEY`

Copy the two values from your current working `app.js` into the matching constants in this package before uploading. Use only the Project URL and `sb_publishable_...` key. Never use an `sb_secret_...` or service-role key.

## GitHub upload
Replace `app.js`, `index.html`, `styles.css`, and `README.md` in the root of your existing GitHub repository. Commit the changes.

## Supabase URL configuration
In Supabase, open Authentication -> URL Configuration. Make sure the Site URL and allowed redirect URLs include:
`https://adilharianawala-slack.github.io/fujisaki-business-simulation/`

Then open the website, choose Instructor -> Forgot password?, enter your instructor email, and use the newest recovery email. The recovery link should return to the site and display the new-password form.
