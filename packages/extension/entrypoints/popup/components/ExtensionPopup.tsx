import { useState } from "react";
import {
  Zap, X, Store, ExternalLink, TrendingDown, Check, Tag, LayoutTemplate, Copy, Star, Info, Wallet
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { SimuladorPago } from "./SimuladorPago";
import { DebtDashboard } from "./DebtDashboard";
import '../style.css';

type Tab = 'pago' | 'precios' | 'cupones' | 'deuda';

interface PriceComparison {
  store: string;
  price: number;
  shipping: string;
  cashback: string;
  status: string;
  link: string;
}

interface Coupon {
  code: string;
  discount: string;
  expires: string;
  verified: boolean;
}

export function ExtensionPopup({ onClose }: { onClose?: () => void }) {
  const [activeTab, setActiveTab] = useState<Tab>('pago');

  const priceComparisons: PriceComparison[] = [
    { store: 'Amazon', price: 6000.00, shipping: 'Free', cashback: '$4.99', status: 'In Stock', link: '#' },
    { store: 'Best Buy', price: 6200.00, shipping: 'Free', cashback: '$6.59', status: 'In Stock', link: '#' },
    { store: 'Walmart', price: 5950.00, shipping: '$5.99', cashback: '$3.80', status: 'In Stock', link: '#' },
  ];

  const coupons: Coupon[] = [
    { code: 'SAVE20', discount: '20% off your purchase', expires: 'Apr 20, 2026', verified: true },
    { code: 'FREESHIP', discount: 'Free shipping on orders over $50', expires: 'Apr 30, 2026', verified: true },
    { code: 'SPRING15', discount: '15% off electronics', expires: 'May 1, 2026', verified: false },
  ];

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'pago', label: 'Pago', icon: <LayoutTemplate className="h-4 w-4" /> },
    { id: 'precios', label: 'Precios', icon: <TrendingDown className="h-4 w-4" /> },
    { id: 'cupones', label: 'Cupones', icon: <Tag className="h-4 w-4" /> },
    { id: 'deuda', label: 'Deuda', icon: <Wallet className="h-4 w-4" /> },
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
              <span className="text-3xl font-extrabold text-white leading-none mb-1">$1,500</span>
              <span className="text-[11px] text-white/90">por quincena</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-white leading-none mb-1">4</span>
              <span className="text-[11px] text-white/90">quincenas</span>
            </div>
            <Badge className="bg-[#00E59B] text-gray-900 hover:bg-[#00E59B] font-bold border-none px-3 py-1 rounded-md">
              0% interés
            </Badge>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-container grid grid-cols-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button gap-2 ${activeTab === tab.id ? 'data-[state=active]:bg-gray-50' : ''}`}
            data-state={activeTab === tab.id ? 'active' : 'inactive'}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="overflow-y-auto flex-1 bg-white p-4 styled-scrollbar">

        {/* TAB: PAGO */}
        {activeTab === 'pago' && (
          <SimuladorPago />
        )}

        {/* TAB: PRECIOS */}
        {activeTab === 'precios' && (
          <div className="space-y-4">
            {priceComparisons.map((item, i) => (
              <Card key={i} className="p-4 rounded-xl border border-gray-200 shadow-sm bg-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Store className="h-5 w-5 text-gray-500" />
                    <span className="font-semibold text-base text-gray-900">{item.store}</span>
                  </div>
                  <ExternalLink className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-900" />
                </div>
                <div className="w-full h-px bg-gray-200 mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 font-medium">Precio</span>
                    <span className="font-bold text-gray-900 text-[15px]">${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 font-medium">Envío</span>
                    <span className="font-bold text-gray-900 text-sm">{item.shipping}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 font-medium">Cashback</span>
                    <span className="font-bold text-[#00E59B] text-sm">{item.cashback}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-500 font-medium">Status</span>
                    <span className="font-bold text-[#00E59B] text-sm">{item.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* TAB: CUPONES */}
        {activeTab === 'cupones' && (
          <div className="space-y-4">
            {coupons.map((coupon, i) => (
              <div key={i} className="p-4 border border-dashed border-gray-300 bg-white rounded-xl relative">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 border-none font-bold px-2 py-0.5 rounded text-xs">
                      {coupon.code}
                    </Badge>
                    {coupon.verified && (
                      <Badge className="bg-[#00E59B] text-white hover:bg-[#00E59B] border-none font-bold px-2 py-0.5 rounded flex items-center gap-1 text-[10px]">
                        <Check className="h-3 w-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <Button size="sm" className="bg-[#0f172a] hover:bg-[#1e293b] text-white h-8 px-3 rounded-lg font-semibold text-xs gap-1.5 flex items-center">
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </Button>
                </div>
                <div className="text-[15px] font-medium text-gray-900 mb-1">{coupon.discount}</div>
                <div className="text-xs text-gray-500">Expires: {coupon.expires}</div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: DEUDA */}
        {activeTab === 'deuda' && (
          <DebtDashboard />
        )}
      </div>

      {/* FOOTER */}
      <div className="footer-info text-center justify-center">
        <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1.5 justify-center">
          <span>💡</span> Financiamiento disponible al momento de compra
        </span>
      </div>
    </div>
  );
}