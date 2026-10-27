import React, { useState } from 'react';
import { CakeLayer } from '../data/patisserieData';

interface EditorialImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
  className?: string;
  variant?: 'cake-hero' | 'pistachio' | 'devils' | 'lemon' | 'wedding' | 'atelier';
}

export const EditorialImage: React.FC<EditorialImageProps> = ({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = '',
  variant = 'cake-hero',
}) => {
  const [hasError, setHasError] = useState(false);

  const paletteMap = {
    'cake-hero': 'from-[#F6EFE2] via-[#E8DAC2] to-[#D5BE97]',
    pistachio: 'from-[#E9EFE2] via-[#D4DFC5] to-[#B7C7A1]',
    devils: 'from-[#2D1B18] via-[#432924] to-[#1D1210]',
    lemon: 'from-[#F8F1D5] via-[#EFE0A8] to-[#DEC77B]',
    wedding: 'from-[#F9F6F0] via-[#EFE8DC] to-[#DFD3BF]',
    atelier: 'from-[#3B422C] via-[#4A5238] to-[#2B3020]',
  };

  const isDark = variant === 'devils' || variant === 'atelier';

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${paletteMap[variant]} flex flex-col items-center justify-center p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Architectural Pâtisserie Vector Emblem */}
        <svg
          viewBox="0 0 220 180"
          className="w-36 h-32 mb-3 opacity-90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Marble Pedestal Base */}
          <path
            d="M35 152H185M55 152L68 172H152L165 152"
            stroke={isDark ? '#E5D3B3' : '#141413'}
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Bottom Cake Tier */}
          <rect
            x="52"
            y="102"
            width="116"
            height="50"
            rx="6"
            fill={isDark ? '#3D2622' : '#FBF8F3'}
            stroke="#C5A059"
            strokeWidth="2"
          />
          {/* Top Cake Tier */}
          <rect
            x="72"
            y="58"
            width="76"
            height="44"
            rx="5"
            fill={isDark ? '#4F322C' : '#F3EFE6'}
            stroke="#C5A059"
            strokeWidth="2"
          />
          {/* Delicate Floral & Gold Leaf Accents */}
          <circle cx="95" cy="54" r="9" fill="#7A1C1C" />
          <circle cx="112" cy="48" r="11" fill="#C5A059" />
          <circle cx="127" cy="55" r="8" fill="#4A5238" />
          <path
            d="M62 125C82 118 138 132 158 122"
            stroke="#C5A059"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        </svg>
        <p
          className={`font-serif text-lg font-semibold leading-snug ${
            isDark ? 'text-[#FBF8F3]' : 'text-[#141413]'
          }`}
        >
          {fallbackTitle}
        </p>
        <p
          className={`text-xs mt-1 ${
            isDark ? 'text-[#E5D3B3]' : 'text-[#3E3D38]'
          }`}
        >
          {fallbackSubtitle}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

interface CakeCrossSectionDiagramProps {
  layers: CakeLayer[];
  activeLayerOrder: number | null;
  onSelectLayer: (order: number) => void;
  styleType: 'buttercream' | 'seminaked';
  flavorShortName: string;
}

export const CakeCrossSectionDiagram: React.FC<CakeCrossSectionDiagramProps> = ({
  layers,
  activeLayerOrder,
  onSelectLayer,
  styleType,
  flavorShortName,
}) => {
  return (
    <div className="relative bg-[#FBF8F3] border border-[#C5A059]/40 rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-between">
      {/* Header Header Label */}
      <div className="w-full flex items-center justify-between text-xs text-[#7D7A71] pb-4 mb-4 border-b border-[#141413]/10">
        <span>Corte Anatômico da Fatia</span>
        <span aria-hidden="true">·</span>
        <span className="font-medium text-[#141413]">{flavorShortName}</span>
        <span aria-hidden="true">·</span>
        <span>{styleType === 'buttercream' ? 'Buttercream Seda' : 'Semi-Naked'}</span>
      </div>

      {/* Interactive Architectural Cake Slice Stack */}
      <div className="relative w-full max-w-md my-2">
        {/* Top Botanical / Gold Leaf Crown Decoration */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <div className="w-4 h-4 rounded-full bg-[#7A1C1C]/90 border border-[#C5A059]" title="Frutas / Flores Orgânicas" />
          <div className="w-6 h-3 rounded-t-full bg-[#C5A059] transform -rotate-12" title="Folha de Ouro Comestível" />
          <div className="w-5 h-5 rounded-full bg-[#4A5238]/90 border border-[#C5A059]" title="Toque Botânico Fresco" />
        </div>

        {/* Outer Buttercream / Semi-Naked Coat Frame */}
        <div
          className={`p-3 rounded-t-2xl rounded-b-lg border-2 transition-all duration-200 ${
            styleType === 'buttercream'
              ? 'bg-[#F7F3E8] border-[#C5A059] shadow-sm'
              : 'bg-transparent border-dashed border-[#C5A059]/80'
          }`}
        >
          <div className="space-y-2">
            {layers.map((layer) => {
              const isSelected = activeLayerOrder === layer.order;
              return (
                <button
                  key={layer.order}
                  type="button"
                  onClick={() => onSelectLayer(layer.order)}
                  style={{
                    backgroundColor: layer.colorHex,
                    borderColor: isSelected ? '#7A1C1C' : layer.borderHex,
                    color: layer.textColor,
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-150 flex items-center justify-between gap-3 group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#7A1C1C] ${
                    isSelected
                      ? 'ring-2 ring-[#7A1C1C] scale-[1.01]'
                      : 'hover:opacity-95'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-black/15 shrink-0 tabular-nums"
                    >
                      0{layer.order}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold truncate">
                      {layer.name}
                    </span>
                  </div>
                  <span className="text-[11px] opacity-80 shrink-0 underline decoration-dotted">
                    {isSelected ? 'Selecionada' : 'Ver detalhe'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ceramic Pedestal Stand Base */}
        <div className="flex flex-col items-center">
          <div className="w-full h-3 bg-[#EDE7DA] border border-[#C5A059]/60 rounded-full mt-1" />
          <div className="w-28 h-5 bg-[#E5DEC9] border-x border-b border-[#C5A059]/50 rounded-b-lg" />
        </div>
      </div>

      <p className="text-xs text-[#7D7A71] text-center mt-4">
        Clique em qualquer uma das 5 camadas acima para inspecionar os ingredientes e a técnica.
      </p>
    </div>
  );
};
