
export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  challenge: string;
  strategy: string;
  outcome: string;
  aiSystemInstruction: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Lucide icon name string
  detailedContent: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AppState {
  projects: Project[];
  services: Service[];
  isAdmin: boolean;
  selectedProject: Project | null;
  currentPage: 'home' | 'services' | 'contact';
}
