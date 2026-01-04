
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, PhoneCall } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { Project, Message } from '../types';

interface StrategyAIProps {
  project: Project;
}

const StrategyAI: React.FC<StrategyAIProps> = ({ project }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Greetings. I am the Apex Digital Assistant for the ${project.title} initiative. I can walk you through the frameworks we used. For bespoke implementation or to speak with the Lead Partner, let me know.` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        // Updated instruction for free-tier personal consult emphasis
        const instruction = `${project.aiSystemInstruction}. IMPORTANT: You are a digital assistant previewing human excellence. Remind users that for actual business execution, they must contact the Apex Partners directly. Do not promise specific ROI without partner sign-off.`;
        chatRef.current = geminiService.createStrategyChat(instruction);
      }
      
      const response = await chatRef.current.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "The Digital Assistant is currently in high demand. For immediate strategic support, we recommend contacting our human partners directly via the 'Partner Access' link." 
      }]);
      chatRef.current = null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass rounded-xl border border-white/10 flex flex-col h-[500px]">
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#007FFF]/20 flex items-center justify-center border border-[#007FFF]/30">
            <Bot size={16} className="text-[#007FFF]" />
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest">Digital Assistant</h4>
            <span className="text-[8px] uppercase text-green-500 tracking-widest font-bold">Standard Access</span>
          </div>
        </div>
        <button className="p-2 hover:text-[#D4AF37] transition-colors" title="Request Human Partner">
          <PhoneCall size={14} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-black/20">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-4 rounded-xl text-xs leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#007FFF] text-white shadow-lg shadow-[#007FFF]/10' 
                : 'bg-white/5 border border-white/10 text-gray-300'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
              <Loader2 size={12} className="animate-spin text-[#007FFF]" />
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">Synthesizing...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Discuss frameworks or results..."
            className="w-full bg-black/60 border border-white/10 rounded-full py-3 px-5 pr-12 text-xs focus:outline-none focus:border-[#007FFF] transition-all placeholder:text-gray-600"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-2 p-1.5 text-[#007FFF] hover:bg-[#007FFF]/10 rounded-full transition-all disabled:opacity-30"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex justify-center">
           <span className="text-[8px] text-gray-600 uppercase tracking-widest font-bold">Human Consultation Always Available</span>
        </div>
      </div>
    </div>
  );
};

export default StrategyAI;
