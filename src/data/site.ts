import logoMark from "@/assets/boldink-mark-transparent.png.asset.json";
import portrait from "@/assets/nelson-kariuki.jpg.asset.json";
import portraitTwo from "@/assets/nelson-portrait-2.jpg.asset.json";
import { resolveAssetUrl } from "@/lib/assets";

export const logoUrl = resolveAssetUrl(logoMark.url);
export const portraitUrl = resolveAssetUrl(portrait.url);
export const portraitHeroUrl = resolveAssetUrl(portraitTwo.url);

export const site = {
  name: "BOLDINK DESIGNS",
  owner: "Nelson Kariuki",
  role: "Graphic Designer & Creative Director",
  tagline: "Designing Bold Experiences That Leave a Lasting Impression.",
  location: "Kiambu, Kenya",
  phone: "0791 735 372",
  phoneHref: "tel:+254791735372",
  email: "kariukinelson80@gmail.com",
  behance: "https://www.behance.net/izzybizzy1",
  whatsapp: "https://wa.me/254791735372?text=Hi%20Nelson%2C%20I%27d%20like%20to%20discuss%20a%20design%20project.",
};

export const socials = [
  { label: "Behance", href: "https://www.behance.net/izzybizzy1" },
  { label: "WhatsApp", href: "https://wa.me/254791735372" },
];

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const sectionLinks = [
  { label: "Services", hash: "services" },
  { label: "Skills", hash: "skills" },
  { label: "Process", hash: "process" },
  { label: "Testimonials", hash: "testimonials" },
];

export const services = [
  {
    title: "Brand Identity",
    description:
      "Logos, marks and full identity systems built to hold up everywhere — from a favicon to a building wrap.",
  },
  {
    title: "Graphic Design",
    description:
      "Posters, flyers, campaign keyvisuals and collateral with disciplined grids and deliberate typography.",
  },
  {
    title: "Motion Graphics",
    description:
      "Animated logo stings, promos and social cuts that give a static identity a pulse.",
  },
  {
    title: "3D Design",
    description:
      "Product visualisation and dimensional type that make a brand feel physical before it exists.",
  },
  {
    title: "Social Media Design",
    description:
      "Feed-native template systems engineered for thumbnail legibility and instant brand recall.",
  },
  {
    title: "Event Flyers",
    description:
      "Launches, parties and gatherings — artwork designed to stop a scroll and survive a printed wall.",
  },
  {
    title: "Infographics",
    description:
      "Dense information reduced to one scannable frame with custom icon and chart systems.",
  },
  {
    title: "Print Design",
    description:
      "Roll-ups, banners and large-format collateral delivered production-ready, every spec correct.",
  },
  {
    title: "Creative Direction",
    description:
      "Art direction across a campaign so every asset reads as one confident voice.",
  },
];

export const skills = [
  { name: "Adobe Photoshop", level: 96 },
  { name: "Adobe Illustrator", level: 90 },
  { name: "After Effects", level: 78 },
  { name: "Cinema 4D", level: 68 },
  { name: "Figma", level: 82 },
  { name: "Premiere Pro", level: 80 },
  { name: "Blender", level: 64 },
  { name: "InDesign", level: 74 },
];

export const processSteps = [
  { title: "Discover", body: "Understanding the business, the audience and what success actually looks like." },
  { title: "Research", body: "Competitor teardown, visual references and a clear read on the category." },
  { title: "Strategy", body: "Positioning, message hierarchy and the creative direction we commit to." },
  { title: "Design", body: "Concepting and craft — type, colour, composition, iteration." },
  { title: "Prototype", body: "Real-world mockups so the work is judged in context, not in a vacuum." },
  { title: "Review", body: "Structured feedback rounds with clear decisions at every step." },
  { title: "Deliver", body: "Production-ready files, correct formats, every export checked." },
  { title: "Support", body: "Ongoing rollout help so the identity stays consistent after handover." },
];

export const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "120+", label: "Brands Served" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Creative Commitment" },
];

// Swap these for real client names (or logo files) any time — this single
// list drives the "Trusted by" strip on the About page.
export const clients = [
  "Events & Festivals",
  "Sports Clubs",
  "FMCG Brands",
  "Hospitality",
  "NGOs & Reports",
  "Retail Startups",
];



export const testimonials = [
  {
    quote:
      "Nelson took a vague brief and came back with something sharper than anything we'd imagined. Our event artwork finally looks like the calibre of event we run.",
    name: "Grace Wanjiru",
    role: "Events Lead, Nairobi",
  },
  {
    quote:
      "The social templates alone changed our workflow. We post faster, and every single post looks like it came from the same studio.",
    name: "Brian Otieno",
    role: "Marketing Manager",
  },
  {
    quote:
      "Roll-ups, banners, signage — all delivered print-ready with zero back and forth from the printer. That never happens.",
    name: "Achieng' Odhiambo",
    role: "Operations Director",
  },
  {
    quote:
      "The infographics turned a report nobody read into the thing our clients quote back at us. Genuinely bold work.",
    name: "Samuel Kimani",
    role: "Consultant",
  },
  {
    quote:
      "Fast, precise and honest about what would and wouldn't work. BOLDINK is now the first call for anything visual.",
    name: "Faith Njeri",
    role: "Founder, Retail Brand",
  },
];

export const values = [
  { title: "Craft over shortcuts", body: "Every pixel is a decision. Nothing ships because it was faster." },
  { title: "Clarity first", body: "Bold does not mean loud. The message always leads the composition." },
  { title: "Respect the deadline", body: "Great work delivered late stops being great work." },
  { title: "Build systems", body: "One-off designs fade. Systems keep a brand consistent for years." },
];

export const budgets = [
  "Under KES 20,000",
  "KES 20,000 – 50,000",
  "KES 50,000 – 150,000",
  "KES 150,000+",
  "Not sure yet",
];

export const projectTypes = [
  "Brand Identity",
  "Graphic Design",
  "Motion Graphics",
  "3D Design",
  "Social Media Design",
  "Event Flyers",
  "Infographics",
  "Print Design",
  "Creative Direction",
  "Other",
];
