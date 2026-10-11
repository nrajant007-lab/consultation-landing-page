# Oxygen concentrator service landing page

## Run locally
    npm install
    cp .env.example .env.local   # then fill in values
    npm run dev                  # http://localhost:3000

## Settings (.env.local, also add them in Vercel > Project > Settings > Environment Variables)
- NEXT_PUBLIC_SITE_URL: your live domain (SEO / Open Graph)
- NEXT_PUBLIC_VIMEO_URL: replace the temporary sample video with your own Vimeo link. Empty = video placeholder.
- NEXT_PUBLIC_WHATSAPP_NUMBER: defaults to 9779841449957. Empty = disabled button.
- NEXT_PUBLIC_FORM_ENDPOINT: Formspree / Google Apps Script / your API URL. Empty = submission is only simulated (no data is saved)

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com > Add New Project > import the repo (Next.js is detected automatically).
3. Add the environment variables above, then Deploy.

## Edit colours
tailwind.config.ts > colors.primary (sampled from your logo: #253088).
