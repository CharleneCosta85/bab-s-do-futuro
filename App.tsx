import React, { useState, useRef, useEffect } from 'react';
import { Section } from './components/Section';
import { FinancialChart } from './components/FinancialChart';
import { SectionId, ChatMessage } from './types';
import { sendMessageToGemini } from './services/geminiService';
import { 
  ShieldCheck, 
  UserCheck, 
  Heart, 
  Users, 
  Briefcase, 
  DollarSign, 
  Star, 
  Search, 
  MessageCircle, 
  CreditCard, 
  TrendingUp, 
  Cpu, 
  Target,
  Bot,
  Send,
  X,
  Menu,
  ChevronRight
} from 'lucide-react';

// --- Global Constants matching PDF Content ---
const FINANCIAL_DATA = [
  { name: 'Assinaturas Famílias', value: 1250, description: '50 assinantes x R$ 25/mês' },
  { name: 'Comissões', value: 450, description: '30 contratações x 15% de R$ 100' },
  { name: 'Premium Babás', value: 200, description: '10 assinantes x R$ 20/mês' },
];

const COST_DATA = [
  { name: 'Computação', cost: 'R$ 200-350' },
  { name: 'Armazenamento', cost: 'R$ 50-100' },
  { name: 'Tráfego', cost: 'R$ 30-100' },
  { name: 'Serviços Adicionais', cost: 'R$ 100-200' },
  { name: 'Domínio/SSL', cost: 'R$ 20-50' },
];

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Olá! Sou o assistente virtual do Babás do Futuro. Como posso ajudar você a entender nosso modelo de negócio ou encontrar a babá ideal?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: SectionId) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsThinking(true);

    // Prepare history for Gemini
    const history = chatMessages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const responseText = await sendMessageToGemini(userMsg.text, history);

    const modelMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
    setChatMessages(prev => [...prev, modelMsg]);
    setIsThinking(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isThinking]);

  return (
    <div className="min-h-screen font-sans text-gray-800 bg-emerald-50 selection:bg-emerald-200">
      
      {/* --- Navigation --- */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection(SectionId.HERO)}>
              <Heart className="h-8 w-8 text-emerald-600 fill-emerald-600" />
              <span className="font-serif font-bold text-xl text-emerald-900">Babás do Futuro</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection(SectionId.VALUE_PROP)} className="text-gray-600 hover:text-emerald-600 font-medium">Proposta</button>
              <button onClick={() => scrollToSection(SectionId.FEATURES)} className="text-gray-600 hover:text-emerald-600 font-medium">Funcionalidades</button>
              <button onClick={() => scrollToSection(SectionId.FINANCIALS)} className="text-gray-600 hover:text-emerald-600 font-medium">Investimento</button>
              <button onClick={() => setIsChatOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors">
                <Bot size={18} />
                <span>IA Assistente</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600 p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button onClick={() => scrollToSection(SectionId.VALUE_PROP)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 rounded-md">Proposta</button>
              <button onClick={() => scrollToSection(SectionId.FEATURES)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 rounded-md">Funcionalidades</button>
              <button onClick={() => scrollToSection(SectionId.FINANCIALS)} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-emerald-50 rounded-md">Investimento</button>
              <button onClick={() => { setIsChatOpen(true); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-emerald-600 hover:bg-emerald-50 rounded-md">IA Assistente</button>
            </div>
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <section id={SectionId.HERO} className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-emerald-800 uppercase bg-emerald-100 rounded-full">
            Inovação em Cuidado Infantil
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-emerald-950 mb-8 leading-tight">
            Conheça o App de <br />
            <span className="text-emerald-600">Babás do Futuro!</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10 leading-relaxed">
            Descubra uma nova era no cuidado infantil. Conectamos famílias a babás qualificadas, priorizando segurança, personalização e conveniência.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-emerald-700 text-white rounded-lg font-semibold text-lg shadow-lg hover:bg-emerald-800 transition-all transform hover:-translate-y-1">
              Saiba Mais
            </button>
            <button className="px-8 py-4 bg-white text-emerald-800 border-2 border-emerald-700 rounded-lg font-semibold text-lg hover:bg-emerald-50 transition-all">
              Invista Conosco
            </button>
          </div>
          
          <div className="mt-16 relative rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto border-4 border-white">
            <img src="https://picsum.photos/1200/600?grayscale&blur=2" alt="Família feliz" className="w-full h-auto object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent flex items-end justify-center pb-8">
              <p className="text-white text-lg font-medium">Conectando cuidado e confiança</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Value Proposition --- */}
      <Section id={SectionId.VALUE_PROP} title="Confiabilidade e Personalização" subtitle="Nosso app oferece às famílias a tranquilidade de escolher babás com base em critérios rigorosos.">
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            { icon: <ShieldCheck size={40} />, title: "Segurança Total", desc: "Verificação detalhada de antecedentes e escolaridade." },
            { icon: <UserCheck size={40} />, title: "Profissionais Qualificados", desc: "Experiência profissional comprovada e avaliações reais." },
            { icon: <Heart size={40} />, title: "Perfil Visual Completo", desc: "Fotos e descrições detalhadas para a melhor escolha." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-emerald-50 text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* --- Audience --- */}
      <Section id={SectionId.AUDIENCE} isDark title="Público-Alvo e Mercado" subtitle="Atendemos as duas pontas dessa conexão vital.">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <Users className="text-emerald-300" size={32} />
              <h3 className="text-2xl font-bold text-white">Famílias Modernas</h3>
            </div>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Pais e mães que buscam babás de confiança, qualificadas e com flexibilidade para atender suas necessidades dinâmicas.
            </p>
          </div>
          <div className="bg-emerald-800/50 p-8 rounded-3xl border border-emerald-700/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <Briefcase className="text-emerald-300" size={32} />
              <h3 className="text-2xl font-bold text-white">Babás Profissionais</h3>
            </div>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Um canal seguro e prático para babás experientes encontrarem novas oportunidades e gerenciarem seus horários com facilidade.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
            <p className="text-emerald-200/80 italic">O mercado de serviços de babysitting está em constante crescimento.</p>
        </div>
      </Section>

      {/* --- Monetization --- */}
      <Section id={SectionId.MONETIZATION} title="Estratégias de Monetização" subtitle="Gerando Valor e Lucro com sustentabilidade.">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-xl">
                <DollarSign className="text-emerald-600 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Taxa por Contratação</h4>
                <p className="text-sm text-gray-600">Cobrança de pequena porcentagem (15%) por cada serviço agendado na plataforma.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <Star className="text-emerald-600 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Assinaturas Premium</h4>
                <p className="text-sm text-gray-600">Planos mensais para famílias e babás acessarem funcionalidades exclusivas.</p>
            </div>
            <div className="glass-card p-6 rounded-xl">
                <TrendingUp className="text-emerald-600 mb-4" size={32} />
                <h4 className="font-bold text-lg mb-2">Destaque de Perfis</h4>
                <p className="text-sm text-gray-600">Babás podem pagar para aumentar a visibilidade de seus perfis nas buscas.</p>
            </div>
        </div>
      </Section>

      {/* --- Features --- */}
      <Section id={SectionId.FEATURES} className="bg-white" title="Funcionalidades Essenciais" subtitle="Projetado para ser intuitivo, seguro e eficiente.">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
                { title: "Perfis Detalhados", icon: <UserCheck />, text: "Informações completas, escolaridade, fotos e avaliações." },
                { title: "Filtros Avançados", icon: <Search />, text: "Busca por localização, disponibilidade e experiência." },
                { title: "Agendamento e Chat", icon: <MessageCircle />, text: "Sistema integrado para comunicação direta e agenda." },
                { title: "Pagamento Seguro", icon: <CreditCard />, text: "Transações financeiras protegidas via plataforma." }
            ].map((f, i) => (
                <div key={i} className="p-6 rounded-xl bg-emerald-50 border border-emerald-100 hover:border-emerald-300 transition-colors">
                    <div className="mb-4 text-emerald-700">{f.icon}</div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">{f.title}</h4>
                    <p className="text-gray-600 text-sm">{f.text}</p>
                </div>
            ))}
        </div>
      </Section>

      {/* --- Financials --- */}
      <Section id={SectionId.FINANCIALS} title="Metas Financeiras" subtitle="Projeção para atingir rentabilidade inicial.">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
                <FinancialChart data={FINANCIAL_DATA} />
                <p className="text-center text-sm text-gray-500 mt-4">Total Mensal Estimado: <strong className="text-emerald-700">R$ 1.900,00</strong></p>
            </div>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
                    <h4 className="text-lg font-bold text-gray-800">Custo por Usuário Ativo (MAU)</h4>
                    <div className="text-4xl font-bold text-emerald-600 my-2">R$ 9,20</div>
                    <p className="text-gray-600 text-sm">Necessário gerar receita líquida acima deste valor para rentabilidade.</p>
                </div>
                
                <div className="space-y-4">
                    <h4 className="font-semibold text-gray-700">Estrutura de Custos (Cloud)</h4>
                    {COST_DATA.map((cost, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 pb-2">
                            <span className="text-gray-600 flex items-center gap-2">
                                <Cpu size={14} /> {cost.name}
                            </span>
                            <span className="font-medium text-gray-900">{cost.cost}</span>
                        </div>
                    ))}
                    <div className="pt-2 text-right font-bold text-emerald-800">Total: R$ 400 - R$ 800</div>
                </div>
            </div>
        </div>
      </Section>

      {/* --- Marketing --- */}
      <Section id={SectionId.MARKETING} className="bg-emerald-900 text-white" title="Investimento em Marketing" subtitle="Estratégias de crescimento e aquisição.">
         <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-800 p-8 rounded-2xl border border-emerald-700 opacity-75 hover:opacity-100 transition-opacity">
                <div className="text-emerald-400 font-bold text-2xl mb-2">R$ 1.500</div>
                <div className="text-sm text-emerald-200 uppercase tracking-widest mb-4">Pessimista</div>
                <p className="text-emerald-100">Campanha mínima para aquisição inicial.</p>
            </div>
            <div className="bg-emerald-600 p-8 rounded-2xl border border-emerald-500 transform md:-translate-y-4 shadow-xl">
                <div className="text-white font-bold text-3xl mb-2">R$ 3.000</div>
                <div className="text-sm text-emerald-100 uppercase tracking-widest mb-4">Provável</div>
                <p className="text-white">Campanhas ativas em redes sociais e Google Ads.</p>
                <div className="mt-4 inline-block bg-white text-emerald-800 text-xs px-2 py-1 rounded font-bold">RECOMENDADO</div>
            </div>
            <div className="bg-emerald-800 p-8 rounded-2xl border border-emerald-700 opacity-75 hover:opacity-100 transition-opacity">
                <div className="text-emerald-400 font-bold text-2xl mb-2">R$ 5.000</div>
                <div className="text-sm text-emerald-200 uppercase tracking-widest mb-4">Otimista</div>
                <p className="text-emerald-100">Ações de SEO e anúncios segmentados em larga escala.</p>
            </div>
         </div>
      </Section>

      {/* --- Team --- */}
      <Section id={SectionId.TEAM} title="Recursos Humanos" subtitle="Desenvolvimento e Suporte.">
        <div className="flex flex-col md:flex-row gap-8 justify-center">
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 max-w-md">
                <div className="h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                    <img src="https://picsum.photos/400/300?grayscale" alt="Dev" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2">Desenvolvimento</h3>
                <p className="text-emerald-600 font-medium mb-4">R$ 5.000 - R$ 12.000 / mês</p>
                <p className="text-gray-600 text-sm">Desenvolvedor Sênior ou Freelancer para manter e evoluir a plataforma.</p>
            </div>
            <div className="flex-1 bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 max-w-md">
                <div className="h-48 bg-gray-100 rounded-xl mb-6 overflow-hidden">
                     <img src="https://picsum.photos/401/300?grayscale" alt="Support" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold mb-2">Suporte ao Cliente</h3>
                <p className="text-emerald-600 font-medium mb-4">R$ 1.500 - R$ 3.000 / pessoa</p>
                <p className="text-gray-600 text-sm">1 a 2 colaboradores para atendimento das 09h às 12h e suporte geral.</p>
            </div>
        </div>
      </Section>

      {/* --- Footer --- */}
      <footer className="bg-emerald-950 text-emerald-400 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
                <Heart className="h-6 w-6" />
                <span className="font-serif font-bold text-lg text-white">Babás do Futuro</span>
            </div>
            <div className="text-sm text-emerald-600">
                &copy; {new Date().getFullYear()} Todos os direitos reservados. Made with React & Tailwind.
            </div>
        </div>
      </footer>

      {/* --- Gemini Chat Widget --- */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-emerald-200 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-10 h-[500px]">
          {/* Header */}
          <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <span className="font-medium">Assistente Babás do Futuro</span>
            </div>
            <button onClick={() => setIsChatOpen(false)} className="hover:bg-emerald-700 p-1 rounded">
              <X size={18} />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {chatMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                 <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-150"></span>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input 
              type="text" 
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Pergunte sobre nosso plano..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isThinking}
              className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;