# Move all site images to a public "website-images" bucket

Today your 93 images live in a private cloud bucket (`project-images`) and are served through the site's own image endpoint, with a duplicate copy still sitting in the repo under `public/media`. This plan consolidates everything into a single public bucket named `website-images`, deletes both older copies, and points every image on the site at direct public URLs.

Nothing about the design changes: no layout, typography, spacing, colours, animations or image dimensions are touched. Only the URL each image is loaded from changes.

## What happens

1. **Create the bucket** `website-images` as public, so images are served straight from storage with no proxy in between.
2. **Access rules**
   - Anyone (including logged-out visitors) can view/download images.
   - Only signed-in admins can upload, replace, or delete images.
   - No private keys are exposed; uploads happen server-side after the admin role is verified.
3. **Migrate the 93 existing images** from the old bucket into `website-images`, keeping the exact same filenames so no image goes missing.
4. **Switch the site over** — the shared image URL helper starts returning the public storage URL, so every page (Home, About, Work listing, case studies, Projects, Contact, footer, admin) updates at once with no per-page edits.
5. **Admin uploads** in the dashboard start writing to `website-images` and store the public URL on the project record.
6. **Clean up duplicates** — delete the `public/media` folder from the repo and delete the old `project-images` bucket and its files, plus the now-unused image proxy route.
7. **Verify** — load Home, About, Work, each project case study, and Contact in a real browser and confirm every image returns successfully from the bucket, with a screenshot as evidence. Also confirm the URLs are absolute public storage URLs so they keep working on Vercel.

## Technical notes

- New bucket `website-images` (public). Policies on `storage.objects`: `SELECT` to `anon` + `authenticated` scoped to this bucket; `INSERT`/`UPDATE`/`DELETE` restricted to `authenticated` with `has_role(auth.uid(), 'admin')`.
- Migration runs server-side with the existing service-role credentials already in the environment (never sent to the browser); objects are copied under the same `media/<id>/<filename>` keys.
- `src/lib/assets.ts` — `resolveAssetUrl` returns `${SUPABASE_URL}/storage/v1/object/public/website-images/media/...`. `src/data/site.ts` and `src/data/projects.ts` already route through this helper, so they need no changes.
- `src/lib/projects.functions.ts` upload handler switches bucket to `website-images` and uses `getPublicUrl`.
- Removed: `src/routes/api/public/img.$.tsx`, `public/media/*`, old bucket.
- Verification via Playwright against the dev server, asserting zero failed image requests per page.
