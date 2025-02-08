export interface Profile {
    network: string;
    username: string;
    url: string;
  }
  
  export interface Location {
    city: string;
    countryCode: string;
  }
  
  export interface Basics {
    name: string;
    label: string;
    email: string;
    phone: string;
    summary: string;
    location: Location;
    profiles: Profile[];
  }
  
  export interface WorkExperience {
    id: string;
    name: string;
    location: string;
    description: string[];
    position: string;
    startDate: string;
    endDate: string;
    completed: boolean;
  }
  
  export interface Education {
    institution: string;
    area: string;
    studyType: string;
    startDate: string;
    endDate: string;
  }
  
  export interface Skill {
    name: string;
  }
  
  export interface ResumeData {
    basics: Basics;
    work: WorkExperience[];
    education: Education[];
    skills: Skill[];
  }
  