import { site, services, processSteps, budgets } from "./site";

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  quickReplies?: QuickReply[];
}

export interface QuickReply {
  label: string;
  intent: string;
}

export const greeting: ChatMessage = {
  id: "greeting",
  role: "assistant",
  text: `Hi — welcome to ${site.name}. I'm here to help you learn about our work, process, and how we can work together. What would you like to know?`,
  quickReplies: [
    { label: "Services", intent: "services" },
    { label: "Pricing & budget", intent: "pricing" },
    { label: "Work process", intent: "process" },
    { label: "Chat on WhatsApp", intent: "whatsapp" },
  ],
};

const serviceList = services.map((s) => `• ${s.title}: ${s.description}`).join("\n");
const processList = processSteps.map((s) => `• ${s.title}: ${s.body}`).join("\n");
const budgetList = budgets.map((b) => `• ${b}`).join("\n");

const knowledge: Record<string, string> = {
  services: `We offer a full range of design services:\n${serviceList}\n\nNot sure which one fits your project? Tell me what you're building and I can point you to the right service.`,
  pricing: `Every project is quoted based on scope, deliverables, and timeline. Typical budget ranges:\n${budgetList}\n\nFor a precise quote, share a brief on the contact page or message me on WhatsApp and I'll reply with next steps.`,
  process: `Our process is designed to keep work clear and on track:\n${processList}\n\nMost brand identity projects take 2–4 weeks; smaller design tasks can turn around in a few days depending on the brief.`,
  portfolio: `You can explore the full portfolio on the Work page. It covers brand identity, event flyers, social media design, 3D visualization, infographics, print design, motion graphics, and creative direction. Each case study shows the concept, process, and final results.`,
  about: `${site.name} is the studio of ${site.owner}, a ${site.role} based in ${site.location}. We have delivered 500+ projects for 120+ brands across events, FMCG, hospitality, NGOs, retail, and sports.`,
  turnaround: `Turnaround depends on scope. Single deliverables like flyers or social posts often ship in 2–5 business days. Brand identity systems usually take 2–4 weeks. Rush work is sometimes possible — ask on WhatsApp and I'll confirm availability.`,
  location: `The studio is based in ${site.location}. We work with clients locally in Kenya and remotely with teams around the world.`,
  contact: `You can reach ${site.owner} directly in three ways:\n• WhatsApp: ${site.whatsapp}\n• Email: ${site.email}\n• Contact form: /contact\n\nWhatsApp is usually the fastest for quick questions and project briefs.`,
  whatsapp: `Opening WhatsApp so you can chat directly with ${site.owner}. Feel free to share your project brief, timeline, and budget.`,
  email: `Opening your email app. Please include your name, project type, timeline, and budget so I can reply with a clear next step.`,
  hello: `Hello! How can I help you today?`,
  thanks: "You're welcome. Let me know if there's anything else I can help with.",
  fallback: "I'm not sure I understood that. You can ask about services, pricing, process, portfolio, or contact details — or tap 'Chat on WhatsApp' to speak with Nelson directly.",
};

const intentKeywords: Record<string, string[]> = {
  services: ["service", "services", "what do you do", "offer", "brand identity", "logo", "flyer", "poster", "motion", "3d", "social media", "print", "infographic"],
  pricing: ["price", "pricing", "cost", "budget", "how much", "rates", "quote", "estimate", "charge"],
  process: ["process", "how does it work", "workflow", "steps", "timeline", "turnaround", "how long"],
  portfolio: ["portfolio", "work", "projects", "case study", "examples", "behance", "showcase"],
  about: ["about", "who", "nelson", "boldink", "studio", "experience", "background"],
  location: ["location", "where", "based", "nairobi", "kiambu", "kenya", "office"],
  contact: ["contact", "email", "phone", "reach", "message", "call", "talk"],
  whatsapp: ["whatsapp", "chat", "dm", "direct", "speak"],
  hello: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"],
  thanks: ["thank", "thanks", "appreciate", "cheers"],
};

function getKnowledge(key: string): string {
  return knowledge[key] ?? knowledge["fallback"] ?? "";
}

export function getBotResponse(userText: string): ChatMessage {
  const normalized = userText.toLowerCase().trim();

  for (const [intent, keywords] of Object.entries(intentKeywords)) {
    if (keywords.some((kw) => normalized.includes(kw))) {
      const quickReplies: QuickReply[] = intent === "whatsapp"
        ? []
        : [
            { label: "View services", intent: "services" },
            { label: "See pricing", intent: "pricing" },
            { label: "Chat on WhatsApp", intent: "whatsapp" },
          ];
      return {
        id: `bot-${Date.now()}`,
        role: "assistant",
        text: getKnowledge(intent),
        quickReplies,
      };
    }
  }

  return {
    id: `bot-${Date.now()}`,
    role: "assistant",
    text: getKnowledge("fallback"),
    quickReplies: [
      { label: "Services", intent: "services" },
      { label: "Pricing", intent: "pricing" },
      { label: "Chat on WhatsApp", intent: "whatsapp" },
    ],
  };
}
