import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, Minus, Plus, ShieldCheck, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/vitelia-logo-original.jpg.asset.json";
import productAsset from "@/assets/hero_2.jpg.asset.json";
import { variants } from "@/lib/catalog";
import { ProductGallery } from "@/components/product-gallery";
import { ProductStory } from "@/components/product-story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitelia | Portabotellas de piel artesanal" },
      { name: "description", content: "Portabotellas Vitelia de piel genuina en acabado Distressed Brown. Compra o cotiza por WhatsApp; enviamos desde Querétaro a todo México." },
      { property: "og:title", content: "Vitelia | Portabotellas de piel artesanal" },
      { property: "og:description", content: "Una pieza, muchas historias. Portabotellas de piel hechos para llevar grandes momentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Variant = (typeof variants)[number];
type CartLine = { variant: Variant; quantity: number };

const whatsappNumber = "5215563489801";

function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="Vitelia, ir al inicio">
      <img src={logoAsset.url} alt="" className="h-11 w-11 object-cover" />
      <span className={`font-display text-2xl font-bold uppercase ${inverse ? "text-primary-foreground" : "text-primary"}`}>Vitelia</span>
    </a>
  );
}

function Index() {
  const selected = variants[0];
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);
  const total = cartCount * 200;
  const purchaseMessage = `Hola Vitelia, quiero comprar ${quantity} portabotellas en acabado ${selected.name}. ¿Me ayudan a finalizar mi pedido?`;

  function addToCart(open = false) {
    setCart((current) => {
      const found = current.find((line) => line.variant.id === selected.id);
      return found
        ? current.map((line) => line.variant.id === selected.id ? { ...line, quantity: line.quantity + quantity } : line)
        : [...current, { variant: selected, quantity }];
    });
    if (open) setCartOpen(true);
  }

  function changeLine(id: Variant["id"], amount: number) {
    setCart((current) => current.map((line) => line.variant.id === id ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0));
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <div className="bg-wine px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground sm:text-xs">
        Envíos seguros desde Querétaro a todo México
      </div>

      <header className="relative z-30 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
          <BrandMark />
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex" aria-label="Navegación principal">
            <a href="#producto" className="hover:text-wine">Producto</a><a href="#materiales" className="hover:text-wine">Materiales</a><a href="#historia" className="hover:text-wine">Historia</a>
          </nav>
          <div className="flex justify-end gap-2">
            <Button asChild variant="luxuryOutline" className="hidden sm:inline-flex"><a href={whatsappUrl("Hola Vitelia, quisiera cotizar sus portabotellas de piel.")} target="_blank" rel="noreferrer">Cotizar</a></Button>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="relative" aria-label={`Abrir carrito, ${cartCount} artículos`}><ShoppingBag />{cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-wine px-1 text-[10px] font-bold text-primary-foreground">{cartCount}</span>}</Button></SheetTrigger>
              <CartPanel cart={cart} total={total} changeLine={changeLine} />
            </Sheet>
          </div>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden bg-catalog">
        <img src={productAsset.url} alt="Portabotellas Vitelia Distressed Brown, vista frontal" className="mx-auto h-[350px] w-full object-contain lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%]" fetchPriority="high" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:flex lg:min-h-[620px] lg:items-center lg:py-16">
          <div className="max-w-lg lg:max-w-[48%]">
            <p className="text-[10px] font-semibold uppercase text-gold">Portabotellas de piel · Querétaro</p>
            <h1 className="mt-5 text-5xl font-bold leading-tight text-primary sm:text-7xl">Vitelia</h1>
            <p className="mt-4 font-display text-2xl italic text-wine sm:text-3xl">Una pieza, muchas historias.</p>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Piel con carácter para acompañar una botella especial. Una pieza artesanal que convierte cada brindis en un regalo inolvidable.</p>
            <div className="mt-8 flex flex-col gap-3 sm:items-start">
              <Button asChild variant="luxury" size="xl"><a href={whatsappUrl("Hola Vitelia, quiero comprar un portabotellas Distressed Brown.")} target="_blank" rel="noreferrer">Comprar por WhatsApp <ChevronRight /></a></Button>
              <Button asChild variant="luxuryOutline" size="xl"><a href="#producto">Descubrir la pieza</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="producto" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:py-36">
        <ProductGallery />
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-wine">Colección esencial 01</p>
          <h2 className="mt-4 text-5xl font-bold leading-none sm:text-6xl">Portabotellas Vitelia</h2>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Cortado y ensamblado para sostener la botella con firmeza, revelar su etiqueta y llevarla con naturalidad. El logotipo Vitelia completa una pieza creada para regalar y conservar.</p>
          <div className="mt-7 flex items-end justify-between border-y border-border py-5"><div><p className="font-display text-4xl font-bold">$200 <span className="font-sans text-xs font-medium uppercase text-muted-foreground">MXN</span></p><p className="mt-1 text-[10px] text-muted-foreground">Precio temporal de referencia; el precio final puede ajustarse.</p></div><div className="hidden items-center gap-1 text-[10px] font-semibold uppercase text-primary sm:flex"><Check size={14} /> Disponible</div></div>
          <div className="mt-7 flex items-center gap-4 border-b border-border pb-6"><span className="h-8 w-8 shrink-0 rounded-full bg-leather-distressed"/><div><p className="text-xs font-semibold uppercase">Distressed Brown</p><p className="mt-1 text-xs text-muted-foreground">Original · cálido y rústico</p></div></div>
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-[auto_minmax(0,1fr)]"><div className="grid h-12 w-fit grid-cols-[40px_36px_40px] items-center border border-border"><Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar cantidad"><Minus /></Button><span className="text-center text-sm font-semibold">{quantity}</span><Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} aria-label="Sumar cantidad"><Plus /></Button></div><Button variant="luxury" size="xl" onClick={() => addToCart(false)}><ShoppingBag /> Agregar al carrito</Button></div>
          <Button asChild variant="luxuryOutline" size="xl" className="mt-3 w-full border-wine text-wine hover:bg-wine hover:text-primary-foreground"><a href={whatsappUrl(purchaseMessage)} target="_blank" rel="noreferrer">Comprar ahora por WhatsApp</a></Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"><ShieldCheck size={14} /> Atención personal · Envío rastreable</p>
        </div>
      </section>

      <ProductStory contactUrl={whatsappUrl("Hola Vitelia, quiero comprar o cotizar un portabotellas Distressed Brown.")} />

      <section className="border-b border-border bg-paper"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 px-5 py-10 text-center sm:px-8 lg:flex-row lg:text-left"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Métodos de pago aceptados</p><p className="mt-2 font-display text-2xl font-bold">Pago acordado al confirmar tu pedido</p></div><div className="flex flex-wrap justify-center gap-2">{["Mercado Pago","PayPal","VISA","Mastercard"].map((name)=><span key={name} className="border border-border bg-background px-4 py-3 text-xs font-semibold">{name}</span>)}</div></div></section>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="grid gap-10 border-b border-primary-foreground/20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]"><div><BrandMark inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">Diseño en piel para las historias que empiezan alrededor de una botella.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Explora</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="#producto">Producto</a><a href="#materiales">Materiales</a><a href="#ocasiones">Ocasiones</a><a href="#historia">Nuestra historia</a></div></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Información</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><span>Envíos a todo México</span><span>Aviso de privacidad</span><span>Términos y condiciones</span></div></div></div><div className="flex flex-col gap-2 pt-6 text-[10px] uppercase tracking-[0.13em] text-primary-foreground/50 sm:flex-row sm:justify-between"><span>© 2026 Vitelia</span><span>Querétaro, México</span></div></div></footer>

      <Button asChild variant="luxury" size="icon" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp text-primary-foreground shadow-xl hover:bg-whatsapp/90" aria-label="Hablar con Vitelia por WhatsApp"><a href={whatsappUrl("Hola Vitelia, me interesa conocer más sobre los portabotellas VITELIA.")} target="_blank" rel="noreferrer"><span className="text-xl font-bold">W</span></a></Button>
    </main>
  );
}

