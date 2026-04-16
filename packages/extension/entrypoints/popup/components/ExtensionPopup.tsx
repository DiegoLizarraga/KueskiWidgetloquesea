import { useState } from "react";
import {
  Zap, CreditCard, Info, ShieldCheck, Star, X, Store, ExternalLink, TrendingDown, Check, Tag, LayoutTemplate
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import '../style.css';

interface PaymentOption {
  provider: string;
  periods: number;
  amount: number;
  total: number;
  featured: boolean;
  recommended: boolean;
  interest: string | null;
  benefits: string[];
}

interface PriceComparison {
  store: string;
  price: number;
  link: string;
}

interface Coupon {
  code: string;
  discount: string;
  description: string;
}

export function ExtensionPopup({ onClose }: { onClose?: () => void }) {
  const kueskiOptions: PaymentOption[] = [
    { provider: 'Kueski Pay', periods: 4, amount: 62.50, total: 250.00, featured: true, recommended: true, interest: '0% interés', benefits: ['Aprobación inmediata', 'Sin tarjeta de crédito', '100% digital'] },
    { provider: 'Kueski Pay', periods: 6, amount: 41.67, total: 250.00, featured: true, recommended: false, interest: '0% interés', benefits: ['Aprobación inmediata', 'Sin tarjeta de crédito', '100% digital'] },
    { provider: 'Kueski Pay', periods: 8, amount: 31.25, total: 250.00, featured: true, recommended: false, interest: '0% interés', benefits: ['Aprobación inmediata', 'Sin tarjeta de crédito', '100% digital'] },
    { provider: 'Tarjeta de Crédito', periods: 1, amount: 250.00, total: 250.00, featured: false, recommended: false, interest: null, benefits: [] },
    { provider: 'PayPal', periods: 1, amount: 250.00, total: 250.00, featured: false, recommended: false, interest: null, benefits: [] },
  ];

  const priceComparisons: PriceComparison[] = [
    { store: 'Tienda Actual', price: 250.00, link: '#' },
    { store: 'Mercado Libre', price: 265.00, link: '#' },
    { store: 'Amazon', price: 270.00, link: '#' },
  ];

  const coupons: Coupon[] = [
    { code: 'KUESKI20', discount: '20% OFF', description: 'En tu primera compra' },
    { code: 'VERANO10', discount: '10% OFF', description: 'Válido todo el mes' },
  ];

  return (
    <div className="popup-container">
      {/* HEADER */}
      <div className="kueski-header">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-1.5 text-white font-bold text-lg tracking-wide">
            <Star className="h-5 w-5 fill-white" />
            <span>DealFinder</span>
          </div>
          <Button
            variant="ghost" size="icon" onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="kueski-header-card">
          <div className="flex items-center gap-1.5 mb-2 text-yellow-300 font-semibold text-sm">
            <Zap className="h-4 w-4 fill-yellow-300" />
            Mejor Opción de Pago
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-white leading-none mb-1">$62.50</span>
              <span className="text-[11px] text-white/90">por quincena</span>
            </div>

            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white leading-none mb-1">4</span>
              <span className="text-[11px] text-white/90">quincenas</span>
            </div>

            <div>
              <Badge className="bg-[#00E59B] text-gray-900 hover:bg-[#00E59B] font-bold border-none px-3 py-1 rounded-md">0% interés</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="pago" className="w-full flex-1 flex flex-col min-h-0">
        <TabsList className="tabs-container grid grid-cols-3">
          <TabsTrigger value="pago" className="tab-button gap-2"><LayoutTemplate className="h-4 w-4"/> Pago</TabsTrigger>
          <TabsTrigger value="precios" className="tab-button gap-2"><TrendingDown className="h-4 w-4"/> Precios</TabsTrigger>
          <TabsTrigger value="cupones" className="tab-button gap-2"><Tag className="h-4 w-4"/> Cupones</TabsTrigger>
        </TabsList>

        <div className="overflow-y-auto flex-1 bg-white p-4 styled-scrollbar">
          {/* CONTENIDO 1: PAGOS */}
          <TabsContent value="pago" className="flex flex-col gap-4 m-0 mt-0">
            {kueskiOptions.map((opt, i) => (
              <Card key={i} className={opt.featured ? "option-card-featured" : "option-card-default"}>
                {opt.featured ? (
                  <>
                    <div className="flex items-center flex-wrap gap-2 mb-1">
                      <span className="font-bold text-lg text-gray-900">{opt.provider}</span>
                      {opt.recommended && <Badge className="bg-[#a855f7] hover:bg-[#a855f7] text-white border-none gap-1 py-0.5"><Zap className="h-3 w-3 fill-white" /> Recomendado</Badge>}
                      {opt.interest && <Badge className="bg-[#00E59B] hover:bg-[#00E59B] text-gray-900 border-none font-bold ml-auto">{opt.interest}</Badge>}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">{opt.periods} quincenas</div>

                    <div className="bg-gray-50 rounded-xl p-4 mb-4 flex flex-col justify-center border border-gray-100">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-[#8b5cf6]">${opt.amount.toFixed(2)}</span>
                        <span className="text-gray-500 text-sm font-medium">/ quincena</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">Total: ${opt.total.toFixed(2)}</div>
                    </div>

                    <div className="space-y-2 mb-4">
                      {opt.benefits.map((b, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-[#00E59B] font-bold" />
                          {b}
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold h-12 text-base gap-2 rounded-lg">
                      <Zap className="h-5 w-5" /> Pagar con Kueski Pay
                    </Button>
                  </>
                ) : (
                  <div className="flex justify-between items-center p-3">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{opt.provider}</span>
                      <span className="text-xs text-gray-500">1 pago de ${opt.total.toFixed(2)}</span>
                    </div>
                    <span className="font-bold text-gray-800">${opt.total.toFixed(2)}</span>
                  </div>
                )}
              </Card>
            ))}

            {/* PANEL INFORMATIVO QUINCENAS */}
            <div className="mt-2 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <Info className="h-4 w-4 text-blue-600" />
                ¿Qué son los pagos quincenales?
              </div>
              <p className="text-blue-800/80 leading-relaxed text-xs">
                Kueski Pay divide el total de tu compra en fracciones que pagas cada 15 días.
                Eliges el plazo que mejor se adapte a ti. ¡Sin necesidad de tarjeta de crédito!
              </p>
            </div>
          </TabsContent>

          {/* CONTENIDO 2: PRECIOS */}
          <TabsContent value="precios" className="space-y-3 m-0 mt-0">
            <h3 className="font-bold text-gray-800 mb-2">Comparación de precios</h3>
            <div className="space-y-3">
              {priceComparisons.map((item, i) => (
                <div key={i} className="price-row">
                   <div className="flex items-center gap-3">
                      <div className="store-icon-container">
                        <Store className="size-4 text-gray-500" />
                      </div>
                      <span className="font-medium text-sm text-gray-800">{item.store}</span>
                   </div>
                   <div className="flex items-center gap-3">
                     <span className="font-bold text-gray-900">${item.price.toFixed(2)}</span>
                     <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                       <ExternalLink className="h-4 w-4" />
                     </Button>
                   </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* CONTENIDO 3: CUPONES */}
          <TabsContent value="cupones" className="space-y-3 m-0 mt-0">
            <h3 className="font-bold text-gray-800 mb-2">Cupones disponibles</h3>
            <div className="space-y-3">
              {coupons.map((coupon, i) => (
                <div key={i} className="p-3 border border-dashed border-purple-300 bg-purple-50 rounded-lg flex justify-between items-center">
                  <div>
                    <div className="font-bold text-purple-700">{coupon.code}</div>
                    <div className="text-sm font-medium text-gray-800">{coupon.discount}</div>
                    <div className="text-xs text-gray-500">{coupon.description}</div>
                  </div>
                  <Button size="sm" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                    Aplicar
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </div>
      </Tabs>

      {/* FOOTER INFO */}
      <div className="footer-info text-center justify-center p-3">
         <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5 justify-center">
           <span>💡</span> Financiamiento disponible al momento de compra
         </span>
      </div>
    </div>
  );
}
