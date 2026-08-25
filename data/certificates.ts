export interface Certificate {
  name: string;
  issuer: string;
  status: "completed" | "in-progress";
  progressNote?: string;
}

export const certificates: Certificate[] = [
  {
    name: "Google UX Design Professional Certificate",
    issuer: "Coursera",
    status: "in-progress",
    progressNote: "4 of 7 courses completed",
  },
  { name: "UX Design Trilogy — Certificate of Mastery", issuer: "Campus Collective", status: "completed" },
  { name: "Branding & AI Trilogy — Certificate of Mastery", issuer: "Campus Collective", status: "completed" },
  { name: "Adobe Illustrator CC", issuer: "Udemy", status: "completed" },
  { name: "Adobe Photoshop CC", issuer: "Udemy", status: "completed" },
  { name: "Python Data Structures and Algorithms", issuer: "Infosys Springboard", status: "completed" },
  { name: "MySQL Database Development", issuer: "Infosys Springboard", status: "completed" },
  { name: "Java Programming", issuer: "Infosys Springboard", status: "completed" },
  { name: "Leadership & Management", issuer: "TBD", status: "completed" },
  { name: "Introduction to Digital Marketing", issuer: "TBD", status: "completed" },
  { name: "Introduction to Cloud Computing", issuer: "TBD", status: "completed" },
  { name: "Data Mining with Python", issuer: "TBD", status: "completed" },
  { name: "NLP for Developers", issuer: "TBD", status: "completed" },
];
