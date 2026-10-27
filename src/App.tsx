import React, { useState } from 'react';
import {
  ArrowRight,
  Award,
  Car,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Download,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  Sparkles,
  Utensils,
  X,
  XCircle,
} from 'lucide-react';
import {
  CASE_STUDIES_TESTIMONIALS,
  READY_MENU_CATALOG,
  ReadyMenuItem,
  SIGNATURE_FLAVORS,
  STORE_ADDRESS,
  STRATEGIC_FAQS,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from './data/patisserieData';
import { EditorialImage } from './components/PatisserieArtwork';
import { LayerExplorerSection } from './components/LayerExplorerSection';
import {
  CartItem,
  ConfiguratorTab,
  InteractiveConfigurator,
} from './components/InteractiveConfigurator';
import { CartDrawerModal } from './components/CartDrawerModal';

export default function App() {
  // Mobile Navigation State
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Shared Configurator State (synced with Hero Quick Simulator, Layer Explorer, and Pricing Tiers)
  const [activeTab, setActiveTab] = useState<ConfiguratorTab>('cake');
  const [occasion, setOccasion] = useState<string>('Casamento / Mini Wedding');
  const [guests, setGuests] = useState<number>(40);
  const [cakeStyle, setCakeStyle] = useState<'buttercream' | 'seminaked'>('buttercream');
  const [selectedFlavor, setSelectedFlavor] = useState<string>(SIGNATURE_FLAVORS[0].name);
  const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState<string>('retirada-pituba');

  // Ready-to-Deliver Shopping Bag State
  const [cart, setCart] = useState<CartItem[]>([
    { item: READY_MENU_CATALOG[0], qty: 1 }, // Pre-seeded with 1 slice of Devil's Food Cake so user sees immediate value
  ]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll & Preset Helpers
  const scrollToConfigurator = (
    tab: ConfiguratorTab,
    customGuests?: number,
    customFlavor?: string,
    customStyle?: 'buttercream' | 'seminaked'
  ) => {
    setActiveTab(tab);
    if (customGuests !== undefined) setGuests(customGuests);
    if (customFlavor !== undefined) setSelectedFlavor(customFlavor);
    if (customStyle !== undefined) setCakeStyle(customStyle);

    const el = document.getElementById('configurador');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart Handlers
  const handleAddToCart = (product: ReadyMenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === product.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...prev, { item: product, qty: 1 }];
    });
  };

  const handleUpdateCartQty = (itemId: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => (c.item.id === itemId ? { ...c, qty: c.qty + delta } : c))
        .filter((c) => c.qty > 0)
    );
  };

  const handleClearCart = () => setCart([]);

  const totalCartCount = cart.reduce((acc, c) => acc + c.qty, 0);

  // Hero Quick Preview Estimate
  const heroQuickEstimate = Math.round(
    guests * (13.5 + (cakeStyle === 'buttercream' ? 0.5 : 0))
  );

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#141413] font-sans selection:bg-[#7A1C1C] selection:text-white">
      {/* =====================================================================
          1. BARRA DE TOPO DE AUTORIDADE E URGÊNCIA (Announcement Bar <= 36px)
          ===================================================================== */}
      <div className="bg-[#141413] text-[#FBF8F3] text-[11px] sm:text-xs py-2 px-4 border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 truncate">
            <span className="font-semibold text-[#C5A059]">Agenda 2026 Aberta:</span>
            <span className="text-[#FBF8F3]/85 truncate">
              Degustações para Casamentos & Encomendas na Pituba com produção semanal limitada.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-[#FBF8F3]/80 text-[11px] shrink-0">
            <span>Rua Ramalho Ortigão, 30</span>
            <span aria-hidden="true">·</span>
            <span>Pituba</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#E5D3B3]">Estacionamento Próprio & Pet-Friendly</span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. CABEÇALHO FIXO (Sticky Header com Backdrop Blur - 3-Zone Contract)
          ===================================================================== */}
      <header className="sticky top-0 z-40 bg-[#FBF8F3]/90 backdrop-blur-md border-b border-[#141413]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single clean text element) */}
          <a
            href="#"
            className="font-serif text-xl sm:text-2xl font-bold tracking-[0.14em] text-[#141413] whitespace-nowrap shrink-0"
          >
            JEANNE GARCIA
          </a>

          {/* Zone 2: 5 Concise Single-Line Navigation Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#3E3D38]"
          >
            <a
              href="#diferenciais"
              className="hover:text-[#7A1C1C] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
            >
              Diferenciais
            </a>
            <a
              href="#camadas-sabores"
              className="hover:text-[#7A1C1C] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
            >
              Camadas & Sabores
            </a>
            <a
              href="#configurador"
              className="hover:text-[#7A1C1C] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
            >
              Simulador
            </a>
            <a
              href="#como-funciona"
              className="hover:text-[#7A1C1C] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
            >
              Como Funciona
            </a>
            <a
              href="#duvidas"
              className="hover:text-[#7A1C1C] hover:underline underline-offset-8 decoration-[#C5A059] transition-colors whitespace-nowrap shrink-0"
            >
              Dúvidas
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action (Desktop) / Mobile Menu Button */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#configurador"
              onClick={(e) => {
                e.preventDefault();
                scrollToConfigurator('cake');
              }}
              className="hidden sm:inline-flex min-h-[44px] px-5 py-2.5 bg-[#7A1C1C] hover:bg-[#5E1414] text-white text-xs font-semibold rounded-xl items-center gap-2 transition-colors whitespace-nowrap shrink-0"
            >
              <span>Simular Encomenda</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E5D3B3]" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu de navegação"
              className="lg:hidden p-2.5 rounded-xl border border-[#141413]/15 text-[#141413] hover:bg-[#F3EFE6] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FBF8F3] border-b border-[#C5A059]/40 px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-3 text-sm font-medium text-[#141413]">
              <a
                href="#diferenciais"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-[#141413]/5"
              >
                Diferenciais & Ateliê na Pituba
              </a>
              <a
                href="#camadas-sabores"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-[#141413]/5"
              >
                Explorador de Camadas & Recheios
              </a>
              <a
                href="#configurador"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToConfigurator('cake');
                }}
                className="py-1.5 border-b border-[#141413]/5 text-[#7A1C1C] font-semibold"
              >
                Configurador Online em 3 Abas
              </a>
              <a
                href="#como-funciona"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-[#141413]/5"
              >
                Como Funciona (3 Etapas)
              </a>
              <a
                href="#resultados"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5 border-b border-[#141413]/5"
              >
                Avaliações Verificadas (4.8 ★)
              </a>
              <a
                href="#duvidas"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1.5"
              >
                Perguntas Frequentes
              </a>
            </div>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  scrollToConfigurator('cake');
                }}
                className="min-h-[48px] bg-[#7A1C1C] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Orçar Bolo</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCartDrawerOpen(true);
                }}
                className="min-h-[48px] bg-[#141413] text-[#FBF8F3] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                <span>Comanda ({totalCartCount})</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          3. HERO SECTION (Regra dos 5 Segundos · Layout em 2 Colunas + KPI Bar)
          ===================================================================== */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F3EFE6]/70 via-[#FBF8F3] to-[#FBF8F3] border-b border-[#141413]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Column: Value Proposition, Objections Removed & Dual CTA */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Clean Unboxed Qualification Metadata (Zero-Pill Rule) */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#7A1C1C] tracking-wide">
                  <span>Alta Confeitaria Francesa</span>
                  <span aria-hidden="true">·</span>
                  <span>Pituba, Horto, Itaigara & Caminho das Árvores</span>
                  <span aria-hidden="true">·</span>
                  <span>Casamentos & Brunch</span>
                </div>

                {/* Main High-Impact Headline */}
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-normal text-[#141413]">
                  A excelência da pâtisserie artesanal na Pituba: bolos exclusivos e cafés que transformam celebrações em{' '}
                  <span className="italic font-semibold text-[#7A1C1C]">
                    memória inesquecível.
                  </span>
                </h1>

                {/* Sub-Headline Explaining Mechanism & Eliminating Main Objection */}
                <p className="text-sm sm:text-base lg:text-lg text-[#3E3D38] leading-relaxed max-w-2xl">
                  Do lendário <strong>Devil&apos;s Food Cake 63%</strong>, Choux Cream e Brunch de fim de semana aos bolos esculturais em <strong>Buttercream Seda estável ao calor da Bahia</strong> e Naked Cake. Simule seu orçamento online em 30 segundos — sem enfrentar demora no WhatsApp ou links dispersos.
                </p>

                {/* 3 Concrete Specificity Bullets */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-[#141413]/10 text-xs text-[#3E3D38]">
                  <div>
                    <strong className="text-[#141413] block">Insumos 100% Nobres</strong>
                    Chocolate belga 63%, fava de baunilha, mel nativo e praliné feito no tacho.
                  </div>
                  <div>
                    <strong className="text-[#141413] block">Orçamento ao Vivo</strong>
                    Configure de 10 a 200 fatias com cálculo imediato e frete por bairro.
                  </div>
                  <div>
                    <strong className="text-[#141413] block">Loja Física na Pituba</strong>
                    Rua Ramalho Ortigão, 30 com estacionamento próprio gratuito e área Pet.
                  </div>
                </div>
              </div>

              {/* Dual CTA Block + Friction-Reduction Micro-copy */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="button"
                    onClick={() => scrollToConfigurator('cake')}
                    className="min-h-[52px] px-7 py-3.5 bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
                  >
                    <span>Simular Encomenda de Bolo</span>
                    <ArrowRight className="w-4 h-4 text-[#E5D3B3]" />
                  </button>

                  <a
                    href="#camadas-sabores"
                    className="min-h-[52px] px-6 py-3.5 bg-[#F3EFE6] hover:bg-[#EDE7DA] text-[#141413] border border-[#C5A059]/50 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Explorar Camadas & Recheios</span>
                  </a>
                </div>

                {/* Friction Reduction Micro-copy */}
                <p className="text-xs text-[#7D7A71] flex flex-wrap items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#9A7836] shrink-0" />
                  <span>
                    Cálculo instantâneo na tela · Atendimento humano ágil no WhatsApp {WHATSAPP_DISPLAY}
                  </span>
                </p>
              </div>
            </div>

            {/* Right Column: Rich Interactive Atelier Showcase & Quick Quote Component */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#F3EFE6] rounded-3xl p-5 sm:p-6 border border-[#C5A059]/50 shadow-sm space-y-5">
              {/* Top Showcase Image + Overlay Info */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/30 h-60 sm:h-64 bg-[#EDE7DA]">
                <EditorialImage
                  src="https://lh3.googleusercontent.com/d/1cLQVQN2vWElfAK8kdkfk24TyxdYojlrP"
                  alt="Bolo Artístico em Buttercream Seda Jeanne Garcia Confeitaria na Pituba"
                  fallbackTitle="Alta Confeitaria Autoral Jeanne Garcia"
                  fallbackSubtitle="Buttercream Seda · Flores Naturais · Chocolate Belga 63%"
                  variant="cake-hero"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/85 via-[#141413]/20 to-transparent flex flex-col justify-end p-4 text-[#FBF8F3]">
                  <div className="flex items-center justify-between gap-2 text-xs text-[#E5D3B3]">
                    <span>Ateliê & Cafeteria · Pituba</span>
                    <span className="font-mono">Ter–Dom</span>
                  </div>
                  <p className="font-serif text-xl font-semibold">
                    Projetos Exclusivos para Casamentos & Vitrine Diária
                  </p>
                </div>
              </div>

              {/* Interactive Mini-Simulator inside Hero Right Column */}
              <div className="bg-[#FBF8F3] rounded-2xl p-4 sm:p-5 border border-[#C5A059]/40 space-y-4">
                <div className="flex items-center justify-between border-b border-[#141413]/10 pb-3">
                  <div>
                    <span className="text-[11px] text-[#7D7A71] block">
                      Simulação Rápida de Investimento
                    </span>
                    <h2 className="font-serif text-xl font-bold text-[#141413]">
                      Escolha o Porte do Seu Evento
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-[#7D7A71] block">A partir de</span>
                    <span className="font-serif text-2xl font-bold text-[#7A1C1C] tabular-nums">
                      R$ {heroQuickEstimate.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>

                {/* Interactive Guest Quick Selector */}
                <div className="space-y-1.5">
                  <span className="text-xs font-medium text-[#3E3D38] block">
                    Quantidade de Convidados:
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { count: 15, label: '15 fatias' },
                      { count: 40, label: '40 fatias' },
                      { count: 80, label: '80 fatias' },
                      { count: 120, label: '120 fatias' },
                    ].map((opt) => (
                      <button
                        key={opt.count}
                        type="button"
                        onClick={() => setGuests(opt.count)}
                        className={`py-2 px-2 rounded-lg font-mono text-xs transition-colors cursor-pointer tabular-nums ${
                          guests === opt.count
                            ? 'bg-[#141413] text-[#FBF8F3] font-semibold'
                            : 'bg-[#F3EFE6] text-[#3E3D38] hover:bg-[#EDE7DA]'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Access Bar for All 3 Experiences */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => scrollToConfigurator('cake', guests)}
                    className="min-h-[44px] px-4 py-2.5 bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5 text-[#E5D3B3]" />
                    <span>Personalizar Bolo ({guests}p)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsCartDrawerOpen(true)}
                    className="min-h-[44px] px-4 py-2.5 bg-[#F3EFE6] hover:bg-[#EDE7DA] text-[#141413] border border-[#C5A059]/40 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#7A1C1C]" />
                    <span>Pronta-Entrega ({totalCartCount})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Immediate Credibility Strip (Full-Width 4-Column Row Below Hero Split) */}
          <div className="mt-12 pt-8 border-t border-[#C5A059]/40 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#141413] tabular-nums">
                4.8 ★ <span className="text-lg font-normal text-[#9A7836]">/ 5.0</span>
              </div>
              <p className="text-xs text-[#3E3D38] mt-1">
                Nota média auditada em <strong>160+ avaliações</strong> reais no Google Maps.
              </p>
            </div>

            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#141413] tabular-nums">
                500+ Celebrações
              </div>
              <p className="text-xs text-[#3E3D38] mt-1">
                Casamentos, bodas e aniversários entregues com pontualidade em Salvador.
              </p>
            </div>

            <div>
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#7A1C1C]">
                Top 3 Salvador
              </div>
              <p className="text-xs text-[#3E3D38] mt-1">
                Eleita destaque gastronômico da cidade pelo júri do Jornal Correio.
              </p>
            </div>

            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#141413]">
                Rua Ramalho Ortigão, 30
              </div>
              <p className="text-xs text-[#3E3D38] mt-1">
                Sede própria na Pituba (ao lado do Almacen Pepe) com vagas gratuitas na porta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. SEÇÃO DE CONTRASTE COGNITIVO (Mercado Tradicional vs. Jeanne Garcia)
          ===================================================================== */}
      <section className="py-20 bg-[#F3EFE6] border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 space-y-3">
            <div className="text-xs font-semibold text-[#7A1C1C] tracking-wide">
              Comparativo de Segurança & Previsibilidade
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
              O risco das encomendas informais vs. O padrão Jeanne Garcia
            </h2>
            <p className="text-sm sm:text-base text-[#3E3D38]">
              Entenda por que noivas, cerimonialistas e anfitriões exigentes da Pituba e do Horto Florestal migraram para o nosso sistema de atendimento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
            {/* Column 1: Traditional Market Risks */}
            <div className="bg-[#FBF8F3] rounded-3xl p-7 sm:p-9 border border-[#141413]/15 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="border-b border-[#141413]/10 pb-4">
                  <span className="text-xs font-semibold text-[#7D7A71] block">
                    O Mercado Tradicional em Salvador
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141413] mt-1">
                    Confeitarias Informais & Portais Desatualizados
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-[#3E3D38]">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-0.5" />
                    <span>
                      <strong>Demora de 24h a 48h no WhatsApp:</strong> você precisa implorar por uma tabela de preços apenas para descobrir quanto custa um bolo para 40 convidados.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-0.5" />
                    <span>
                      <strong>Coberturas instáveis e enjoativas:</strong> uso de chantininho ou gordura hidrogenada que derrete no calor da Bahia ou pasta americana espessa que sobra nos pratos.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-0.5" />
                    <span>
                      <strong>Endereços fantasmas em portais de terceiros:</strong> perfis antigos sem loja física onde você não consegue estacionar nem provar uma fatia antes de assinar contrato.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-[#7A1C1C] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sobretaxas de até 27% em aplicativos:</strong> cardápios de pronta-entrega inflacionados para compensar comissões de plataformas de delivery.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#141413]/10 text-xs text-[#7D7A71]">
                Resultado comum: insegurança quanto ao visual do bolo, atrasos na entrega e paladar artificial.
              </div>
            </div>

            {/* Column 2: Jeanne Garcia Approach */}
            <div className="bg-[#141413] text-[#FBF8F3] rounded-3xl p-7 sm:p-9 border border-[#C5A059] flex flex-col justify-between">
              <div className="space-y-6">
                <div className="border-b border-[#C5A059]/30 pb-4">
                  <span className="text-xs font-semibold text-[#C5A059] block">
                    A Experiência Jeanne Garcia Confeitaria
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#FBF8F3] mt-1">
                    Alta Pâtisserie Francesa com Previsibilidade Digital
                  </h3>
                </div>

                <ul className="space-y-4 text-xs sm:text-sm text-[#FBF8F3]/90">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      <strong>Configurador de Orçamento em 30 Segundos:</strong> simule convidados (10 a 200), estilo, sabor e frete por bairro com transparência imediata na tela.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      <strong>Buttercream de Merengue Suíço & Cacau 63%:</strong> textura de seda formulada para o clima de Salvador, combinada a praliné de castanhas e coulis de frutas reais.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      <strong>Sede Própria na Rua Ramalho Ortigão, 30 (Pituba):</strong> cafeteria elegante com estacionamento próprio gratuito para você degustar cada receita pessoalmente.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                    <span>
                      <strong>Comanda Direta Sem Taxa de App:</strong> peça fatias, Choux Cream, Macarons e Croissants pelo preço real da vitrine com entrega ágil no seu bairro.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-2 text-xs text-[#E5D3B3]">
                <span>Segurança contratual do primeiro clique ao corte do bolo.</span>
                <button
                  type="button"
                  onClick={() => scrollToConfigurator('cake')}
                  className="font-semibold text-[#C5A059] underline hover:text-white cursor-pointer"
                >
                  Simular meu bolo agora →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. PROPOSTA DE VALOR EM BENTO GRID + EXPLORADOR DE CAMADAS & COLEÇÃO
          ===================================================================== */}
      <section id="diferenciais" className="py-20 sm:py-24 bg-[#FBF8F3] border-b border-[#141413]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Bento Grid Header */}
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 text-xs text-[#7A1C1C] font-semibold tracking-wide">
              <span>O Mecanismo Único Jeanne Garcia</span>
              <span aria-hidden="true">·</span>
              <span>Técnica Parisiense em Salvador</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
              Por que nossas criações são referência de alta confeitaria na Bahia
            </h2>
          </div>

          {/* Asymmetric Bento Grid (5 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bento Card 1 (Spans 2 columns on desktop) */}
            <div className="lg:col-span-2 bg-[#F3EFE6] rounded-3xl p-7 sm:p-9 border border-[#C5A059]/40 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 space-y-3">
                <span className="font-mono text-xs font-semibold text-[#7A1C1C]">
                  01. ENGENHARIA GASTRONÔMICA & CLIMA
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#141413]">
                  Buttercream Seda Estável ao Calor Tropical de Salvador
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Esqueça coberturas pesadas ou bolos que cedem durante a festa. Nossa emulsão autoral de merengue suíço com manteiga extra sem sal e fava de baunilha garante acabamento acetinado impecável por horas na mesa do cerimonial, com dulçor suave que valoriza o recheio.
                </p>
              </div>
              <div className="sm:col-span-5 h-52 sm:h-full min-h-[200px] rounded-2xl overflow-hidden border border-[#C5A059]/30">
                <EditorialImage
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=85"
                  alt="Detalhe macro de bolo autoral com chocolate belga 63%"
                  fallbackTitle="Textura Acetinada & Cacau 63%"
                  fallbackSubtitle="Estabilidade Térmica Comprovada"
                  variant="devils"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bento Card 2 */}
            <div className="bg-[#141413] text-[#FBF8F3] rounded-3xl p-7 sm:p-8 border border-[#C5A059]/60 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C5A059]/20 text-[#C5A059] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#C5A059] block">
                  02. CREDENCIAL AUDITADA
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FBF8F3]">
                  Nota 4.8 ★ (160+ Avaliações) & Top 3 Salvador
                </h3>
                <p className="text-xs sm:text-sm text-[#FBF8F3]/80 leading-relaxed">
                  Reconhecida três vezes pela crítica gastronômica soteropolitana e avaliada com excelência por noivas, médicos, arquitetos e famílias da Pituba, Horto e Itaigara.
                </p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs text-[#E5D3B3]">
                Reputação construída em entregas reais desde a primeira fornada.
              </div>
            </div>

            {/* Bento Card 3 */}
            <div className="bg-[#F3EFE6] rounded-3xl p-7 sm:p-8 border border-[#C5A059]/40 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#7A1C1C] text-white flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#7A1C1C] block">
                  03. INSUMOS DE ORIGEM
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141413]">
                  Chocolate 63%, Mel de Abelhas Nativas & Praliné
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Rejeitamos bases prontas e aromatizantes sintéticos. Cada caramelo, coulis de frutas vermelhas, curd de limão siciliano e crocante de castanha de caju é preparado do zero em nosso ateliê.
                </p>
              </div>
              <div className="pt-3 border-t border-[#141413]/10 text-xs text-[#3E3D38] font-medium">
                Rastreabilidade total de ingredientes nobres.
              </div>
            </div>

            {/* Bento Card 4 */}
            <div className="bg-[#F3EFE6] rounded-3xl p-7 sm:p-8 border border-[#C5A059]/40 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#4A5238] text-[#FBF8F3] flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#4A5238] block">
                  04. CONFORTO NA PITUBA
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141413]">
                  Estacionamento Próprio & Ambiente Pet-Friendly
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Situada na tranquila Rua Ramalho Ortigão, 30, nossa cafeteria oferece vagas na porta para retirada segura de bolos e mesas acolhedoras para você trazer seu pet durante o Brunch.
                </p>
              </div>
              <div className="pt-3 border-t border-[#141413]/10 text-xs text-[#4A5238] font-medium">
                Ao lado do Almacen Pepe · Fácil acesso.
              </div>
            </div>

            {/* Bento Card 5 */}
            <div className="bg-[#4A5238] text-[#FBF8F3] rounded-3xl p-7 sm:p-8 border border-[#C5A059]/50 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#FBF8F3]/15 text-[#E5D3B3] flex items-center justify-center">
                  <Utensils className="w-5 h-5" />
                </div>
                <span className="font-mono text-xs font-semibold text-[#E5D3B3] block">
                  05. BRUNCH DE FIM DE SEMANA
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FBF8F3]">
                  Croissants Folhados, Toasts & Cafés Especiais 86 pts
                </h3>
                <p className="text-xs sm:text-sm text-[#FBF8F3]/85 leading-relaxed">
                  Aos sábados e domingos a partir das 08h, servimos nosso menu de Brunch parisiense com brioches de fermentação lenta, Choux Cream montado na hora e cafés da Chapada Diamantina.
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToConfigurator('brunch')}
                className="pt-3 border-t border-white/15 text-xs text-[#E5D3B3] font-semibold text-left hover:underline cursor-pointer"
              >
                Reservar mesa para Sábado ou Domingo →
              </button>
            </div>
          </div>

          {/* Interactive Visual Layer & Filling Explorer (Confirmed Phase 1 Feature) */}
          <LayerExplorerSection
            onSelectFlavorForQuote={(flavorName, style) => {
              scrollToConfigurator('cake', undefined, flavorName, style);
            }}
          />

          {/* Featured 3-Column Signature Collection Showcase */}
          <div id="colecao" className="pt-12 border-t border-[#141413]/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-semibold text-[#7A1C1C] block">
                  Vitrine de Bolos Celebrados
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413] mt-1">
                  Coleção Autoral Signature
                </h3>
              </div>
              <button
                type="button"
                onClick={() => scrollToConfigurator('cake')}
                className="text-xs font-semibold text-[#141413] hover:text-[#7A1C1C] underline underline-offset-8 decoration-[#C5A059] self-start sm:self-auto cursor-pointer"
              >
                Configurar tamanho personalizado (10 a 200 fatias) →
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  flavorObj: SIGNATURE_FLAVORS[2], // Pistache
                  img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=700&q=80',
                  variant: 'pistachio' as const,
                  kicker: 'Alta Pâtisserie · Frutas Vermelhas',
                },
                {
                  flavorObj: SIGNATURE_FLAVORS[0], // Devil's Food
                  img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80',
                  variant: 'devils' as const,
                  kicker: 'Campeão de Pedidos · Chocolate 63%',
                },
                {
                  flavorObj: SIGNATURE_FLAVORS[1], // Lemon Croc
                  img: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=700&q=80',
                  variant: 'lemon' as const,
                  kicker: 'Cítrico & Crocante · Praliné de Caju',
                },
              ].map(({ flavorObj, img, variant, kicker }) => (
                <div
                  key={flavorObj.id}
                  className="bg-[#F3EFE6] rounded-3xl overflow-hidden border border-[#C5A059]/35 flex flex-col justify-between group hover:-translate-y-0.5 transition-transform duration-150"
                >
                  <div>
                    <div className="h-64 overflow-hidden bg-[#EDE7DA]">
                      <EditorialImage
                        src={img}
                        alt={flavorObj.name}
                        fallbackTitle={flavorObj.shortName}
                        fallbackSubtitle={kicker}
                        variant={variant}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-xs text-[#7D7A71] uppercase tracking-wider">
                        {kicker}
                      </p>
                      <h4 className="font-serif text-2xl font-bold text-[#141413] mt-1">
                        {flavorObj.shortName}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#3E3D38] mt-2 leading-relaxed line-clamp-3">
                        {flavorObj.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-3 border-t border-[#141413]/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7D7A71] block">A partir de (15p)</span>
                      <span className="font-mono text-base font-bold text-[#141413] tabular-nums">
                        R$ {flavorObj.startingPrice15Slices.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToConfigurator(
                          'cake',
                          30,
                          flavorObj.name,
                          flavorObj.recommendedStyle
                        )
                      }
                      className="min-h-[42px] px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#7A1C1C] text-[#FBF8F3] text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Orçar Este Sabor
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. COMPONENTE INTERATIVO DE ALTO ENGAJAMENTO (Configurador em 3 Abas)
          ===================================================================== */}
      <InteractiveConfigurator
        activeTab={activeTab}
        onTabChange={setActiveTab}
        occasion={occasion}
        onOccasionChange={setOccasion}
        guests={guests}
        onGuestsChange={setGuests}
        cakeStyle={cakeStyle}
        onCakeStyleChange={setCakeStyle}
        selectedFlavor={selectedFlavor}
        onFlavorChange={setSelectedFlavor}
        selectedNeighborhoodId={selectedNeighborhoodId}
        onNeighborhoodChange={setSelectedNeighborhoodId}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateCartQty={handleUpdateCartQty}
        onOpenCartDrawer={() => setIsCartDrawerOpen(true)}
      />

      {/* =====================================================================
          7. COMO FUNCIONA (Jornada Simples e Sem Burocracia em 3 Etapas)
          ===================================================================== */}
      <section
        id="como-funciona"
        className="py-20 sm:py-24 bg-[#F3EFE6] border-b border-[#C5A059]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <div className="text-xs font-semibold text-[#7A1C1C] tracking-wide">
              Jornada Clara & Sem Burocracia
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
              Como funciona sua encomenda em 3 etapas
            </h2>
            <p className="text-sm sm:text-base text-[#3E3D38]">
              Do primeiro clique no simulador até o transporte refrigerado para o seu evento, cuidamos de cada detalhe técnico.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FBF8F3] p-7 sm:p-8 rounded-3xl border border-[#C5A059]/40 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-serif text-4xl font-bold text-[#C5A059] block tabular-nums">
                  01. Simulação Online
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141413]">
                  Configure Fatias, Estilo, Sabor e Bairro em 30 Segundos
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Use nosso Configurador acima para definir o porte do bolo (10 a 200 convidados), escolher entre Buttercream Seda ou Semi-Naked e calcular a entrega climatizada para o seu bairro.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#141413]/10 text-xs text-[#7D7A71]">
                Resumo enviado pronto para o nosso WhatsApp sem precisar digitar do zero.
              </div>
            </div>

            <div className="bg-[#FBF8F3] p-7 sm:p-8 rounded-3xl border border-[#C5A059]/40 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-serif text-4xl font-bold text-[#C5A059] block tabular-nums">
                  02. Degustação & Design
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141413]">
                  Alinhamento Estético e Degustação na Pituba
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Para casamentos e celebrações maiores, recebemos você na Rua Ramalho Ortigão, 30 (ou enviamos nossa Caixa de Degustação). Definimos paleta floral, croqui de andares e contrato com reserva de data.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#141413]/10 text-xs text-[#7D7A71]">
                Atendimento consultivo direto com a equipe da Chef Jeanne Garcia.
              </div>
            </div>

            <div className="bg-[#FBF8F3] p-7 sm:p-8 rounded-3xl border border-[#C5A059]/40 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="font-serif text-4xl font-bold text-[#C5A059] block tabular-nums">
                  03. Entrega Climatizada
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#141413]">
                  Produção Fresca & Montagem Segura no Local
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Seu bolo é produzido artesanalmente nas vésperas do evento com ingredientes frescos e transportado em veículo climatizado até o seu cerimonial ou preparado em caixa rígida para retirada na porta.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#141413]/10 text-xs text-[#7D7A71]">
                Pontualidade contratual garantida para sua tranquilidade.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. PROVA SOCIAL E ESTUDOS DE CASO (3 Cards Estruturados Verificados)
          ===================================================================== */}
      <section
        id="resultados"
        className="py-20 sm:py-24 bg-[#FBF8F3] border-b border-[#141413]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#7A1C1C]">
              <span>Nota 4.8 ★ no Google Maps</span>
              <span aria-hidden="true">·</span>
              <span>160+ Relatos Auditados</span>
              <span aria-hidden="true">·</span>
              <span>Casamentos & Brunch</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
              Histórias reais de quem confiou seu evento à Jeanne Garcia
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {CASE_STUDIES_TESTIMONIALS.map((study) => (
              <div
                key={study.id}
                className="bg-[#F3EFE6] p-7 sm:p-8 rounded-3xl border border-[#C5A059]/40 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Quantified Metric Result at Top of Card */}
                  <div className="pb-4 border-b border-[#141413]/10">
                    <span className="text-xs text-[#7D7A71] block">{study.occasionTag}</span>
                    <p className="font-serif text-xl font-bold text-[#7A1C1C] mt-0.5">
                      {study.metricHighlight}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#141413] leading-relaxed italic">
                    &ldquo;{study.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#141413]/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#141413] block">
                      {study.clientName}
                    </span>
                    <span className="text-xs text-[#7D7A71] block">{study.clientRole}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#4A5238] shrink-0">
                    {study.verifiedSource}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. ESCOPO DE OFERTA / MODALIDADES DE ATENDIMENTO (Ancoragem 3 Níveis)
          ===================================================================== */}
      <section className="py-20 sm:py-24 bg-[#F3EFE6] border-b border-[#C5A059]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-3">
            <div className="text-xs font-semibold text-[#7A1C1C] tracking-wide">
              Escopo Transparente de Atendimento
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
              Escolha a modalidade ideal para a sua celebração
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Level 1: Ligne Intime */}
            <div className="bg-[#FBF8F3] rounded-3xl p-8 border border-[#C5A059]/40 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
              <div className="space-y-4">
                <div className="text-xs text-[#7D7A71] font-semibold">
                  01. CELEBRAÇÕES ÍNTIMAS (10 A 25 FATIAS)
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#141413]">
                  Ligne Intime
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38]">
                  Ideal para aniversários em família, jantares comemorativos, noivados íntimos e mesversários elegantes.
                </p>

                <div className="py-4 border-y border-[#141413]/10">
                  <span className="text-xs text-[#7D7A71] block">Investimento a partir de</span>
                  <div className="font-serif text-3xl font-bold text-[#141413] tabular-nums">
                    R$ 202,50{' '}
                    <span className="text-xs font-sans font-normal text-[#7D7A71]">
                      (15 fatias generosas)
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#3E3D38]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Bolo de 1 andar alto estruturado (5 camadas internas)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Acabamento em Buttercream Seda ou Semi-Naked</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Embalagem rígida de segurança inclusa</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Prazo ágil de produção: 48h a 72h</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollToConfigurator('cake', 15)}
                className="mt-8 w-full min-h-[48px] rounded-xl border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-[#FBF8F3] text-xs font-semibold transition-colors cursor-pointer"
              >
                Simular Ligne Intime (15 a 25p)
              </button>
            </div>

            {/* Level 2: Haute Mariage & Gala (Most Chosen / Featured) */}
            <div className="bg-[#141413] text-[#FBF8F3] rounded-3xl p-8 border-2 border-[#C5A059] flex flex-col justify-between relative transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#C5A059] font-semibold">
                  <span>02. CASAMENTOS & GRANDES EVENTOS</span>
                  <span className="underline">Mais Escolhido</span>
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#FBF8F3]">
                  Haute Mariage & Gala
                </h3>
                <p className="text-xs sm:text-sm text-[#FBF8F3]/80">
                  Projetos esculturais de 2 a 4 andares (30 a 200 convidados) com atendimento consultivo e degustação prévia na Pituba.
                </p>

                <div className="py-4 border-y border-[#C5A059]/30">
                  <span className="text-xs text-[#E5D3B3] block">Valor base por fatia a partir de</span>
                  <div className="font-serif text-3xl font-bold text-[#C5A059] tabular-nums">
                    R$ 13,50{' '}
                    <span className="text-xs font-sans font-normal text-[#FBF8F3]/70">
                      / fatia estruturada
                    </span>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#FBF8F3]/90">
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Sessão de degustação presencial na Rua Ramalho Ortigão, 30</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Possibilidade de sabores diferentes em cada andar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Arranjos florais orgânicos higienizados e folhas de ouro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <span>Transporte refrigerado e finalização na mesa do cerimonial</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollToConfigurator('cake', 80)}
                className="mt-8 w-full min-h-[50px] rounded-xl bg-[#7A1C1C] hover:bg-[#5E1414] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                Montar Orçamento de Casamento / Festa
              </button>
            </div>

            {/* Level 3: Pâtisserie & Brunch */}
            <div className="bg-[#FBF8F3] rounded-3xl p-8 border border-[#C5A059]/40 flex flex-col justify-between transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl">
              <div className="space-y-4">
                <div className="text-xs text-[#7D7A71] font-semibold">
                  03. VITRINE DIÁRIA & FIM DE SEMANA
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#141413]">
                  Pâtisserie & Brunch
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38]">
                  Para saborear hoje mesmo em nossa cafeteria na Pituba, receber em casa sem taxas de app ou presentear com elegância.
                </p>

                <div className="py-4 border-y border-[#141413]/10">
                  <span className="text-xs text-[#7D7A71] block">Fatias, Choux, Macarons & Croissants</span>
                  <div className="font-serif text-3xl font-bold text-[#141413] tabular-nums">
                    R$ 21,00 – R$ 48,00
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-[#3E3D38]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Pronta-entrega fresca de Terça a Domingo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Pedido direto pelo site com frete fixo por bairro</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Coffrets presenteáveis de Macarons franceses</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4A5238] shrink-0" />
                    <span>Reserva gratuita de mesa para o Brunch (Sáb e Dom)</span>
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={() => scrollToConfigurator('delivery')}
                className="mt-8 w-full min-h-[48px] rounded-xl border border-[#141413] text-[#141413] hover:bg-[#141413] hover:text-[#FBF8F3] text-xs font-semibold transition-colors cursor-pointer"
              >
                Abrir Cardápio de Pronta-Entrega
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. BLOCO DE GARANTIA E REVERSÃO DE RISCO (Blindagem de Decisão)
          ===================================================================== */}
      <section className="py-16 bg-[#FBF8F3] border-b border-[#141413]/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F3EFE6] rounded-3xl p-8 sm:p-10 border border-[#C5A059]/50 flex flex-col md:flex-row items-center gap-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#141413] text-[#C5A059] border border-[#C5A059] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-9 h-9" />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <div className="text-xs font-semibold text-[#7A1C1C]">
                Blindagem Tripla de Qualidade Jeanne Garcia
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#141413]">
                Compromisso de Fidelidade de Insumos, Estabilidade Térmica e Pontualidade
              </h2>
              <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                Garantimos formalmente que o bolo entregue na sua celebração utiliza exatamente a mesma manteiga extra, chocolate belga 63%, fava de baunilha e praliné artesanal aprovados na sua degustação. Além disso, nossa estruturação interna de andares e logística climatizada asseguram que sua encomenda chegue intacta e no horário combinado com o seu cerimonial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. PERGUNTAS FREQUENTES (FAQ Estratégico Interativo)
          ===================================================================== */}
      <section id="duvidas" className="py-20 sm:py-24 bg-[#FBF8F3] border-b border-[#141413]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-2">
            <div className="text-xs font-semibold text-[#7A1C1C]">
              Respostas Diretas às Principais Objeções
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413]">
              Perguntas Frequentes sobre Encomendas, Casamentos & Brunch
            </h2>
          </div>

          <div className="space-y-3">
            {STRATEGIC_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="border border-[#C5A059]/40 rounded-2xl bg-[#F3EFE6] overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full min-h-[56px] px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif text-lg sm:text-xl font-bold text-[#141413]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#7A1C1C] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-3 text-xs sm:text-sm text-[#3E3D38] leading-relaxed border-t border-[#141413]/10 bg-[#FBF8F3]/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          12. RODAPÉ DE CONVERSÃO FINAL + MAPA DA PITUBA + FLOATING CTA
          ===================================================================== */}
      <footer className="bg-[#141413] text-[#FBF8F3]">
        {/* Top Conversion Banner & Physical Storefront Map */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="text-xs font-semibold text-[#C5A059]">
                Ateliê & Cafeteria Oficial na Pituba
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#FBF8F3]">
                Pronta para transformar sua próxima celebração?
              </h2>
              <p className="text-xs sm:text-sm text-[#FBF8F3]/80 leading-relaxed max-w-xl">
                Visite nossa loja física na <strong>Rua Ramalho Ortigão, 30 – Pituba</strong> (ao lado do Almacen Pepe) para um café especial acompanhado da nossa vitrine francesa ou fale diretamente com nossa equipe pelo WhatsApp.
              </p>

              <div className="space-y-2 text-xs text-[#FBF8F3]/85 pt-2">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong>Endereço Oficial:</strong> {STORE_ADDRESS} (Estacionamento gratuito na porta)
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong>Terça a Sexta:</strong> 13h00 às 19h00
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong>Sábado (Brunch & Café):</strong> 08h00 às 12h00 · 14h00 às 19h00
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Coffee className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong>Domingo (Brunch & Café):</strong> 08h00 às 12h00 · 14h00 às 18h00
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong>WhatsApp de Atendimento:</strong> {WHATSAPP_DISPLAY}
                  </span>
                </p>
              </div>

              <div className="pt-3 flex flex-wrap gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    'Olá, Chef Jeanne Garcia! Vim pelo site oficial e gostaria de atendimento.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-6 py-3 bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Falar no WhatsApp {WHATSAPP_DISPLAY}</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Rua+Ramalho+Ortigao+30+Pituba+Salvador"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 py-3 bg-white/10 hover:bg-white/15 text-[#FBF8F3] border border-[#C5A059]/40 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>Traçar Rota no Google Maps</span>
                </a>
              </div>
            </div>

            {/* Embedded Map of Rua Ramalho Ortigão, 30 - Pituba */}
            <div className="lg:col-span-6 h-80 rounded-3xl overflow-hidden border border-[#C5A059]/40 bg-[#3E3D38]">
              <iframe
                title="Mapa Jeanne Garcia Confeitaria Rua Ramalho Ortigão 30 Pituba"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.6713781987595!2d-38.4619717!3d-12.9928509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7161bb7a23da277%3A0x6b107e3a9c78822!2sRua%20Ramalho%20Ortig%C3%A3o%2C%2030%20-%20Pituba%2C%20Salvador%20-%20BA!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Quiet Institutional Bottom Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FBF8F3]/60">
          <div>
            <span className="font-serif text-lg font-bold text-[#FBF8F3] tracking-wider mr-3">
              JEANNE GARCIA
            </span>
            <span>
              © {new Date().getFullYear()} Jeanne Garcia Confeitaria & Cafeteria · Todos os direitos reservados.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <a href="#diferenciais" className="hover:text-[#C5A059]">
              Diferenciais
            </a>
            <a href="#camadas-sabores" className="hover:text-[#C5A059]">
              Sabores
            </a>
            <a href="#configurador" className="hover:text-[#C5A059]">
              Simulador
            </a>
            <a href="#duvidas" className="hover:text-[#C5A059]">
              FAQ
            </a>
            <a
              href="/Jeanne_Garcia_Remodelado_CRO.html"
              download="Jeanne_Garcia_Confeitaria_Cafeteria.html"
              className="inline-flex items-center gap-1 text-[#C5A059] hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Versão HTML</span>
            </a>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING WHATSAPP CTA + CART QUICK BUTTON (Compact <= 15% Mobile Cap)
          ===================================================================== */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5">
        {totalCartCount > 0 && (
          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label="Abrir comanda de pronta-entrega"
            className="min-h-[48px] px-4 py-2.5 rounded-full bg-[#141413] hover:bg-[#3E3D38] text-[#FBF8F3] border border-[#C5A059] shadow-lg flex items-center gap-2 text-xs font-semibold transition-transform hover:scale-102 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
            <span className="font-mono tabular-nums">({totalCartCount})</span>
          </button>
        )}

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
            'Olá, Chef Jeanne Garcia! Vim pelo site e gostaria de simular uma encomenda ou reserva.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com Jeanne Garcia no WhatsApp"
          className="min-h-[48px] px-5 py-2.5 rounded-full bg-[#7A1C1C] hover:bg-[#5E1414] text-white shadow-lg flex items-center gap-2.5 text-xs font-semibold transition-transform hover:scale-102"
        >
          <MessageCircle className="w-4 h-4 text-[#E5D3B3]" />
          <span>WhatsApp Pituba</span>
        </a>
      </div>

      {/* =====================================================================
          SLIDE-OVER CART & CHECKOUT DRAWER
          ===================================================================== */}
      <CartDrawerModal
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
        selectedNeighborhoodId={selectedNeighborhoodId}
        onNeighborhoodChange={setSelectedNeighborhoodId}
        onGoToMenu={() => scrollToConfigurator('delivery')}
      />
    </div>
  );
}
