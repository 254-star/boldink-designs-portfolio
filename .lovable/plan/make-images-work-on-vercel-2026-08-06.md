# Make Images Work on Vercel

## Diagnosis

The image files are valid and currently return successful responses from Lovable’s asset service. The failure happens on Vercel because the site stores them as origin-relative URLs such as `/__l5e/assets-v1/...`. On a Vercel deployment, those requests go to the Vercel domain, which does not provide Lovable’s internal asset route.

## Plan

1. Move the two portraits, logos, and all portfolio images to a public, deployment-independent image location in Lovable Cloud storage.
2. Replace every `/__l5e/assets-v1/...` reference with its absolute public image URL so the same files load on Lovable, Vercel, and custom domains.
3. Keep image metadata, alt text, eager/lazy loading, and portfolio ordering unchanged.
4. Correct project social-image metadata to use absolute URLs where applicable.
5. Verify the home, work listing, about page, and multiple case studies; confirm every rendered image returns successfully and no internal asset paths remain.

## Technical Details

- Use a public read-only storage bucket for portfolio media.
- Upload the existing hosted image files without changing their visible quality.
- Keep uploads immutable and use stable absolute URLs.
- Run focused checks against representative portrait, logo, cover, and case-study images, followed by the project validation gate.

## Outcome

All website images will load independently of the hosting provider, including when the project is deployed to Vercel.
