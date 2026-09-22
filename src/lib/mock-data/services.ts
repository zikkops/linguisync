import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc_translation",
    slug: "translation",
    name: "Translation",
    shortDescription: "Accurate, native-level translation for documents, websites, and apps.",
    description:
      "Professional human translation across 30+ language pairs — legal, medical, business, and general content, handled by native-speaking specialists rather than machine output.",
    whatsIncluded: [
      "Native-speaking translator matched to your language pair",
      "One round of revision included",
      "Formatting preserved to match your source file",
      "Confidential handling of sensitive documents",
    ],
    icon: "Languages",
    typicalTurnaround: "24–72 hours",
    intakeFormSchema: [
      { name: "sourceLanguage", label: "Source language", type: "select", options: ["English", "Spanish", "French", "German", "Italian", "Japanese", "Hindi"] },
      { name: "targetLanguage", label: "Target language", type: "select", options: ["English", "Spanish", "French", "German", "Italian", "Japanese", "Hindi"] },
      { name: "wordCount", label: "Approximate word count", type: "number" },
      { name: "notes", label: "Context or terminology notes", type: "textarea" },
    ],
  },
  {
    id: "svc_proofreading",
    slug: "proofreading",
    name: "Proofreading",
    shortDescription: "Grammar, clarity, and consistency checks before you publish.",
    description:
      "A close, sentence-level pass on your writing — grammar, punctuation, tone, and consistency — so what you publish reads as polished and professional.",
    whatsIncluded: [
      "Full grammar & punctuation pass",
      "Tone and consistency check",
      "Tracked-changes document delivered",
      "Optional style-guide alignment",
    ],
    icon: "PenLine",
    typicalTurnaround: "12–48 hours",
    intakeFormSchema: [
      { name: "wordCount", label: "Approximate word count", type: "number" },
      { name: "styleGuide", label: "Style guide (if any)", type: "text" },
      { name: "notes", label: "Anything specific to focus on", type: "textarea" },
    ],
  },
  {
    id: "svc_subtitling",
    slug: "subtitling",
    name: "Subtitling",
    shortDescription: "Accurate subtitles and captions, timed and formatted your way.",
    description:
      "Subtitles and captions for video content — transcribed, translated if needed, and precisely timed, delivered in the format your platform requires.",
    whatsIncluded: [
      "Time-coded subtitle file (SRT/VTT) or burned-in captions",
      "Translation into a target language if needed",
      "Speaker labels and readability-optimized line breaks",
      "One round of timing/wording revisions",
    ],
    icon: "Captions",
    typicalTurnaround: "24–72 hours",
    intakeFormSchema: [
      { name: "videoLength", label: "Video length (minutes)", type: "number" },
      { name: "outputFormat", label: "Output format", type: "select", options: ["SRT", "VTT", "Burned-in"] },
      { name: "targetLanguage", label: "Target language (if translating)", type: "text" },
    ],
  },
  {
    id: "svc_video-editing",
    slug: "video-editing",
    name: "Video Editing",
    shortDescription: "Clean cuts, color, and pacing for content that holds attention.",
    description:
      "Full video editing — cutting, pacing, color correction, and basic motion graphics — for social content, ads, and long-form video.",
    whatsIncluded: [
      "Editing, pacing, and transitions",
      "Basic color correction",
      "Background music & sound leveling",
      "Delivery in your target format/aspect ratio",
    ],
    icon: "Film",
    typicalTurnaround: "48–96 hours",
    intakeFormSchema: [
      { name: "footageLength", label: "Raw footage length (minutes)", type: "number" },
      { name: "deliverableFormat", label: "Deliverable format", type: "select", options: ["16:9 Landscape", "9:16 Vertical", "1:1 Square"] },
      { name: "notes", label: "Style / reference notes", type: "textarea" },
    ],
  },
  {
    id: "svc_copywriting",
    slug: "copywriting",
    name: "Copywriting",
    shortDescription: "Web copy, ads, and content that's written to convert.",
    description:
      "Original copy for websites, landing pages, ads, and product content — written to your brand voice and built to convert, not just fill space.",
    whatsIncluded: [
      "Original, brief-driven copy (no AI filler)",
      "One round of revisions",
      "SEO-aware structure where relevant",
      "Delivered in your preferred format",
    ],
    icon: "PenTool",
    typicalTurnaround: "24–72 hours",
    intakeFormSchema: [
      { name: "wordCount", label: "Approximate word count", type: "number" },
      { name: "tone", label: "Tone / brand voice", type: "text" },
      { name: "brief", label: "Brief / key points to cover", type: "textarea" },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}
