
import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, MessageSquare, Loader2, Send, PhoneCall } from 'lucide-react';
import { GoogleGenAI, Modality } from "@google/genai";
import { decodeBase64, decodeAudioData, encodeAudio, geminiService } from '../services/geminiService';
import { Message } from '../types';

const ApexConcierge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Apex Strategy. I am your Digital Concierge. How may I assist with your organizational transformation today?" }
  ]);
  const [error, setError] = useState<string | null>(null);

  const sessionPromiseRef = useRef<Promise<any> | null>(null);
  const chatRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputNodeRef = useRef<GainNode | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const stopAllAudio = () => {
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch (e) {}
    });
    sourcesRef.current.clear();
    nextStartTimeRef.current = 0;
    setIsSpeaking(false);
  };

  const handleSendText = async () => {
    if (!inputText.trim() || isLoading) return;

    const userText = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) {
        const instruction = `You are the Apex Digital Concierge. You are professional, elite, and helpful. Guide users through the website services and portfolios. IMPORTANT: Remind users that bespoke implementation is handled personally by human Partners. Direct them to book a session for high-stakes decisions.`;
        chatRef.current = geminiService.createStrategyChat(instruction);
      }
      
      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'model', text: response.text }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm experiencing a brief synchronization delay. For immediate assistance, please use our Direct Partner Line." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceSession = async () => {
    setError(null);
    setIsConnecting(true);
    setMode('voice');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true }).catch(err => {
        throw new Error("Microphone access denied.");
      });

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = audioCtx;
      const outputNode = audioCtx.createGain();
      outputNode.connect(audioCtx.destination);
      outputNodeRef.current = outputNode;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      sessionPromiseRef.current = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            setIsConnecting(false);
            setIsActive(true);
            const source = inputCtx.createMediaStreamSource(stream);
            const processor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
              
              sessionPromiseRef.current?.then((session) => {
                session.sendRealtimeInput({
                  media: {
                    data: encodeAudio(new Uint8Array(int16.buffer)),
                    mimeType: 'audio/pcm;rate=16000'
                  }
                });
              });
            };
            
            source.connect(processor);
            processor.connect(inputCtx.destination);
          },
          onmessage: async (msg: any) => {
            if (msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data) {
              setIsSpeaking(true);
              const base64 = msg.serverContent.modelTurn.parts[0].inlineData.data;
              const audioData = decodeBase64(base64);
              const buffer = await decodeAudioData(audioData, audioCtx, 24000, 1);
              
              const source = audioCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputNode);
              
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              };
            }
            if (msg.serverContent?.interrupted) stopAllAudio();
          },
          onerror: (e: any) => {
            setIsConnecting(false);
            setIsActive(false);
            setError("Voice link currently unavailable. Switching to text advisory.");
            setMode('text');
          },
          onclose: () => setIsActive(false)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are the "Apex Digital Concierge". Professional, elite, helpful. Direct users to human partners for high-stakes consultancy.',
        },
      });
      
      await sessionPromiseRef.current;
    } catch (e: any) {
      setIsConnecting(false);
      setMode('text');
    }
  };

  const endVoiceSession = () => {
    sessionPromiseRef.current?.then(session => session.close());
    stopAllAudio();
    setIsActive(false);
    setMode('text');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      {isOpen ? (
        <div className="glass w-[360px] rounded-2xl flex flex-col border border-white/10 blue-glow animate-in fade-in zoom-in duration-300 overflow-hidden">
          <div className="p-6 bg-white/[0.03] border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${mode === 'voice' && isActive ? 'bg-[#D4AF37] animate-pulse' : 'bg-[#007FFF]'}`}>
                {mode === 'voice' ? <Volume2 size={20} className="text-white" /> : <MessageSquare size={20} className="text-white" />}
              </div>
              <div>
                <h3 className="font-bold text-[11px] uppercase tracking-widest">Apex Concierge</h3>
                <span className="text-[8px] uppercase text-[#007FFF] tracking-widest font-black">Digital Advisory Active</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white"><X size={20} /></button>
          </div>

          <div ref={scrollRef} className="h-96 overflow-y-auto p-6 space-y-4 bg-black/20 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-xl text-[11px] leading-relaxed ${m.role === 'user' ? 'bg-[#007FFF] text-white' : 'bg-white/5 border border-white/10 text-gray-300'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-3">
                  <Loader2 size={12} className="animate-spin text-[#007FFF]" />
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest">Synthesizing...</span>
                </div>
              </div>
            )}
            {mode === 'voice' && (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <div className="flex gap-1 h-8 items-center">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 bg-[#D4AF37] rounded-full transition-all duration-300`} 
                      style={{ height: isActive && isSpeaking ? `${4 + Math.random() * 24}px` : '4px' }}
                    />
                  ))}
                </div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{isActive ? "Voice Channel Live" : "Connecting..."}</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-white/[0.03] border-t border-white/5">
            {mode === 'text' ? (
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendText()}
                  placeholder="Inquire about strategy..." 
                  className="flex-1 bg-black/40 border border-white/10 rounded-full py-2.5 px-5 text-[11px] outline-none focus:border-[#007FFF] transition-all"
                />
                <button 
                  onClick={handleSendText}
                  className="w-10 h-10 rounded-full bg-[#007FFF] flex items-center justify-center hover:brightness-110 transition-all shadow-lg shadow-[#007FFF]/20"
                >
                  <Send size={16} className="text-white" />
                </button>
                <button 
                  onClick={startVoiceSession}
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"
                >
                  <Mic size={16} className="text-[#007FFF]" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <button 
                  onClick={endVoiceSession}
                  className="w-full py-3 bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                  Terminate Voice Link
                </button>
                <button onClick={() => setMode('text')} className="text-[9px] text-gray-500 uppercase tracking-widest hover:text-white transition-colors">
                  Switch to Text Mode
                </button>
              </div>
            )}
            <div className="mt-4 flex justify-between items-center px-2">
               <span className="text-[8px] text-gray-600 uppercase tracking-widest">Bespoke Advisory</span>
               <button className="text-[8px] text-[#D4AF37] uppercase tracking-widest font-bold flex items-center gap-1">
                  <PhoneCall size={8} /> Human Partner Access
               </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#007FFF] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 hover:shadow-[#007FFF]/30 transition-all duration-500 group"
        >
          <div className="absolute inset-0 bg-[#007FFF] rounded-full animate-ping opacity-10" />
          <MessageSquare className="text-white" size={24} />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4AF37] rounded-full border-2 border-[#050505]" />
        </button>
      )}
    </div>
  );
};

export default ApexConcierge;