function CartPanel({ cart, total, changeLine }: { cart: CartLine[]; total: number; changeLine: (id: Variant["id"], amount: number) => void }) {
  const cartMessage = cart.length ? `Hola Vitelia, quiero comprar: ${cart.map((line) => `${line.quantity} ${line.variant.name}`).join(", ")}. Total de referencia: $${total} MXN. ¿Me ayudan a confirmar?` : "Hola Vitelia, quisiera información sobre sus portabotellas.";
  return <SheetContent className="flex w-[92vw] flex-col border-l border-border p-0 sm:max-w-md"><SheetHeader className="border-b border-border px-6 py-6 text-left"><SheetTitle className="font-display text-3xl font-bold">Tu selección</SheetTitle><SheetDescription>Precio temporal de referencia</SheetDescription></SheetHeader>{cart.length===0?<div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><ShoppingBag className="mb-5 text-gold" size={38}/><p className="font-display text-2xl font-bold">Tu carrito está vacío</p><p className="mt-2 text-sm text-muted-foreground">Añade tu portabotellas para comenzar.</p></div>:<><div className="flex-1 overflow-y-auto px-6 py-6">{cart.map((line)=><div key={line.variant.id} className="grid grid-cols-[70px_1fr_auto] gap-4 border-b border-border py-5"><img src={productAsset.url} alt="" className="h-24 w-[70px] bg-catalog object-contain"/><div><p className="text-xs font-semibold">{line.variant.name}</p><p className="mt-1 text-xs text-muted-foreground">$200 MXN</p><div className="mt-4 flex items-center gap-3"><Button variant="outline" size="icon" className="h-7 w-7" onClick={()=>changeLine(line.variant.id,-1)}><Minus size={12}/></Button><span className="text-xs font-semibold">{line.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7" onClick={()=>changeLine(line.variant.id,1)}><Plus size={12}/></Button></div></div><Button variant="ghost" size="icon" onClick={()=>changeLine(line.variant.id,-line.quantity)} aria-label={`Eliminar ${line.variant.name}`}><X size={15}/></Button></div>)}</div><div className="border-t border-border bg-paper px-6 py-6"><div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase">Total de referencia</span><span className="font-display text-3xl font-bold">${total.toLocaleString("es-MX")} <small className="font-sans text-[10px]">MXN</small></span></div><p className="mt-2 text-[10px] text-muted-foreground">El precio final y el envío se confirmarán por WhatsApp.</p><Button asChild variant="luxury" size="xl" className="mt-5 w-full"><a href={whatsappUrl(cartMessage)} target="_blank" rel="noreferrer">Finalizar por WhatsApp <ChevronRight/></a></Button></div></>}</SheetContent>;
}