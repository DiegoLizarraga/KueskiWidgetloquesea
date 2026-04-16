import { useState } from "react";
import {
  Zap, CreditCard, Info, ShieldCheck, Star, X, Store, ExternalLink, TrendingDown
} from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import '../style.css';
// Asegúrate de importar tu CSS aquí si no lo haces de manera global
// import './App.css'; 

// ... (Interfaces PaymentOption y PriceComparison se mantienen igual) ...

export function ExtensionPopup({ onClose }: { onClose?: () => void }) {
  // ... (Tus arreglos kueskiOptions y priceComparisons se mantienen igual) ...

  return (
    <div className="popup-container">
      {/* Botón Cerrar */}
      <Button 
        variant="ghost" size="icon" onClick={onClose} 
        className="absolute right-2 top-2 z-20 text-white hover:bg-white/20 rounded-full h-8 w-8"
      >
        <X className="h-4 w-4" />
      </Button>

      {/* HEADER */}
      <div className="kueski-header">
        <div className="kueski-header-top">
          <Badge className="badge-exclusive">KUESKI EXCLUSIVE</Badge>
          <Zap className="fill-yellow-400 text-yellow-400 size-5" />
        </div>
        <p className="text-[10px] opacity-80 uppercase tracking-widest font-bold mt-1">Mejor opción de pago</p>
        <div className="kueski-amount-container">
          <h2 className="text-3xl font-black">$62.50</h2>
          <span className="text-sm font-normal opacity-80">x quincena</span>
        </div>
      </div>

      {/* TABS */}
      <Tabs defaultValue="pago" className="w-full flex-1 flex flex-col">
        <TabsList className="tabs-container">
          <TabsTrigger value="pago" className="tab-button">PAGOS</TabsTrigger>
          <TabsTrigger value="precios" className="tab-button">PRECIOS</TabsTrigger>
          <TabsTrigger value="cupones" className="tab-button">CUPONES</TabsTrigger>
        </TabsList>

        {/* CONTENIDO 1: PAGOS */}
        <TabsContent value="pago" className="p-4 flex flex-col gap-3 m-0">
          {kueskiOptions.map((opt, i) => (
            <Card key={i} className={opt.featured ? "option-card-featured" : "option-card-default"}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-purple-800 text-xs tracking-tight">{opt.provider}</span>
                    {opt.benefits?.map(b => (
                      <Badge key={b} className="benefit-badge">{b}</Badge>
                    ))}
                  </div>
                  <div className="text-2xl font-black text-gray-900 leading-none mt-1">${opt.amount.toFixed(2)}</div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">{opt.periods} Quincenas</p>
                </div>
                <Button size="sm" className="pay-button">Pagar</Button>
              </div>
            </Card>
          ))}
          
          {/* Mini íconos de beneficios */}
          <div className="flex justify-around py-2 mt-1 border-t border-gray-100">
             {/* ... se mantienen tus iconos de Escudo, Tarjeta y Zap ... */}
          </div>
        </TabsContent>

        {/* CONTENIDO 2: PRECIOS */}
        <TabsContent value="precios" className="p-4 space-y-3 m-0">
          {/* ... */}
          <div className="space-y-2">
            {priceComparisons.map((item, i) => (
              <div key={i} className="price-row">
                 <div className="flex items-center gap-3">
                    <div className="store-icon-container">
                      <Store className="size-4 text-gray-500" />
                    </div>
                    {/* ... textos de tienda ... */}
                 </div>
                 {/* ... precios de tienda ... */}
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ... CONTENIDO 3: CUPONES (se mantiene igual) ... */}
      </Tabs>

      {/* FOOTER INFO */}
      <div className="footer-info">
         <Info className="size-4 text-gray-400 shrink-0 mt-0.5" />
         <p className="text-[10px] text-gray-500 leading-snug font-medium pr-2">
           Kueski Pay es un método de pago digital que te permite comprar ahora y pagar después en quincenas.
         </p>
      </div>
    </div>
  );
}