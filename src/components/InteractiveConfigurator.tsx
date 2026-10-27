import React, { useState } from 'react';
import {
  ArrowRight,
  CalendarCheck,
  Check,
  CheckCircle2,
  Coffee,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Sliders,
  Sparkles,
  Truck,
} from 'lucide-react';
import {
  READY_MENU_CATALOG,
  ReadyMenuItem,
  SALVADOR_NEIGHBORHOODS,
  SIGNATURE_FLAVORS,
  STORE_ADDRESS,
  WHATSAPP_NUMBER,
} from '../data/patisserieData';

export type ConfiguratorTab = 'cake' | 'delivery' | 'brunch';

export interface CartItem {
  item: ReadyMenuItem;
  qty: number;
}

interface InteractiveConfiguratorProps {
  activeTab: ConfiguratorTab;
  onTabChange: (tab: ConfiguratorTab) => void;
  occasion: string;
  onOccasionChange: (val: string) => void;
  guests: number;
  onGuestsChange: (val: number) => void;
  cakeStyle: 'buttercream' | 'seminaked';
  onCakeStyleChange: (val: 'buttercream' | 'seminaked') => void;
  selectedFlavor: string;
  onFlavorChange: (val: string) => void;
  selectedNeighborhoodId: string;
  onNeighborhoodChange: (id: string) => void;
  cart: CartItem[];
  onAddToCart: (item: ReadyMenuItem) => void;
  onUpdateCartQty: (itemId: number, delta: number) => void;
  onOpenCartDrawer: () => void;
}

