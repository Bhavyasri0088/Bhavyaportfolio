export interface ProjectInfo {
  id: number;
  title: string;
  description: string;
  insights: string[];
  technologies: string[];
  githubUrl: string;
  reportUrl?: string;
}

export interface SkillInfo {
  category: string;
  icon: string;
  items: string[];
}

export interface EducationInfo {
  type: 'degree' | 'certification' | 'internship';
  title: string;
  institution: string;
  period: string;
  description: string;
  certificateUrl: string | null;
}

export interface ContactInfo {
  email: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
}
