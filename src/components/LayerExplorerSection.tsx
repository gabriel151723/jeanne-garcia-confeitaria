import React, { useState } from 'react';
import { ArrowRight, Check, Coffee, Sparkles } from 'lucide-react';
import { SIGNATURE_FLAVORS, SignatureFlavor } from '../data/patisserieData';
import { CakeCrossSectionDiagram } from './PatisserieArtwork';

interface LayerExplorerSectionProps {
  onSelectFlavorForQuote: (flavorName: string, style: 'buttercream' | 'seminaked') => void;
}

export const LayerExplorerSection: React.FC<LayerExplorerSectionProps> = ({
  onSelectFlavorForQuote,
}) => {
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>(SIGNATURE_FLAVORS[0].id);
  const [activeLayerOrder, setActiveLayerOrder] = useState<number>(1);
  const [previewStyle, setPreviewStyle] = useState<'buttercream' | 'seminaked'>('buttercream');

  const currentFlavor: SignatureFlavor =
    SIGNATURE_FLAVORS.find((f) => f.id === selectedFlavorId) || SIGNATURE_FLAVORS[0];

  const activeLayer =
    currentFlavor.layers.find((l) => l.order === activeLayerOrder) || currentFlavor.layers[0];

  const handleFlavorChange = (flavor: SignatureFlavor) => {
    setSelectedFlavorId(flavor.id);
    setPreviewStyle(flavor.recommendedStyle);
    setActiveLayerOrder(2); // highlight filling layer by default on change
  };

  return (
    <div id="camadas-sabores" className="pt-16 border-t border-[#141413]/10">
      {/* Section Header */}
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 text-xs text-[#7A1C1C] font-semibold tracking-wide mb-2">
          <span>Anatomia da Alta Pâtisserie</span>
          <span aria-hidden="true">·</span>
          <span>5 Receitas Autorais</span>
          <span aria-hidden="true">·</span>
          <span>Zero Misturas Industriais</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#141413]">
          Explorador Visual de Camadas e Recheios
        </h3>
        <p className="text-sm sm:text-base text-[#3E3D38] mt-2 leading-relaxed">
          Para noivas e anfitriões que desejam segurança absoluta antes da degustação: selecione um sabor abaixo para explorar o corte transversal da fatia, o perfil de dulçor e a estrutura de cada camada.
        </p>
      </div>

      {/* Interactive Flavor Selector Bar (Functional segmented buttons) */}
      <div
        role="tablist"
        aria-label="Sabores Autorais Jeanne Garcia"
        className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-3 mb-8"
      >
        {SIGNATURE_FLAVORS.map((flavor) => {
          const isActive = flavor.id === currentFlavor.id;
          return (
            <button
              key={flavor.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => handleFlavorChange(flavor)}
              className={`min-h-[48px] px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                isActive
                  ? 'bg-[#141413] text-[#FBF8F3] border-[#C5A059] shadow-sm'
                  : 'bg-[#F3EFE6] text-[#3E3D38] border-[#C5A059]/30 hover:border-[#7A1C1C]/50 hover:text-[#141413]'
              }`}
            >
              {flavor.shortName}
            </button>
          );
        })}
      </div>

      {/* Main 2-Column Anatomy Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[#F3EFE6] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#C5A059]/40">
        {/* Left Column: Interactive Cross-Section Slice Diagram */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {/* Style Switcher inside Explorer */}
          <div className="flex items-center justify-between bg-[#FBF8F3] p-2 rounded-xl border border-[#C5A059]/30">
            <span className="text-xs font-medium text-[#3E3D38] pl-2">
              Revestimento Externo:
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPreviewStyle('buttercream')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  previewStyle === 'buttercream'
                    ? 'bg-[#7A1C1C] text-white'
                    : 'text-[#3E3D38] hover:text-[#141413]'
                }`}
              >
                Buttercream Seda
              </button>
              <button
                type="button"
                onClick={() => setPreviewStyle('seminaked')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  previewStyle === 'seminaked'
                    ? 'bg-[#7A1C1C] text-white'
                    : 'text-[#3E3D38] hover:text-[#141413]'
                }`}
              >
                Semi-Naked
              </button>
            </div>
          </div>

          <CakeCrossSectionDiagram
            layers={currentFlavor.layers}
            activeLayerOrder={activeLayerOrder}
            onSelectLayer={(order) => setActiveLayerOrder(order)}
            styleType={previewStyle}
            flavorShortName={currentFlavor.shortName}
          />
        </div>

        {/* Right Column: Layer Inspection & Sensory Profile */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#FBF8F3] rounded-2xl p-6 sm:p-8 border border-[#C5A059]/30 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#141413]/10 pb-4">
              <div>
                <p className="text-xs text-[#7D7A71]">{currentFlavor.subtitle}</p>
                <h4 className="font-serif text-2xl sm:text-3xl font-semibold text-[#141413] mt-0.5">
                  {currentFlavor.shortName}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-[#7D7A71] block">A partir de (15 fatias)</span>
                <span className="font-serif text-2xl font-bold text-[#7A1C1C] tabular-nums">
                  R$ {currentFlavor.startingPrice15Slices.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#3E3D38] leading-relaxed">
              {currentFlavor.description}
            </p>

            {/* Active Inspected Layer Detail Box */}
            <div className="bg-[#F3EFE6] rounded-xl p-4 border border-[#C5A059]/40">
              <div className="flex items-center justify-between text-xs text-[#7A1C1C] font-semibold mb-1">
                <span>Camada Selecionada · 0{activeLayer.order} de 05</span>
                <span>Inspeção Técnica</span>
              </div>
              <p className="font-serif text-lg font-bold text-[#141413]">
                {activeLayer.name}
              </p>
              <p className="text-xs sm:text-sm text-[#3E3D38] mt-1 leading-relaxed">
                {activeLayer.composition}
              </p>
            </div>

            {/* Sensory Profile Meters */}
            <div className="pt-2 space-y-3">
              <p className="text-xs font-semibold text-[#141413]">
                Perfil Sensorial Equilibrado (Escala Pâtisserie 1 a 5)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: 'Dulçor Equilibrado', val: currentFlavor.sensoryProfile.dulcor },
                  { label: 'Frescor & Acidez', val: currentFlavor.sensoryProfile.acidez },
                  { label: 'Textura Crocante', val: currentFlavor.sensoryProfile.crocancia },
                  { label: 'Intensidade no Paladar', val: currentFlavor.sensoryProfile.intensidade },
                ].map((metric) => (
                  <div key={metric.label} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#3E3D38]">
                      <span>{metric.label}</span>
                      <span className="font-mono font-semibold tabular-nums">
                        {metric.val}/5
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#EDE7DA] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#C5A059] rounded-full transition-all duration-200"
                        style={{ width: `${(metric.val / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Harmonization Note */}
            <div className="flex items-center gap-2.5 text-xs text-[#4A5238] pt-1">
              <Coffee className="w-4 h-4 shrink-0" />
              <span>
                <strong>Harmonização sugerida pela Chef:</strong> {currentFlavor.harmonization}
              </span>
            </div>
          </div>

          {/* Direct Action to Load Flavor into Simulator */}
          <div className="pt-4 border-t border-[#141413]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="text-xs text-[#7D7A71]">
              <span className="flex items-center gap-1.5 text-[#141413] font-medium">
                <Check className="w-4 h-4 text-[#4A5238]" />
                Disponível para degustação na Pituba
              </span>
            </div>
            <button
              type="button"
              onClick={() => onSelectFlavorForQuote(currentFlavor.name, previewStyle)}
              className="min-h-[48px] px-6 py-3 bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#E5D3B3]" />
              <span>Simular Bolo com {currentFlavor.shortName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
