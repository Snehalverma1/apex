
import { Project, Service } from '../types';

const PROJECTS_KEY = 'apex_strategy_projects';
const SERVICES_KEY = 'apex_strategy_services';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Fortune 500 Digital Transformation',
    category: 'Digital Strategy',
    description: 'Modernizing legacy infrastructure for a global retail giant.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    challenge: 'Inefficient silos and legacy tech preventing market agility.',
    strategy: 'Implemented a unified cloud-native architecture and AI-driven supply chain.',
    outcome: '40% reduction in operational overhead and 25% increase in online revenue.',
    aiSystemInstruction: 'You are a Senior Digital Transformation Consultant. Focus on scalability, ROI, and technical efficiency.'
  },
  {
    id: '2',
    title: 'Startup Scalability Phase',
    category: 'Growth Strategy',
    description: 'Hyper-scaling a Fintech unicorn from Series B to IPO.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    challenge: 'Rapid user growth outpacing internal governance and processes.',
    strategy: 'Structural reorganization and implementing "Apex Growth" frameworks.',
    outcome: 'Successful $2B IPO and international expansion into 12 new markets.',
    aiSystemInstruction: 'You are a Growth & Scalability Specialist. Focus on organizational design and rapid market entry.'
  }
];

const DEFAULT_SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Operational Rigor',
    description: 'Re-engineering workflows for zero-latency execution.',
    iconName: 'Layers',
    detailedContent: 'Our operational rigor framework involves a 360-degree audit of your existing supply chain and internal communication channels. We deploy proprietary optimization algorithms to identify and eliminate waste, ensuring your organization moves at the speed of the digital age.'
  },
  {
    id: 's2',
    title: 'Global Scale',
    description: 'Market expansion strategies for multi-national dominance.',
    iconName: 'Globe',
    detailedContent: 'Expanding into new territories requires more than capital; it requires cultural and regulatory intelligence. Apex provides bespoke go-to-market blueprints that minimize risk while maximizing market penetration in emerging and established economies.'
  },
  {
    id: 's3',
    title: 'Digital Edge',
    description: 'Weaponizing AI and emerging tech for unfair market advantage.',
    iconName: 'Zap',
    detailedContent: 'We don\'t just integrate AI; we weaponize it. From custom LLM environments for internal knowledge management to predictive customer behavioral models, we ensure your tech stack is your primary competitive advantage.'
  }
];

export const storeService = {
  getProjects: (): Project[] => {
    const stored = localStorage.getItem(PROJECTS_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_PROJECTS;
  },
  saveProjects: (projects: Project[]) => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  },
  addProject: (project: Project) => {
    const projects = storeService.getProjects();
    const updated = [...projects, project];
    storeService.saveProjects(updated);
    return updated;
  },
  updateProject: (project: Project) => {
    const projects = storeService.getProjects();
    const updated = projects.map(p => p.id === project.id ? project : p);
    storeService.saveProjects(updated);
    return updated;
  },
  deleteProject: (id: string) => {
    const projects = storeService.getProjects();
    const updated = projects.filter(p => p.id !== id);
    storeService.saveProjects(updated);
    return updated;
  },

  // Services
  getServices: (): Service[] => {
    const stored = localStorage.getItem(SERVICES_KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SERVICES;
  },
  saveServices: (services: Service[]) => {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(services));
  },
  updateService: (service: Service) => {
    const services = storeService.getServices();
    const updated = services.map(s => s.id === service.id ? service : s);
    storeService.saveServices(updated);
    return updated;
  },
  addService: (service: Service) => {
    const services = storeService.getServices();
    const updated = [...services, service];
    storeService.saveServices(updated);
    return updated;
  },
  deleteService: (id: string) => {
    const services = storeService.getServices();
    const updated = services.filter(s => s.id !== id);
    storeService.saveServices(updated);
    return updated;
  }
};
