export type Iso8601 = string;

export interface Labels {
    works: string;
    planguages: string;
    team: string;
    tools: string;
    environment: string;
    methods: string;
    worksSkill: string;
    diploma: string;
    language: string;
    interests: string;
}

export interface Basics {
    name?: string;
    label?: string;
    image?: string;
    email?: string;
    phone?: string;
    url?: string;
    summary?: string;
    birth: string;
    location?: {
      address?: string;
      postalCode?: string;
      city?: string;
      countryCode?: string;
      region?: string;
    }
    profiles?: {
      network?: string;
      username?: string;
      url?: string;
    }[];
}

export interface Team {
    back: number;
    front: number;
    fullStack: number;
    description: string;
}

export interface Highlight {
    subject: string;
    cat?: string;
    alternative?: string;
    detail: string[];
}

export interface Work {
    name?: string;
    location?: string;
    description?: string;
    position?: string;
    url?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    summary?: string;
    team?: Team;
    highlights?: Highlight[];
    planguages?: string[];
    env?: string[];
    tools?: string[];
    method?: string[];
}

export interface volunteers {
    organization?: string;
    position?: string;
    url?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    summary?: string;
    highlights?: string[];
}

export interface Education {
    institution?: string;
    url?: string;
    area?: string;
    studyType?: string;
    startDate?: Iso8601;
    endDate?: Iso8601;
    score?: string;
    courses?: string[];
}

export interface Meta {
    canonical?: string;
    version?: string;
    lastModified?: string;
}

export interface Award {
    title?: string;
    date?: Iso8601;
    awarder?: string;
    summary?: string;
}

export interface Certificate {
    name?: string;
    date?: Iso8601;
    url?: string;
    issuer?: string;
}

export interface Publication {
    name?: string;
    publisher?: string;
    releaseDate?: Iso8601;
    url?: string;
    summary?: string;
}

export interface Skill {
    name?: string;
    level?: string;
    keywords?: string[];
}

export interface Languages {
    language?: string;
    fluency?: string;
}

export interface Interest {
    name?: string;
}

export interface Reference {
    name?: string;
    reference?: string;
}

export interface Project {
    name?: string;
    description?: string;
    highlights?: string[];
    keywords?: string[];
    startDate?: Iso8601;
    endDate?: Iso8601;
    url?: string;
    roles?: string[];
    entity?: string;
    type?: string;
}

export interface ResumeSchema {
  $schema?: string;
  labels: Labels
  basics: Basics;
  work?: Work[];
  volunteer: volunteers[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Languages[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
  meta: Meta;
}