import React, { useState } from 'react';
import { Minus, Plus, Send, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import {
  SALVADOR_NEIGHBORHOODS,
  STORE_ADDRESS,
  WHATSAPP_NUMBER,
} from '../data/patisserieData';
import { CartItem } from './InteractiveConfigurator';

interface CartDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (itemId: number, delta: number) => void;
  onClearCart: () => void;
  selectedNeighborhoodId: string;
  onNeighborhoodChange: (id: string) => void;
  onGoToMenu: () => void;
}

export const CartDrawerModal: React.FC<CartDrawerModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClearCart,
  selectedNeighborhoodId,
  onNeighborhoodChange,
  onGoToMenu,
}) => {
  const [clientName, setClientName] = useState<string>('');
  const [addressDetail, setAddressDetail] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('Pix (Chave enviada no WhatsApp)');

  if (!isOpen) return null;

  const neighborhood =
    SALVADOR_NEIGHBORHOODS.find((n) => n.id === selectedNeighborhoodId) ||
    SALVADOR_NEIGHBORHOODS[0];

  const isPickup = neighborhood.id === 'retirada-pituba';
  const itemsSubtotal = cart.reduce((acc, c) => acc + c.item.price * c.qty, 0);
  const deliveryFee = cart.length > 0 ? neighborhood.deliveryFeeReadyMenu : 0;
  const grandTotal = itemsSubtotal + deliveryFee;

  let whatsAppOrderMessage = `Olá, Jeanne Garcia! Gostaria de fazer um pedido de pronta-entrega (Direto sem taxa de app):\n\n`;
  cart.forEach((c) => {
    whatsAppOrderMessage += `• ${c.qty}x ${c.item.name} — R$ ${(c.item.price * c.qty)
      .toFixed(2)
      .replace('.', ',')}\n`;
  });
  whatsAppOrderMessage += `\n• *Subtotal Itens:* R$ ${itemsSubtotal.toFixed(2).replace('.', ',')}\n`;
  whatsAppOrderMessage += `• *Modalidade:* ${neighborhood.name} (${
    deliveryFee === 0 ? 'Grátis' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`
  })\n`;
  if (!isPickup && addressDetail.trim()) {
    whatsAppOrderMessage += `• *Endereço de Entrega:* ${addressDetail.trim()}\n`;
  }
  if (clientName.trim()) {
    whatsAppOrderMessage += `• *Cliente:* ${clientName.trim()}\n`;
  }
  whatsAppOrderMessage += `• *Forma de Pagamento:* ${paymentMethod}\n`;
  whatsAppOrderMessage += `• *Total Final:* R$ ${grandTotal.toFixed(2).replace('.', ',')}\n\n`;
  whatsAppOrderMessage += `Podem confirmar o preparo na Rua Ramalho Ortigão, 30?`;

  const checkoutUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsAppOrderMessage
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141413]/60 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Comanda de Pronta-Entrega Jeanne Garcia"
    >
      <div className="w-full max-w-md bg-[#FBF8F3] h-full p-6 sm:p-7 flex flex-col justify-between border-l border-[#C5A059]/40 shadow-2xl overflow-y-auto">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#141413]/10">
            <div>
              <span className="text-xs text-[#7A1C1C] font-semibold block">
                Pedido Direto · Zero Taxas de App
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#141413]">
                Comanda de Pronta-Entrega
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar sacola"
              className="p-2 rounded-lg text-[#7D7A71] hover:text-[#141413] hover:bg-[#F3EFE6] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] text-[#7D7A71] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-xl font-semibold text-[#141413]">
                  Sua comanda está vazia
                </p>
                <p className="text-xs text-[#7D7A71] max-w-xs mx-auto">
                  Explore nossas fatias de Devil&apos;s Food Cake, Choux Cream, Macarons e Croissants na Aba 2 do Configurador.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToMenu();
                }}
                className="min-h-[44px] px-5 py-2.5 bg-[#141413] text-[#FBF8F3] rounded-xl text-xs font-semibold cursor-pointer"
              >
                Explorar Cardápio do Dia
              </button>
            </div>
          ) : (
            <div className="py-5 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#7D7A71]">
                <span>Itens selecionados ({cart.reduce((s, i) => s + i.qty, 0)})</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="inline-flex items-center gap-1 text-[#7A1C1C] hover:underline cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Limpar sacola</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {cart.map(({ item, qty }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 bg-[#F3EFE6] p-3.5 rounded-xl border border-[#C5A059]/30"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#141413] truncate">
                        {item.name}
                      </p>
                      <p className="font-mono text-xs text-[#7A1C1C] font-semibold tabular-nums">
                        R$ {(item.price * qty).toFixed(2).replace('.', ',')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 bg-[#FBF8F3] px-2 py-1 rounded-lg border border-[#C5A059]/40 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#141413] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-[#141413] tabular-nums">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs font-bold text-[#7A1C1C] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Logistics & Customer Info inside Drawer */}
              <div className="pt-4 border-t border-[#141413]/10 space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#141413] mb-1">
                    Retirada na Pituba ou Entrega por Bairro
                  </label>
                  <div className="flex items-center gap-2 bg-[#F3EFE6] px-3 py-2.5 rounded-xl border border-[#C5A059]/40">
                    <Truck className="w-4 h-4 text-[#7A1C1C] shrink-0" />
                    <select
                      value={selectedNeighborhoodId}
                      onChange={(e) => onNeighborhoodChange(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium text-[#141413] focus:outline-none"
                    >
                      {SALVADOR_NEIGHBORHOODS.map((nb) => (
                        <option key={nb.id} value={nb.id}>
                          {nb.name.split('(')[0].trim()} —{' '}
                          {nb.deliveryFeeReadyMenu === 0
                            ? 'Retirada Grátis'
                            : `R$ ${nb.deliveryFeeReadyMenu.toFixed(2).replace('.', ',')}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-[11px] text-[#7D7A71] mt-1">
                    Tempo estimado: {neighborhood.estimatedMinutes} · {STORE_ADDRESS}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#141413] mb-1">
                    Seu Nome
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Como podemos chamar você?"
                    className="w-full min-h-[42px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs text-[#141413] focus:outline-none focus:border-[#7A1C1C]"
                  />
                </div>

                {!isPickup && (
                  <div>
                    <label className="block text-xs font-semibold text-[#141413] mb-1">
                      Rua, Número e Edifício para Entrega
                    </label>
                    <input
                      type="text"
                      value={addressDetail}
                      onChange={(e) => setAddressDetail(e.target.value)}
                      placeholder="Ex.: Rua Ceará, 120, Ed. Mansão..."
                      className="w-full min-h-[42px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs text-[#141413] focus:outline-none focus:border-[#7A1C1C]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-[#141413] mb-1">
                    Preferência de Pagamento
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full min-h-[42px] bg-[#F3EFE6] border border-[#C5A059]/40 rounded-xl px-3 text-xs text-[#141413]"
                  >
                    <option value="Pix (Chave enviada no WhatsApp)">
                      Pix (Chave enviada no WhatsApp)
                    </option>
                    <option value="Cartão de Crédito / Débito">
                      Cartão de Crédito / Débito
                    </option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Totals */}
        {cart.length > 0 && (
          <div className="pt-4 border-t border-[#141413]/10 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-[#3E3D38]">
                <span>Subtotal dos Itens:</span>
                <span className="font-mono tabular-nums">
                  R$ {itemsSubtotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
              <div className="flex justify-between text-[#3E3D38]">
                <span>Taxa de Entrega ({neighborhood.name.split(',')[0]}):</span>
                <span className="font-mono tabular-nums">
                  {deliveryFee === 0
                    ? 'Grátis (Retirada)'
                    : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-2 border-t border-[#141413]/10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#141413]">
                  Total do Pedido:
                </span>
                <span className="font-serif text-3xl font-bold text-[#7A1C1C] tabular-nums">
                  R$ {grandTotal.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] bg-[#7A1C1C] hover:bg-[#5E1414] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 text-[#E5D3B3]" />
              <span>Enviar Pedido no WhatsApp</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
