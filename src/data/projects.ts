// Portfolio data sourced from the real BOLDINK DESIGNS Behance profile:
// https://www.behance.net/izzybizzy1
// Images are served from Behance's CDN.

import { resolveAssetUrl } from "@/lib/assets";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  tools: string[];
  overview: string;
  goals: string[];
  process: string;
  results: string[];
  palette: string[];
  typography: string;
  cover: string;
  images: string[];
  behanceUrl: string;
}

export type ProjectCategory =
  | "Branding"
  | "Graphic Design"
  | "Motion Graphics"
  | "Event Flyers"
  | "Infographics"
  | "3D Design"
  | "Social Media"
  | "Print Design"
  | "Retouching";

const projectData: Project[] = [
  {
    "id": "252754531",
    "slug": "product-design-and-visualization",
    "title": "Product Design & Visualization",
    "category": "3D Design",
    "year": "2026",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "A product-focused visual study translating physical packaging into clean, high-contrast digital renders built for e-commerce and campaign use.",
    "goals": [
      "Present the product with premium, catalogue-grade clarity",
      "Build a visual language that survives both feed and print",
      "Keep every render consistent in light, shadow and colour"
    ],
    "process": "Reference gathering and lighting study, then compositing and colour grading in Photoshop until the surface, shadow and reflection behaved like a real studio shot.",
    "results": [
      "A reusable visual template for future product drops",
      "Assets ready for storefront, feed and print without re-shooting"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#B7B7B7",
      "#E8E8E8"
    ],
    "typography": "Geometric sans display with high-contrast product callouts",
    "cover": "/__l5e/assets-v1/4297a1be-5d6c-431e-8196-b0b59fb5eac9/work-81.jpg",
    "images": [
      "/__l5e/assets-v1/3a00e91d-93e3-43c0-8440-882f321bc3fd/work-40.jpg",
      "/__l5e/assets-v1/ae2e56fb-bb51-4896-b903-0f146ab826d1/work-20.jpg",
      "/__l5e/assets-v1/6831aa52-c168-4d4e-b712-1c3ec910c3ad/work-43.jpg",
      "/__l5e/assets-v1/8b1a7baa-5564-47dc-9f04-c8a890fc267d/work-16.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/252754531/PRODUCT-DESIGN-AND-VISUALIZATION"
  },
  {
    "id": "252754297",
    "slug": "club-designs",
    "title": "Club Designs",
    "category": "Social Media",
    "year": "2026",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "A run of nightlife and club promotional artwork built to cut through a crowded feed with heat, motion blur and unapologetic type.",
    "goals": [
      "Give each night its own identity while keeping one house style",
      "Stay legible at thumbnail size",
      "Drive attendance through urgency"
    ],
    "process": "Concept board per event, photo compositing and light-leak treatment, then typographic layering with a strict hierarchy so the date and venue always read first.",
    "results": [
      "A consistent club identity across a season of events",
      "Higher engagement on event announcement posts"
    ],
    "palette": [
      "#050505",
      "#101010",
      "#2F6BFF",
      "#FF4B4B"
    ],
    "typography": "Condensed display headlines with wide-tracked supporting caps",
    "cover": "/__l5e/assets-v1/14282f01-311e-4cc8-929b-6edd8d536587/work-85.jpg",
    "images": [
      "/__l5e/assets-v1/e8425487-c01e-482f-8727-8105292e0287/work-13.jpg",
      "/__l5e/assets-v1/68c3fb8f-d1b1-44f4-8a6c-3212c46a7e62/work-12.jpg",
      "/__l5e/assets-v1/d7f4b534-ed32-4baf-ad46-6c46be92318b/work-9.jpg",
      "/__l5e/assets-v1/2f4b57c6-49fc-4161-ad7b-e49a117f8e36/work-19.jpg",
      "/__l5e/assets-v1/7ca0a458-77db-45f3-b10e-3aebc3e40e23/work-15.jpg",
      "/__l5e/assets-v1/ad8e0593-e8d9-487a-8ac8-b7de350195c1/work-36.jpg",
      "/__l5e/assets-v1/88e332e7-e4c7-4cce-ad2e-30da805b637c/work-27.jpg",
      "/__l5e/assets-v1/c68e8914-882d-4a88-9474-e73a73c52ca0/work-38.jpg",
      "/__l5e/assets-v1/18c559d6-c0cc-427c-b928-844f68febc45/work-42.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/252754297/CLUB-DESIGNS"
  },
  {
    "id": "252001467",
    "slug": "infographics",
    "title": "Infographics",
    "category": "Infographics",
    "year": "2026",
    "tools": [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    "overview": "Data and process storytelling turned into clean, scannable visual systems \u2014 icons, flows and numbers that people actually finish reading.",
    "goals": [
      "Turn dense information into a single-glance story",
      "Build an icon and colour system that scales",
      "Keep accuracy while cutting visual noise"
    ],
    "process": "Content audit, information hierarchy sketching, then icon design in Illustrator and layout, spacing and colour balancing in Photoshop.",
    "results": [
      "Complex topics reduced to one shareable frame",
      "A reusable icon and chart kit for future reports"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#2F6BFF",
      "#00FF99"
    ],
    "typography": "Geometric sans throughout with numeric emphasis at display scale",
    "cover": "/__l5e/assets-v1/d2664b81-b3d2-4fa9-9322-8e9e160ed2b5/work-80.jpg",
    "images": [
      "/__l5e/assets-v1/3cbb1c04-cd43-418c-b810-40f39e80491c/work-39.jpg",
      "/__l5e/assets-v1/02a2f109-9fdc-420b-9a06-51bc94901aba/work-26.jpg",
      "/__l5e/assets-v1/cdb0c8af-b2f3-4100-8fe6-f05125e38b51/work-44.jpg",
      "/__l5e/assets-v1/a80795fa-bb72-463a-aa80-edf6ad9262b3/work-32.jpg",
      "/__l5e/assets-v1/335fecac-127b-40ef-b121-42d59a1d520c/work-34.jpg",
      "/__l5e/assets-v1/44bfa4bc-bdad-4379-bf0c-d33ab982ae50/work-30.jpg",
      "/__l5e/assets-v1/fe838b1e-5fd4-4d4e-b3a7-d78168152139/work-21.jpg",
      "/__l5e/assets-v1/b04680d4-fcaa-4d8e-b581-a8ca9c01ead8/work-31.jpg",
      "/__l5e/assets-v1/1156fc96-c969-4072-aac3-e20c7f5048bf/work-23.jpg",
      "/__l5e/assets-v1/5f3b15e5-1fa0-465d-b2ab-00e62309adb5/work-24.jpg",
      "/__l5e/assets-v1/f8af7ad4-78a4-4282-b14c-1e962dbd2ace/work-25.jpg",
      "/__l5e/assets-v1/f6f227a7-58a8-4842-a82d-1014afcbc99d/work-22.jpg",
      "/__l5e/assets-v1/dd5c0df2-bdf1-4b26-beeb-c35bb1fb9d5b/work-29.jpg",
      "/__l5e/assets-v1/d4942886-b062-4ff5-a0c6-4539a35d5c1f/work-41.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/252001467/INFORGRAPHICS"
  },
  {
    "id": "239286831",
    "slug": "travel-design",
    "title": "Travel Design",
    "category": "Graphic Design",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "Travel and destination promotion artwork built around escapism \u2014 big imagery, confident type and a palette pulled straight from the location.",
    "goals": [
      "Sell a feeling before selling a package",
      "Keep pricing and dates unmissable",
      "Work across feed, story and poster"
    ],
    "process": "Destination photo selection and grading, depth-building composites, then typographic layout tuned for both vertical and square crops.",
    "results": [
      "A destination series with a single recognisable look",
      "Assets that reformat cleanly across every channel"
    ],
    "palette": [
      "#050505",
      "#101010",
      "#B7B7B7",
      "#2F6BFF"
    ],
    "typography": "Elegant display headings paired with clean informational sans",
    "cover": "/__l5e/assets-v1/c603ee9c-8bb6-4636-9318-b5662cfa07f0/work-79.jpg",
    "images": [
      "/__l5e/assets-v1/f47fc761-e362-4059-b481-a40bd05e200a/work-8.jpg",
      "/__l5e/assets-v1/17fafea0-d7c1-485e-96b5-a12288af5c8a/work-6.jpg",
      "/__l5e/assets-v1/b31b50d7-5699-4cd6-a7f0-17e6cc3b0ea2/work-7.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239286831/TRAVEL-DESIGN"
  },
  {
    "id": "239255449",
    "slug": "event-invitation",
    "title": "Event Invitation",
    "category": "Event Flyers",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "A refined invitation suite where restraint does the work \u2014 spacing, texture and typography carrying the entire sense of occasion.",
    "goals": [
      "Communicate prestige without ornament",
      "Make details effortless to read",
      "Translate cleanly to print"
    ],
    "process": "Typographic exploration first, then material and texture study, and finally print-ready layout with correct bleed and margin discipline.",
    "results": [
      "An invitation that reads as premium at a glance",
      "A layout system reusable for future occasions"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#C9C9C9",
      "#FFFFFF"
    ],
    "typography": "High-contrast serif display with wide-tracked sans details",
    "cover": "/__l5e/assets-v1/840aa4f5-4a57-426e-9097-734cd8131295/work-88.jpg",
    "images": [
      "/__l5e/assets-v1/0fe5761e-376e-48e5-a963-acd6536dc50d/work-75.jpg",
      "/__l5e/assets-v1/c7dea512-081b-4de6-8891-ab67eb307e5a/work-64.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239255449/EVENT-INVITATION"
  },
  {
    "id": "239249607",
    "slug": "skin-retouching",
    "title": "Skin Retouching",
    "category": "Retouching",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "High-end portrait retouching using frequency separation and dodge-and-burn \u2014 texture preserved, distraction removed, skin still looking like skin.",
    "goals": [
      "Clean the frame without plastic smoothing",
      "Keep natural skin texture intact",
      "Match tone and contrast across a full set"
    ],
    "process": "Frequency separation for blemish work, dodge-and-burn for form and light, then global colour grading and selective sharpening.",
    "results": [
      "Editorial-grade portraits ready for print and campaign use",
      "A repeatable retouch pipeline across the whole set"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#B7B7B7",
      "#EDE3DA"
    ],
    "typography": "Minimal sans captioning so the imagery leads",
    "cover": "/__l5e/assets-v1/97cc62fb-e770-4d86-bd88-c81b2c542888/work-84.jpg",
    "images": [
      "/__l5e/assets-v1/5b000775-171a-43ad-8cb9-c0584d5a24a3/work-76.jpg",
      "/__l5e/assets-v1/812305ed-7813-4b0b-a29e-721e281fe888/work-47.jpg",
      "/__l5e/assets-v1/6fe41bb2-912f-48a2-b0ad-45b11894395d/work-55.jpg",
      "/__l5e/assets-v1/5e73fc33-59ba-4064-bd10-da36caad8569/work-61.jpg",
      "/__l5e/assets-v1/16c90d5b-244d-4aa8-8ead-c467614b61bf/work-52.jpg",
      "/__l5e/assets-v1/7a43cadf-7623-4606-b0ec-a12892ca998e/work-68.jpg",
      "/__l5e/assets-v1/25d679b2-e3d0-495a-b892-30e3a703ef80/work-48.jpg",
      "/__l5e/assets-v1/81599f65-5dba-4af9-a7d1-c91043b9284e/work-59.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239249607/SKIN-RETOUCHING"
  },
  {
    "id": "239249267",
    "slug": "social-media-designs-ii",
    "title": "Social Media Designs II",
    "category": "Social Media",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "A second run of feed-native brand content \u2014 promotional posts, announcements and offers built as a system rather than one-offs.",
    "goals": [
      "Keep a brand recognisable across every post",
      "Build templates that survive fast turnarounds",
      "Convert scrolls into clicks"
    ],
    "process": "Grid planning, master template construction, then per-post art direction inside the fixed system so speed never costs consistency.",
    "results": [
      "Faster turnaround on recurring campaigns",
      "A feed that reads as one coherent brand"
    ],
    "palette": [
      "#050505",
      "#101010",
      "#2F6BFF",
      "#FFFFFF"
    ],
    "typography": "Bold geometric sans with tight headline stacks",
    "cover": "/__l5e/assets-v1/86a5acee-b144-4d16-9b35-b9e0daf3e57a/work-11.jpg",
    "images": [
      "/__l5e/assets-v1/86a5acee-b144-4d16-9b35-b9e0daf3e57a/work-11.jpg",
      "/__l5e/assets-v1/4b345e52-7ddb-4b2d-90fc-790641fb7394/work-10.jpg",
      "/__l5e/assets-v1/87a12c1a-b2f0-4767-93a2-b53a300aecae/work-17.jpg",
      "/__l5e/assets-v1/fe5185c7-e6b7-4eb8-8154-4b8cb09267af/work-14.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239249267/SOCIAL-MEDIA-DESIGNS"
  },
  {
    "id": "239247531",
    "slug": "events-flyers-and-posters",
    "title": "Events Flyers & Posters",
    "category": "Event Flyers",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "Event campaign artwork across launches, parties and gatherings \u2014 each piece built to stop a scroll and survive a printed wall.",
    "goals": [
      "Establish a hierarchy that always leads with the event",
      "Make every piece work in feed and in print",
      "Keep production fast without losing craft"
    ],
    "process": "Concept and moodboard, photo compositing and lighting treatment, then layout with strict typographic hierarchy and print-safe margins.",
    "results": [
      "A recognisable event look across an entire run",
      "Consistently high visibility in a saturated feed"
    ],
    "palette": [
      "#050505",
      "#101010",
      "#2F6BFF",
      "#FF4B4B"
    ],
    "typography": "Heavy display type with structured supporting information blocks",
    "cover": "/__l5e/assets-v1/56ecb341-5020-49ce-bc11-878b60fe500a/work-86.jpg",
    "images": [
      "/__l5e/assets-v1/73e23c01-4b2e-45dc-9916-6eb9a8485119/work-51.jpg",
      "/__l5e/assets-v1/9a9c95f2-2cfb-4794-ab44-a807ef3d72e4/work-69.jpg",
      "/__l5e/assets-v1/e7f0646f-559f-40b0-814c-3e542f5d4872/work-58.jpg",
      "/__l5e/assets-v1/eda855d7-3929-4d89-9174-22eff9a748ad/work-78.jpg",
      "/__l5e/assets-v1/6bf59e90-0416-4365-a6ed-4d7380e8b41e/work-66.jpg",
      "/__l5e/assets-v1/5a1abd95-e563-4df8-9ff1-e41ff23be2b0/work-60.jpg",
      "/__l5e/assets-v1/aae2f601-47e2-4293-b5b6-4944acd44638/work-46.jpg",
      "/__l5e/assets-v1/7423a9f2-547b-4b6c-9bb0-138891e506c5/work-77.jpg",
      "/__l5e/assets-v1/121d4afb-4dd8-4637-b58c-55f6a73cebe4/work-33.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239247531/EVENTS-FLAYERS-AND-POSTERS"
  },
  {
    "id": "239244081",
    "slug": "roll-ups-and-banners",
    "title": "Roll-Ups & Banners",
    "category": "Print Design",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "Large-format brand collateral \u2014 roll-up banners and signage designed to communicate in three seconds from across a room.",
    "goals": [
      "Read clearly from distance",
      "Keep brand consistency across every unit",
      "Deliver print-ready files with correct specs"
    ],
    "process": "Message reduction to a single hierarchy, vertical composition study, then production setup at full scale with correct resolution and bleed.",
    "results": [
      "Stand-out presence at activations and events",
      "Print files delivered with zero production issues"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#2F6BFF",
      "#FFFFFF"
    ],
    "typography": "Large geometric sans headlines with a compact information block",
    "cover": "/__l5e/assets-v1/8f1c455e-20a5-40aa-b188-e6f37dc93cd7/work-82.jpg",
    "images": [
      "/__l5e/assets-v1/63b7bb46-7a70-4c76-81b1-f28758c60dd0/work-65.jpg",
      "/__l5e/assets-v1/e7be9d64-e2a4-40d3-828d-5f0595d8b98b/work-71.jpg",
      "/__l5e/assets-v1/c5b71d7f-3637-4cfc-96be-1e355ef3203e/work-28.jpg",
      "/__l5e/assets-v1/427d3c55-da31-49d9-a997-8c0e7284ffef/work-45.jpg",
      "/__l5e/assets-v1/0c09943a-f6ae-48f3-9c17-fa030c848bda/work-74.jpg",
      "/__l5e/assets-v1/7ced38c7-39a2-4f49-b5b5-73dd8ff17e7d/work-73.jpg",
      "/__l5e/assets-v1/37cd0503-8463-4210-a468-c94f6fe81fa6/work-56.jpg",
      "/__l5e/assets-v1/f6c259fe-ffb0-4732-922c-acfc328ce50c/work-50.jpg",
      "/__l5e/assets-v1/dae6d750-c691-4d17-99d9-cfb66abac7f4/work-54.jpg",
      "/__l5e/assets-v1/2ececc39-b59b-4cec-9043-a6dc4a16e3a9/work-62.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239244081/ROLL-UPS-AND-BANNERS"
  },
  {
    "id": "239243689",
    "slug": "posters-and-flyers-designs",
    "title": "Posters & Flyers Designs",
    "category": "Print Design",
    "year": "2025",
    "tools": [
      "Adobe Photoshop"
    ],
    "overview": "A poster and flyer collection spanning promotions, services and announcements \u2014 bold composition, disciplined grids, zero filler.",
    "goals": [
      "Deliver a clear message inside a busy layout",
      "Keep every piece production-ready",
      "Build a look that feels premium at any budget"
    ],
    "process": "Layout grid definition, image treatment and compositing, then typography, contrast tuning and pre-press checks.",
    "results": [
      "A body of work with one consistent studio signature",
      "Reliable, fast delivery across varied client briefs"
    ],
    "palette": [
      "#050505",
      "#101010",
      "#B7B7B7",
      "#2F6BFF"
    ],
    "typography": "Display sans headlines over a strict modular grid",
    "cover": "/__l5e/assets-v1/4ca530f2-1252-42f1-9fea-b6fc5f8dfec5/work-83.jpg",
    "images": [
      "/__l5e/assets-v1/f8d67be6-33d1-4644-b9da-3983ef67d900/work-70.jpg",
      "/__l5e/assets-v1/ce50d7e2-f613-430f-ad8c-a57835e47c87/work-53.jpg",
      "/__l5e/assets-v1/90ca7702-fcf6-4178-b9a5-652f52fa4f13/work-18.jpg",
      "/__l5e/assets-v1/e895ae70-f515-4f61-9d2e-0ae9bbba09c7/work-72.jpg",
      "/__l5e/assets-v1/5954e19c-83ef-4ec4-a6df-c741dc9071dd/work-57.jpg",
      "/__l5e/assets-v1/94f6ef3e-9122-4a7e-8b72-7e323e99797f/work-35.jpg",
      "/__l5e/assets-v1/76e57bd2-75ae-48e3-b04d-ca478a888cdf/work-49.jpg",
      "/__l5e/assets-v1/4b223421-b8a7-4338-88f6-5173cdb176a0/work-67.jpg",
      "/__l5e/assets-v1/3fd44050-22b2-49c2-9eab-f45b9bebbf3d/work-63.jpg",
      "/__l5e/assets-v1/757d2350-518f-45b7-8fc7-a6fb3a60e80d/work-37.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239243689/POSTERS-AND-FLAYERS-DESIGNS"
  },
  {
    "id": "239243269",
    "slug": "social-media-designs",
    "title": "Social Media Designs",
    "category": "Social Media",
    "year": "2025",
    "tools": [
      "Adobe Illustrator",
      "Adobe Photoshop"
    ],
    "overview": "Feed-first brand design \u2014 product highlights, offers and announcements engineered for thumbnail legibility and instant brand recall.",
    "goals": [
      "Own a distinct look in the feed",
      "Keep messaging short and unmissable",
      "Template the system for scale"
    ],
    "process": "Brand audit, template and grid system design in Illustrator, then per-post composition and finishing in Photoshop.",
    "results": [
      "A visually unified feed across months of posting",
      "Strong recall from a repeatable visual signature"
    ],
    "palette": [
      "#050505",
      "#151515",
      "#2F6BFF",
      "#00FF99"
    ],
    "typography": "Geometric sans with strong weight contrast between headline and detail",
    "cover": "/__l5e/assets-v1/5294fd56-5ea4-453e-afbb-2550e091977d/work-87.jpg",
    "images": [
      "/__l5e/assets-v1/2aa26b62-f5ce-462b-9749-1dd7f07bf046/work-2.jpg",
      "/__l5e/assets-v1/6d1fcb56-5285-4c37-8a1c-03b44a5fbdfe/work-3.jpg",
      "/__l5e/assets-v1/9deb6523-15d6-49e9-8045-3c599ee5344f/work-1.jpg",
      "/__l5e/assets-v1/3bcbaa3c-985d-4527-80a6-b0e082bb419a/work-4.jpg",
      "/__l5e/assets-v1/2e7bbbeb-80da-48e8-8d3e-fa51010e6d5d/work-5.jpg"
    ],
    "behanceUrl": "https://www.behance.net/gallery/239243269/SOCIAL-MEDIA-DESIGNS"
  }
];

export const projects: Project[] = projectData.map((project) => ({
  ...project,
  cover: resolveAssetUrl(project.cover),
  images: project.images.map(resolveAssetUrl),
}));

export const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}
