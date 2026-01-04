
// Fix: All declarations of 'aistudio' must have identical modifiers. 
// Wrapping in declare global and making the property optional ensures compatibility with other global definitions.
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export {};
