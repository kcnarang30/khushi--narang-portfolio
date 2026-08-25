export type ProjectStatus = "live" | "beta" | "shipped" | "designed" | "concept";

export type ProjectCategory =
  | "product"
  | "web"
  | "campaign"
  | "branding"
  | "editorial"
  | "ai-tool"
  | "event-experience"
  | "presentation"
  | "poster"
  | "writing";

export interface CaseStudySection {
  heading: string;
  body?: string; // markdown-ish plain text, short paragraphs
  imageRef?: string; // key into ASSET_MAP, optional
  imageCaption?: string;
  list?: string[];
}

export interface CaseStudy {
  narrative: "evolution" | "problem-strategy-build" | "context-direction-identity" | "standard";
  hero: { statement: string; sub?: string };
  sections: CaseStudySection[];
  reflection?: string;
}

export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  category: ProjectCategory;
  origin: "professional" | "college" | "personal" | "freelance";
  organisation?: string; // context, not implying direct client relationship unless true
  year?: string; // TBD if unknown
  status: ProjectStatus;
  role?: string;
  myContribution?: string[];
  collaborators?: string; // e.g. "Cross-functional team at YourStory" — never invents names
  featured: boolean;
  spotlight: boolean;
  archive: boolean;
  playground: boolean;
  live: boolean;
  liveUrl?: string;
  liveUrlNotes?: string; // e.g. multiple city variants
  caseStudy: boolean;
  caseStudyContent?: CaseStudy;
  coverAssetRef?: string; // key into ASSET_MAP.md — no fabricated image paths
  coverImageSrc?: string; // real exported file in /public — only set once the asset actually exists
  tags?: string[];
  order: number;
  todo?: string[]; // explicit TODOs instead of invented facts
}