export const InteractiveConfigurator: React.FC<InteractiveConfiguratorProps> = ({
  activeTab,
  onTabChange,
  occasion,
  onOccasionChange,
  guests,
  onGuestsChange,
  cakeStyle,
  onCakeStyleChange,
  selectedFlavor,
  onFlavorChange,
  selectedNeighborhoodId,
  onNeighborhoodChange,
  cart,
  onAddToCart,
  onUpdateCartQty,
  onOpenCartDrawer,
}) => {
  // Optional Finishing Touches for Custom Cake
  const [addonFlowers, setAddonFlowers] = useState<boolean>(true);
  const [addonGoldLeaf, setAddonGoldLeaf] = useState<boolean>(false);
  const [addonTopper, setAddonTopper] = useState<boolean>(false);
  const [eventDate, setEventDate] = useState<string>('');

  // Tab 2 Menu Category Filter
  const [menuCategory, setMenuCategory] = useState<string>('todos');

  // Tab 3 Brunch Form State
  const [brunchName, setBrunchName] = useState<string>('');
  const [brunchPhone, setBrunchPhone] = useState<string>('');
  const [brunchShift, setBrunchShift] = useState<string>('Sábado · Turno Manhã (08h às 12h)');
  const [brunchGuests, setBrunchGuests] = useState<string>('2 Pessoas');
  const [brunchArea, setBrunchArea] = useState<string>('Salão Interno Climatizado');
  const [brunchNotes, setBrunchNotes] = useState<string>('');
  const [brunchConfirmedCode, setBrunchConfirmedCode] = useState<string | null>(null);
  const [brunchError, setBrunchError] = useState<string | null>(null);

  // Compute Custom Cake Estimate
  const currentNeighborhood =
    SALVADOR_NEIGHBORHOODS.find((n) => n.id === selectedNeighborhoodId) ||
    SALVADOR_NEIGHBORHOODS[0];

  const matchedFlavorObj =
    SIGNATURE_FLAVORS.find((f) => f.name === selectedFlavor) || SIGNATURE_FLAVORS[0];

  const baseSlicePrice = 13.5;
  const styleSupplement = cakeStyle === 'buttercream' ? 0.5 : 0;
  const flavorSupplement = matchedFlavorObj.priceSupplementPerSlice;
  const effectiveSlicePrice = baseSlicePrice + styleSupplement + flavorSupplement;

  const cakeSubtotal = Math.round(guests * effectiveSlicePrice);
  const addonsTotal =
    (addonFlowers ? 65 : 0) + (addonGoldLeaf ? 45 : 0) + (addonTopper ? 55 : 0);
  const logisticsFee = currentNeighborhood.refrigeratedCakeFee;
  const totalCakeEstimate = cakeSubtotal + addonsTotal + logisticsFee;

  // Tier Recommendation Logic
  let tierTitle = 'Bolo 1 Andar Alto Estruturado (15 cm)';
  let tierSubtitle = 'Proporção contemporânea ideal para celebrações íntimas.';
  if (guests >= 30 && guests <= 65) {
    tierTitle = 'Bolo de 2 Andares Estruturados';
    tierSubtitle = 'Arquitetura clássica com cinta interna de sustentação segura.';
  } else if (guests > 65 && guests <= 120) {
    tierTitle = 'Bolo Monumental de 3 Andares';
    tierSubtitle = 'Presença cênica imponente para casamentos e recepções.';
  } else if (guests > 120) {
    tierTitle = 'Projeto Grand Gala de 4 Andares';
    tierSubtitle = 'Obra-prima escultural com transporte refrigerado dedicado.';
  }

  const styleDisplay =
    cakeStyle === 'buttercream' ? 'Buttercream Seda Estável' : 'Naked / Semi-Naked Cake';

  const activeAddonsList = [
    addonFlowers ? 'Flores Naturais Higienizadas' : null,
    addonGoldLeaf ? 'Folha de Ouro Comestível' : null,
    addonTopper ? 'Topo Caligráfico' : null,
  ].filter(Boolean);

  const cakeWhatsAppMessage =
    `Olá, Chef Jeanne Garcia! Simulei meu bolo personalizado no site e gostaria de consultar disponibilidade:\n\n` +
    `• *Ocasião:* ${occasion}\n` +
    (eventDate ? `• *Data prevista:* ${eventDate}\n` : '') +
    `• *Convidados:* ${guests} pessoas (${tierTitle})\n` +
    `• *Acabamento:* ${styleDisplay}\n` +
    `• *Sabor:* ${matchedFlavorObj.shortName}\n` +
    `• *Acabamentos Extras:* ${
      activeAddonsList.length > 0 ? activeAddonsList.join(', ') : 'Padrão do Ateliê'
    }\n` +
    `• *Logística:* ${currentNeighborhood.name} (${
      logisticsFee === 0 ? 'Grátis' : `R$ ${logisticsFee.toFixed(2).replace('.', ',')}`
    })\n` +
    `• *Investimento Estimado:* R$ ${totalCakeEstimate.toFixed(2).replace('.', ',')}\n\n` +
    `Podemos alinhar os detalhes e agendar uma degustação na Pituba?`;

  const cakeWhatsAppUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    cakeWhatsAppMessage
  )}`;

  // Filtered Ready Menu Items
  const filteredMenuItems =
    menuCategory === 'todos'
      ? READY_MENU_CATALOG
      : READY_MENU_CATALOG.filter((item) => item.category === menuCategory);

  const totalCartItems = cart.reduce((sum, entry) => sum + entry.qty, 0);
  const cartSubtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.qty, 0);

  // Brunch Reservation Handler
  const handleBrunchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (brunchName.trim().length < 3) {
      setBrunchError('Por favor, informe seu nome completo para identificar a mesa.');
      return;
    }
    if (brunchPhone.trim().length < 8) {
      setBrunchError('Informe um telefone ou WhatsApp válido para confirmação.');
      return;
    }
    setBrunchError(null);
    const code = `JG-${Math.floor(1000 + Math.random() * 9000)}`;
    setBrunchConfirmedCode(code);
  };

  const brunchWhatsAppMessage =
    `Olá, equipe Jeanne Garcia! Solicitei reserva de mesa para o Brunch na Pituba (Protocolo ${
      brunchConfirmedCode || 'WEB'
    }):\n\n` +
    `• *Nome:* ${brunchName}\n` +
    `• *Contato:* ${brunchPhone}\n` +
    `• *Turno:* ${brunchShift}\n` +
    `• *Mesa para:* ${brunchGuests}\n` +
    `• *Ambiente:* ${brunchArea}\n` +
    (brunchNotes ? `• *Observação:* ${brunchNotes}\n` : '') +
    `\nAguardo confirmação da mesa na Rua Ramalho Ortigão, 30!`;

  return (
    <section
      id="configurador"
      className="py-20 sm:py-24 bg-[#FBF8F3] border-b border-[#141413]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#7A1C1C] font-semibold tracking-wide">
            <span>Ferramenta Exclusiva de Atendimento</span>
            <span aria-hidden="true">·</span>
            <span>Orçamento ao Vivo</span>
            <span aria-hidden="true">·</span>
            <span>Sem Espera no WhatsApp</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#141413]">
            Configurador Interativo Jeanne Garcia
          </h2>
          <p className="text-sm sm:text-base text-[#3E3D38] leading-relaxed">
            Escolha uma das 3 modalidades abaixo: simule o orçamento do seu bolo decorado com cálculo de entrega por bairro, peça delícias da vitrine sem taxas de aplicativo ou reserve sua mesa para o Brunch de fim de semana.
          </p>

          {/* 3-Tab Segmented Switcher */}
          <div className="pt-4 flex justify-center">
            <div
              role="tablist"
              aria-label="Modalidades de Atendimento Jeanne Garcia"
              className="inline-flex p-1.5 bg-[#F3EFE6] rounded-2xl border border-[#C5A059]/40 overflow-x-auto max-w-full no-scrollbar gap-1.5"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'cake'}
                onClick={() => onTabChange('cake')}
                className={`min-h-[48px] px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'cake'
                    ? 'bg-[#7A1C1C] text-white shadow-sm'
                    : 'text-[#141413] hover:bg-[#EDE7DA]'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>1. Orçar Bolo Decorado</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'delivery'}
                onClick={() => onTabChange('delivery')}
                className={`min-h-[48px] px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-[#7A1C1C] text-white shadow-sm'
                    : 'text-[#141413] hover:bg-[#EDE7DA]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>2. Pronta-Entrega (Sem Taxa App)</span>
                {totalCartItems > 0 && (
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/20 tabular-nums">
                    {totalCartItems}
                  </span>
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'brunch'}
                onClick={() => onTabChange('brunch')}
                className={`min-h-[48px] px-5 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                  activeTab === 'brunch'
                    ? 'bg-[#7A1C1C] text-white shadow-sm'
                    : 'text-[#141413] hover:bg-[#EDE7DA]'
                }`}
              >
                <Coffee className="w-4 h-4" />
                <span>3. Reserva de Mesa Brunch</span>
              </button>
            </div>
          </div>
        </div>

        {/* =====================================================================
            ABA 1: MONTAR ORÇAMENTO DE BOLO DECORADO (10 A 200 CONVIDADOS)
            ===================================================================== */}
        {activeTab === 'cake' && (
          <div className="bg-[#F3EFE6] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#C5A059]/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {/* Left Column: Interactive Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* Step 1: Occasion & Optional Date */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-7">
                    <label
                      htmlFor="cakeOccasionSelect"
                      className="block text-xs font-semibold text-[#141413] mb-2"
                    >
                      01. Qual é a ocasião da celebração?
                    </label>
                    <select
                      id="cakeOccasionSelect"
                      value={occasion}
                      onChange={(e) => onOccasionChange(e.target.value)}
                      className="w-full min-h-[48px] bg-[#FBF8F3] border border-[#C5A059]/50 rounded-xl px-4 py-2.5 text-sm text-[#141413] font-medium focus:outline-none focus:border-[#7A1C1C]"
                    >
                      <option value="Casamento / Mini Wedding">Casamento / Mini Wedding</option>
                      <option value="Aniversário Adulto Elegante">Aniversário Adulto / Comemoração</option>
                      <option value="Festa de 15 Anos">Festa de 15 Anos</option>
                      <option value="Batizado / Noivado / Bodas">Batizado / Noivado / Bodas</option>
                      <option value="Evento Corporativo na Pituba">Evento Corporativo</option>
                    </select>
                  </div>

                  <div className="sm:col-span-5">
                    <label
                      htmlFor="cakeEventDate"
                      className="block text-xs font-semibold text-[#141413] mb-2"
                    >
                      Data do Evento (Opcional)
                    </label>
                    <input
                      id="cakeEventDate"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full min-h-[48px] bg-[#FBF8F3] border border-[#C5A059]/50 rounded-xl px-4 py-2.5 text-sm text-[#141413] font-mono focus:outline-none focus:border-[#7A1C1C]"
                    />
                  </div>
                </div>

                {/* Step 2: Guest Slider (10 to 200) */}
                <div className="bg-[#FBF8F3] p-5 rounded-2xl border border-[#C5A059]/30">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <label
                      htmlFor="cakeGuestsRange"
                      className="text-xs font-semibold text-[#141413]"
                    >
                      02. Número de Convidados (10 a 200 fatias)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-lg font-bold text-[#7A1C1C] tabular-nums">
                        {guests} convidados
                      </span>
                      <span className="text-xs text-[#7D7A71]">
                        ({guests <= 25 ? '1 andar' : guests <= 65 ? '2 andares' : guests <= 120 ? '3 andares' : '4 andares'})
                      </span>
                    </div>
                  </div>

                  <input
                    id="cakeGuestsRange"
                    type="range"
                    min={10}
                    max={200}
                    step={5}
                    value={guests}
                    onChange={(e) => onGuestsChange( parseInt(e.target.value, 10) )}
                    className="w-full patisserie-slider"
                  />

                  {/* Quick Guest Preset Buttons */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-[#141413]/5">
                    <span className="text-xs text-[#7D7A71]">Atalhos rápidos:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {[15, 30, 50, 80, 120, 180].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => onGuestsChange(preset)}
                          className={`px-3 py-1 rounded-lg font-mono text-xs transition-colors cursor-pointer tabular-nums ${
                            guests === preset
                              ? 'bg-[#141413] text-[#FBF8F3] font-semibold'
                              : 'bg-[#F3EFE6] text-[#3E3D38] hover:bg-[#EDE7DA]'
                          }`}
                        >
                          {preset}p
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step 3: Artistic Style (Buttercream vs Naked) */}
                <div>
                  <span className="block text-xs font-semibold text-[#141413] mb-2">
                    03. Estilo de Acabamento Artístico
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => onCakeStyleChange('buttercream')}
                      className={`min-h-[64px] p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        cakeStyle === 'buttercream'
                          ? 'border-2 border-[#7A1C1C] bg-[#FBF8F3]'
                          : 'border-[#C5A059]/40 bg-[#FBF8F3]/60 hover:bg-[#FBF8F3]'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold text-[#141413] block">
                          Buttercream Seda Estável
                        </span>
                        <span className="text-xs text-[#7D7A71]">
                          Liso contemporâneo ou espatulado artístico resistente ao calor
                        </span>
                      </div>
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          cakeStyle === 'buttercream' ? 'text-[#7A1C1C]' : 'text-[#C5A059]/50'
                        }`}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => onCakeStyleChange('seminaked')}
                      className={`min-h-[64px] p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        cakeStyle === 'seminaked'
                          ? 'border-2 border-[#7A1C1C] bg-[#FBF8F3]'
                          : 'border-[#C5A059]/40 bg-[#FBF8F3]/60 hover:bg-[#FBF8F3]'
                      }`}
                    >
                      <div>
                        <span className="text-sm font-semibold text-[#141413] block">
                          Naked / Semi-Naked Cake
                        </span>
                        <span className="text-xs text-[#7D7A71]">
                          Camadas aparentes rústicas com frutas frescas e flores
                        </span>
                      </div>
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${
                          cakeStyle === 'seminaked' ? 'text-[#7A1C1C]' : 'text-[#C5A059]/50'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Step 4: Flavor Selection + Optional Addons */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                  <div className="sm:col-span-7">
                    <label
                      htmlFor="cakeFlavorSelect"
                      className="block text-xs font-semibold text-[#141413] mb-2"
                    >
                      04. Sabor da Massa & Recheio Autoral
                    </label>
                    <select
                      id="cakeFlavorSelect"
                      value={selectedFlavor}
                      onChange={(e) => onFlavorChange(e.target.value)}
                      className="w-full min-h-[48px] bg-[#FBF8F3] border border-[#C5A059]/50 rounded-xl px-4 py-2.5 text-sm text-[#141413] font-medium focus:outline-none focus:border-[#7A1C1C]"
                    >
                      {SIGNATURE_FLAVORS.map((flav) => (
                        <option key={flav.id} value={flav.name}>
                          {flav.shortName}{' '}
                          {flav.priceSupplementPerSlice > 0
                            ? `(+R$ ${flav.priceSupplementPerSlice.toFixed(2).replace('.', ',')}/fatia)`
                            : '(Incluso)'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Step 5: Salvador Neighborhood Logistics */}
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="cakeNeighborhoodSelect"
                      className="block text-xs font-semibold text-[#141413] mb-2"
                    >
                      05. Retirada ou Entrega por Bairro
                    </label>
                    <select
                      id="cakeNeighborhoodSelect"
                      value={selectedNeighborhoodId}
                      onChange={(e) => onNeighborhoodChange(e.target.value)}
                      className="w-full min-h-[48px] bg-[#FBF8F3] border border-[#C5A059]/50 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-[#141413] font-medium focus:outline-none focus:border-[#7A1C1C]"
                    >
                      {SALVADOR_NEIGHBORHOODS.map((nb) => (
                        <option key={nb.id} value={nb.id}>
                          {nb.name.split('(')[0].trim()} —{' '}
                          {nb.refrigeratedCakeFee === 0
                            ? 'Retirada Grátis'
                            : `R$ ${nb.refrigeratedCakeFee.toFixed(2).replace('.', ',')}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Finishing Touches Checkboxes */}
                <div className="bg-[#FBF8F3] p-4 rounded-2xl border border-[#C5A059]/30">
                  <span className="block text-xs font-semibold text-[#141413] mb-3">
                    Toques Finais de Alta Confeitaria (Opcionais):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAddonFlowers(!addonFlowers)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        addonFlowers
                          ? 'border-[#7A1C1C] bg-[#7A1C1C]/5 text-[#141413] font-semibold'
                          : 'border-[#141413]/15 text-[#3E3D38]'
                      }`}
                    >
                      <span>Flores Orgânicas (+R$ 65)</span>
                      {addonFlowers && <Check className="w-4 h-4 text-[#7A1C1C] shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddonGoldLeaf(!addonGoldLeaf)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        addonGoldLeaf
                          ? 'border-[#7A1C1C] bg-[#7A1C1C]/5 text-[#141413] font-semibold'
                          : 'border-[#141413]/15 text-[#3E3D38]'
                      }`}
                    >
                      <span>Folha de Ouro (+R$ 45)</span>
                      {addonGoldLeaf && <Check className="w-4 h-4 text-[#7A1C1C] shrink-0" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAddonTopper(!addonTopper)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        addonTopper
                          ? 'border-[#7A1C1C] bg-[#7A1C1C]/5 text-[#141413] font-semibold'
                          : 'border-[#141413]/15 text-[#3E3D38]'
                      }`}
                    >
                      <span>Topo Acrílico (+R$ 55)</span>
                      {addonTopper && <Check className="w-4 h-4 text-[#7A1C1C] shrink-0" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Architectural Quote Summary Card */}
              <div className="lg:col-span-5 bg-[#141413] text-[#FBF8F3] rounded-3xl p-6 sm:p-8 border border-[#C5A059] flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="border-b border-[#C5A059]/25 pb-4">
                    <div className="flex items-center justify-between text-xs text-[#C5A059] mb-1">
                      <span>Proposta Personalizada ao Vivo</span>
                      <span className="font-mono tabular-nums">{guests} Fatias</span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FBF8F3]">
                      {tierTitle}
                    </h3>
                    <p className="text-xs text-[#FBF8F3]/70 mt-1">{tierSubtitle}</p>
                  </div>

                  {/* Line-item breakdown */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Ocasião:</span>
                      <span className="font-medium text-[#FBF8F3] text-right">{occasion}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Sabor Autoral:</span>
                      <span className="font-medium text-[#E5D3B3] text-right">
                        {matchedFlavorObj.shortName}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Acabamento:</span>
                      <span className="font-medium text-[#FBF8F3] text-right">{styleDisplay}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Valor Base ({guests} fatias):</span>
                      <span className="font-mono font-medium text-[#FBF8F3] tabular-nums">
                        R$ {cakeSubtotal.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Toques Artísticos:</span>
                      <span className="font-mono font-medium text-[#FBF8F3] tabular-nums">
                        {addonsTotal === 0
                          ? 'Incluso'
                          : `+ R$ ${addonsTotal.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/10">
                      <span className="text-[#FBF8F3]/70">Transporte / Retirada:</span>
                      <span className="font-mono font-medium text-[#C5A059] tabular-nums">
                        {logisticsFee === 0
                          ? 'Retirada Grátis (Pituba)'
                          : `+ R$ ${logisticsFee.toFixed(2).replace('.', ',')}`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Total Estimate Highlight */}
                  <div className="bg-white/5 rounded-2xl p-4 border border-[#C5A059]/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-[#E5D3B3] block">Investimento Estimado</span>
                      <span className="text-[11px] text-[#FBF8F3]/60">
                        Embalagem rígida e estruturação inclusas
                      </span>
                    </div>
                    <div className="font-serif text-3xl sm:text-4xl font-bold text-[#C5A059] tabular-nums">
                      R$ {totalCakeEstimate.toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  <a
                    href={cakeWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[52px] bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors px-6"
                  >
                    <MessageCircle className="w-4 h-4 text-[#E5D3B3] shrink-0" />
                    <span>Reservar Data / Enviar Orçamento no WhatsApp</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </a>

                  <p className="text-[11px] text-center text-[#FBF8F3]/65 leading-relaxed">
                    Todos os parâmetros selecionados acima são enviados prontos para o WhatsApp oficial da loja na Pituba.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            ABA 2: CARDÁPIO DE PRONTA-ENTREGA (SEM TAXA DE APLICATIVO)
            ===================================================================== */}
        {activeTab === 'delivery' && (
          <div className="space-y-8">
            {/* Top Logistics & Filter Bar */}
            <div className="bg-[#F3EFE6] rounded-2xl p-5 border border-[#C5A059]/40 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Filter Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
                {[
                  { id: 'todos', label: 'Todos os Itens (8)' },
                  { id: 'fatias', label: 'Fatias de Bolo' },
                  { id: 'patisserie', label: 'Choux & Macarons' },
                  { id: 'salgados', label: 'Croissants & Toasts' },
                  { id: 'cafes', label: 'Cafés Especiais' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setMenuCategory(cat.id)}
                    className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      menuCategory === cat.id
                        ? 'bg-[#141413] text-[#FBF8F3]'
                        : 'bg-[#FBF8F3] text-[#3E3D38] hover:text-[#141413]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Neighborhood Delivery Fee Selector for Ready Menu */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex items-center gap-2 bg-[#FBF8F3] px-3.5 py-2 rounded-xl border border-[#C5A059]/40">
                  <Truck className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                  <select
                    aria-label="Selecionar bairro para pronta-entrega"
                    value={selectedNeighborhoodId}
                    onChange={(e) => onNeighborhoodChange(e.target.value)}
                    className="bg-transparent text-xs font-medium text-[#141413] focus:outline-none"
                  >
                    {SALVADOR_NEIGHBORHOODS.map((nb) => (
                      <option key={nb.id} value={nb.id}>
                        {nb.name.split('(')[0].trim()} —{' '}
                        {nb.deliveryFeeReadyMenu === 0
                          ? 'Retirada Grátis'
                          : `Frete R$ ${nb.deliveryFeeReadyMenu.toFixed(2).replace('.', ',')}`}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={onOpenCartDrawer}
                  className="min-h-[42px] px-4 py-2 bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#E5D3B3]" />
                  <span>Ver Comanda ({totalCartItems})</span>
                  <span className="font-mono tabular-nums">
                    R$ {cartSubtotal.toFixed(2).replace('.', ',')}
                  </span>
                </button>
              </div>
            </div>

            {/* 3-Column Product Grid (Uniform Card Structure) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredMenuItems.map((product) => {
                const inCart = cart.find((c) => c.item.id === product.id);
                const qty = inCart ? inCart.qty : 0;

                return (
                  <div
                    key={product.id}
                    className="bg-[#F3EFE6] rounded-2xl overflow-hidden border border-[#C5A059]/35 flex flex-col justify-between transition-transform duration-150 hover:-translate-y-0.5"
                  >
                    <div>
                      {/* Visual Art / Product Presentation Header */}
                      <div
                        className={`h-44 bg-gradient-to-br ${product.visualTheme.bgGradient} relative p-5 flex flex-col justify-between`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-medium text-white/90 bg-black/25 backdrop-blur-xs px-2.5 py-1 rounded-md self-start">
                          <span>{product.highlightNote}</span>
                        </div>

                        {/* Stylized Culinary Vector Emblem */}
                        <div className="my-auto flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-xs border border-white/30 flex items-center justify-center">
                            <Sparkles
                              className="w-7 h-7"
                              style={{ color: product.visualTheme.accentColor }}
                            />
                          </div>
                        </div>

                        <div className="text-[11px] text-white/90 font-mono bg-black/25 px-2.5 py-0.5 rounded self-end">
                          {product.weightOrPortion}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5">
                        <div className="text-xs text-[#7D7A71] mb-1">
                          {product.categoryLabel}
                        </div>
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-serif text-xl font-bold text-[#141413] leading-snug">
                            {product.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#3E3D38] mt-2 leading-relaxed line-clamp-3">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer: Price + Stepper / Add Button */}
                    <div className="px-5 pb-5 pt-3 border-t border-[#141413]/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[11px] text-[#7D7A71] block">Valor Direto</span>
                        <span className="font-mono text-base font-bold text-[#7A1C1C] tabular-nums">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                      </div>

                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddToCart(product)}
                          className="min-h-[42px] px-4 py-2 rounded-xl bg-[#141413] hover:bg-[#7A1C1C] text-[#FBF8F3] text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#FBF8F3] border border-[#7A1C1C] rounded-xl px-2 py-1 min-h-[42px]">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQty(product.id, -1)}
                            aria-label={`Diminuir quantidade de ${product.name}`}
                            className="w-7 h-7 rounded-lg hover:bg-[#F3EFE6] flex items-center justify-center text-[#141413] cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono text-xs font-bold text-[#141413] px-1 tabular-nums">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateCartQty(product.id, 1)}
                            aria-label={`Aumentar quantidade de ${product.name}`}
                            className="w-7 h-7 rounded-lg bg-[#7A1C1C] text-white flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            ABA 3: RESERVA DE MESA PARA O BRUNCH DE SÁBADO E DOMINGO
            ===================================================================== */}
        {activeTab === 'brunch' && (
          <div className="max-w-4xl mx-auto bg-[#F3EFE6] rounded-3xl p-6 sm:p-10 border border-[#C5A059]/40">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Info Column */}
              <div className="md:col-span-5 space-y-4">
                <div className="text-xs font-semibold text-[#4A5238]">
                  Sábados e Domingos · Pituba
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413]">
                  Brunch Parisiense na Rua Ramalho Ortigão, 30
                </h3>
                <p className="text-xs sm:text-sm text-[#3E3D38] leading-relaxed">
                  Garanta sua mesa sem filas para desfrutar de Croissants amanteigados recém-saídos do forno, Toast de Camarão no Brioche, Cafés Especiais e nossa vitrine completa de Choux Cream, Macarons e Fatias Autorais.
                </p>

                <div className="space-y-2.5 text-xs text-[#141413] pt-2 border-t border-[#141413]/10">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                    <span>
                      <strong>Sábado:</strong> Manhã (08h–12h) · Tarde (14h–19h)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                    <span>
                      <strong>Domingo:</strong> Manhã (08h–12h) · Tarde (14h–18h)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                    <span>{STORE_ADDRESS} (Vagas próprias na porta)</span>
                  </div>
                </div>
              </div>

              {/* Right Interactive Booking Form or Confirmation State */}
              <div className="md:col-span-7 bg-[#FBF8F3] p-6 sm:p-8 rounded-2xl border border-[#C5A059]/40">
                {brunchConfirmedCode ? (
                  <div className="space-y-5 text-center py-4">
                    <div className="w-12 h-12 rounded-full bg-[#4A5238] text-[#FBF8F3] flex items-center justify-center mx-auto">
                      <Check className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs text-[#4A5238] font-semibold">
                        PROTOCOLO DE PRÉ-RESERVA #{brunchConfirmedCode}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-[#141413] mt-1">
                        Solicitação de Mesa Pronta, {brunchName}!
                      </h4>
                      <p className="text-xs text-[#3E3D38] mt-1">
                        {brunchShift} · {brunchGuests} · {brunchArea}
                      </p>
                    </div>

                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        brunchWhatsAppMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[50px] bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-[#E5D3B3]" />
                      <span>Confirmar Reserva no WhatsApp da Loja</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setBrunchConfirmedCode(null)}
                      className="text-xs text-[#7D7A71] underline hover:text-[#141413] cursor-pointer"
                    >
                      Editar dados da reserva
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleBrunchSubmit} className="space-y-4" noValidate>
                    <h4 className="font-serif text-2xl font-bold text-[#141413]">
                      Reservar Minha Mesa gratuitamente
                    </h4>

                    {brunchError && (
                      <div className="p-3 rounded-xl bg-[#7A1C1C]/10 border border-[#7A1C1C] text-xs text-[#7A1C1C] font-medium">
                        {brunchError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="brunchNameInput"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Seu Nome Completo *
                        </label>
                        <input
                          id="brunchNameInput"
                          type="text"
                          required
                          value={brunchName}
                          onChange={(e) => setBrunchName(e.target.value)}
                          placeholder="Ex.: Carolina Magalhães"
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3.5 text-xs sm:text-sm text-[#141413] focus:outline-none focus:border-[#7A1C1C]"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="brunchPhoneInput"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Seu WhatsApp *
                        </label>
                        <input
                          id="brunchPhoneInput"
                          type="tel"
                          required
                          value={brunchPhone}
                          onChange={(e) => setBrunchPhone(e.target.value)}
                          placeholder="(71) 99999-9999"
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3.5 text-xs sm:text-sm text-[#141413] font-mono focus:outline-none focus:border-[#7A1C1C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="brunchShiftSelect"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Dia e Período Desejado
                        </label>
                        <select
                          id="brunchShiftSelect"
                          value={brunchShift}
                          onChange={(e) => setBrunchShift(e.target.value)}
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs sm:text-sm text-[#141413]"
                        >
                          <option value="Sábado · Turno Manhã (08h às 12h)">
                            Sábado · Manhã (08h às 12h)
                          </option>
                          <option value="Sábado · Turno Tarde (14h às 19h)">
                            Sábado · Tarde (14h às 19h)
                          </option>
                          <option value="Domingo · Turno Manhã (08h às 12h)">
                            Domingo · Manhã (08h às 12h)
                          </option>
                          <option value="Domingo · Turno Tarde (14h às 18h)">
                            Domingo · Tarde (14h às 18h)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="brunchGuestsSelect"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Quantidade de Lugares
                        </label>
                        <select
                          id="brunchGuestsSelect"
                          value={brunchGuests}
                          onChange={(e) => setBrunchGuests(e.target.value)}
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs sm:text-sm text-[#141413]"
                        >
                          <option value="2 Pessoas">Mesa para 2 Pessoas</option>
                          <option value="3 a 4 Pessoas">Mesa para 3 a 4 Pessoas</option>
                          <option value="5 a 6 Pessoas">Mesa para 5 a 6 Pessoas</option>
                          <option value="Grupo / Aniversário (7 a 12 Pessoas)">
                            Grupo / Aniversário (7 a 12p)
                          </option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="brunchAreaSelect"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Preferência de Ambiente
                        </label>
                        <select
                          id="brunchAreaSelect"
                          value={brunchArea}
                          onChange={(e) => setBrunchArea(e.target.value)}
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs sm:text-sm text-[#141413]"
                        >
                          <option value="Salão Interno Climatizado">
                            Salão Interno Climatizado
                          </option>
                          <option value="Área Pet-Friendly (Trarei meu Pet)">
                            Área Pet-Friendly (Trarei meu Pet)
                          </option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="brunchNotesInput"
                          className="block text-xs font-semibold text-[#141413] mb-1"
                        >
                          Ocasião ou Pedido Especial
                        </label>
                        <input
                          id="brunchNotesInput"
                          type="text"
                          value={brunchNotes}
                          onChange={(e) => setBrunchNotes(e.target.value)}
                          placeholder="Ex.: Aniversário, cadeira infantil..."
                          className="w-full min-h-[46px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3.5 text-xs sm:text-sm text-[#141413] focus:outline-none focus:border-[#7A1C1C]"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full min-h-[50px] bg-[#4A5238] hover:bg-[#363C28] text-[#FBF8F3] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <CalendarCheck className="w-4 h-4 text-[#E5D3B3]" />
                      <span>Gerar Reserva de Mesa para o Brunch</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
