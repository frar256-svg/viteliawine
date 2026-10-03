import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronRight, Grape, MapPin, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/vitelia-logo-original.jpg.asset.json";
import productAsset from "@/assets/vitelia-producto-original.png.asset.json";
import collectionAsset from "@/assets/vitelia-tres-acabados.png.asset.json";
import vineyardImage from "@/assets/vitelia-vinedo.jpg";
import grapesLeatherImage from "@/assets/vitelia-uvas-cuero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitelia | Portabotellas de piel artesanal" },
      { name: "description", content: "Portabotellas Vitelia de piel genuina en tres acabados. Compra o cotiza por WhatsApp; enviamos desde Querétaro a todo México." },
      { property: "og:title", content: "Vitelia | Leather Wine Carriers" },
      { property: "og:description", content: "One product, many stories. Portabotellas de piel hechos para llevar grandes momentos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const variants = [
  { id: "distressed", name: "Distressed Brown", note: "Original · cálido y rústico", swatch: "bg-leather-distressed", image: "sepia-[.08] saturate-[.95]" },
  { id: "camel", name: "Tan / Camel", note: "Claro y elegante", swatch: "bg-leather-camel", image: "sepia-[.28] saturate-[1.1] brightness-[1.15]" },
  { id: "espresso", name: "Espresso Brown", note: "Profundo y formal", swatch: "bg-leather-espresso", image: "sepia-[.18] saturate-[.78] brightness-[.66] contrast-[1.08]" },
] as const;

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
  const [selected, setSelected] = useState<Variant>(variants[0]);
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
            <a href="#producto" className="hover:text-wine">Producto</a><a href="#acabados" className="hover:text-wine">Acabados</a><a href="#historia" className="hover:text-wine">Historia</a>
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

      <section id="inicio" className="relative min-h-[680px] bg-paper lg:min-h-[760px]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]"><img src={collectionAsset.url} alt="Tres portabotellas Vitelia en acabados espresso, distressed brown y camel" className="h-full w-full object-cover object-center opacity-35 lg:opacity-100" /><div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/50 to-transparent" /></div>
        <div className="relative mx-auto flex min-h-[680px] max-w-7xl items-center px-5 py-20 sm:px-8 lg:min-h-[760px]">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-gold"><span className="h-px w-10 bg-gold" />Leather wine carriers · Querétaro</p>
            <h1 className="mt-7 text-6xl font-bold leading-[0.92] text-primary sm:text-7xl lg:text-[6.6rem]">Vitelia</h1>
            <p className="mt-4 font-display text-3xl italic text-wine sm:text-4xl">One product, many stories.</p>
            <p className="mt-7 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">Piel con carácter para acompañar una botella especial. Una pieza artesanal que convierte cada brindis en un regalo inolvidable.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="luxury" size="xl"><a href={whatsappUrl("Hola Vitelia, quiero comprar un portabotellas de piel. ¿Qué acabados tienen disponibles?")} target="_blank" rel="noreferrer">Comprar por WhatsApp <ChevronRight /></a></Button>
              <Button asChild variant="luxuryOutline" size="xl"><a href="#producto">Descubrir la pieza</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="producto" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.08fr_.92fr] lg:gap-20 lg:py-36">
        <div className="relative min-h-[580px] border border-border bg-card sm:min-h-[720px]">
          <span className="absolute left-5 top-5 z-10 bg-primary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">Pieza insignia</span>
          <img src={productAsset.url} alt={`Portabotellas Vitelia, acabado ${selected.name}`} className={`h-full w-full object-contain p-7 transition duration-500 sm:p-12 ${selected.image}`} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-wine">Colección esencial 01</p>
          <h2 className="mt-4 text-5xl font-bold leading-none sm:text-6xl">Portabotellas Vitelia</h2>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Cortado y ensamblado para sostener la botella con firmeza, revelar su etiqueta y llevarla con naturalidad. El logotipo Vitelia completa una pieza creada para regalar y conservar.</p>
          <div className="mt-7 flex items-end justify-between border-y border-border py-5"><div><p className="font-display text-4xl font-bold">$200 <span className="font-sans text-xs font-medium uppercase text-muted-foreground">MXN</span></p><p className="mt-1 text-[10px] text-muted-foreground">Precio temporal de referencia; el precio final puede ajustarse.</p></div><div className="hidden items-center gap-1 text-[10px] font-semibold uppercase text-primary sm:flex"><Check size={14} /> Disponible</div></div>
          <fieldset id="acabados" className="mt-7"><legend className="mb-3 text-xs font-semibold uppercase tracking-[0.13em]">Elige tu acabado</legend><div className="grid gap-2 sm:grid-cols-3">{variants.map((variant) => <Button key={variant.id} type="button" variant="outline" onClick={() => setSelected(variant)} className={`h-auto min-w-0 justify-start p-3 text-left ${selected.id === variant.id ? "border-primary bg-muted" : "bg-transparent"}`} aria-pressed={selected.id === variant.id}><span className={`mr-3 h-7 w-7 shrink-0 rounded-full border border-foreground/10 ${variant.swatch}`} /><span className="min-w-0"><span className="block text-[10px] font-bold uppercase">{variant.name}</span><span className="mt-1 block text-[9px] font-normal text-muted-foreground">{variant.note}</span></span></Button>)}</div></fieldset>
          <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] gap-3"><div className="grid h-12 grid-cols-[40px_36px_40px] items-center border border-border"><Button variant="ghost" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar cantidad"><Minus /></Button><span className="text-center text-sm font-semibold">{quantity}</span><Button variant="ghost" size="icon" onClick={() => setQuantity(quantity + 1)} aria-label="Sumar cantidad"><Plus /></Button></div><Button variant="luxury" size="xl" onClick={() => addToCart(false)}><ShoppingBag /> Agregar al carrito</Button></div>
          <Button asChild variant="luxuryOutline" size="xl" className="mt-3 w-full border-wine text-wine hover:bg-wine hover:text-primary-foreground"><a href={whatsappUrl(purchaseMessage)} target="_blank" rel="noreferrer">Comprar ahora por WhatsApp</a></Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"><ShieldCheck size={14} /> Atención personal · Envío rastreable</p>
        </div>
      </section>

      <section className="relative min-h-[570px] overflow-hidden text-primary-foreground"><img src={vineyardImage} alt="Viñedo entre montañas al atardecer" loading="lazy" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-primary/70" /><div className="relative mx-auto flex min-h-[570px] max-w-7xl items-end px-5 py-16 sm:px-8 sm:py-24"><div className="max-w-2xl"><Grape className="text-gold" size={30} strokeWidth={1.4} /><p className="mt-7 text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Del viñedo a la mesa</p><h2 className="mt-4 text-5xl font-bold leading-none sm:text-7xl">Lleva algo más que una botella.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/80">Lleva la expectativa del descorche, la mesa que espera y la historia que está por comenzar.</p></div></div></section>

      <section id="historia" className="grid bg-primary text-primary-foreground lg:grid-cols-2"><div className="min-h-[460px] overflow-hidden lg:min-h-[680px]"><img src={grapesLeatherImage} alt="Uvas, corcho y piel artesanal" loading="lazy" width={1536} height={1024} className="h-full w-full object-cover" /></div><div className="flex flex-col justify-center px-6 py-16 sm:px-14 lg:px-20"><p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Con origen en Querétaro</p><h2 className="mt-5 text-5xl font-bold leading-[0.98] sm:text-6xl">Oficio, materia<br />y memoria.</h2><p className="mt-8 max-w-lg text-sm leading-7 text-primary-foreground/75">Vitelia nace para transformar la forma en que llevamos un vino: no como una botella más, sino como el comienzo de una historia compartida.</p><p className="mt-5 max-w-lg text-sm leading-7 text-primary-foreground/75">Cada acabado revela una personalidad distinta y desarrolla una pátina propia con el uso.</p><div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold"><MapPin size={16} /> Santiago de Querétaro, México</div></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><div className="mb-14 max-w-xl"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-wine">Hecho para acompañarte</p><h2 className="mt-4 text-5xl font-bold leading-none sm:text-6xl">Belleza con propósito.</h2></div><div className="grid border-y border-border md:grid-cols-3">{[[Sparkles,"Piel genuina","Textura, resistencia y una pátina única que mejora con el tiempo."],[PackageCheck,"Protección elegante","Una estructura envolvente que resguarda la botella y realza su presencia."],[Truck,"Envíos nacionales","Empacamos cada pieza con cuidado en Querétaro y enviamos a todo México."]].map(([Icon,title,copy],index)=>{const BenefitIcon=Icon as typeof Sparkles;return <article key={String(title)} className={`py-10 md:px-8 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}><span className="grid h-11 w-11 place-items-center border border-gold text-gold"><BenefitIcon size={19}/></span><h3 className="mt-7 text-3xl font-bold">{String(title)}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{String(copy)}</p></article>})}</div></section>

      <section className="bg-wine text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 sm:px-8 lg:flex-row lg:items-center"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold">Compra y cotiza directamente</p><h2 className="mt-3 text-4xl font-bold">Hablemos por WhatsApp.</h2><p className="mt-3 text-sm text-primary-foreground/70">Te ayudamos a elegir acabado, confirmar precio final y coordinar el envío.</p></div><Button asChild variant="luxury" size="xl" className="bg-gold text-primary hover:bg-gold/90"><a href={whatsappUrl("Hola Vitelia, quisiera información sobre sus portabotellas de piel.")} target="_blank" rel="noreferrer">Escribir al +52 1 55 6348 9801 <ChevronRight /></a></Button></div></section>

      <section className="border-b border-border bg-paper"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 px-5 py-10 text-center sm:px-8 lg:flex-row lg:text-left"><div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Métodos de pago aceptados</p><p className="mt-2 font-display text-2xl font-bold">Pago acordado al confirmar tu pedido</p></div><div className="flex flex-wrap justify-center gap-2">{["Mercado Pago","PayPal","VISA","Mastercard"].map((name)=><span key={name} className="border border-border bg-background px-4 py-3 text-xs font-semibold">{name}</span>)}</div></div></section>

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="grid gap-10 border-b border-primary-foreground/20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]"><div><BrandMark inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">Diseño en piel para las historias que empiezan alrededor de una botella.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Explora</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="#producto">Producto</a><a href="#acabados">Acabados</a><a href="#historia">Nuestra historia</a></div></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Información</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><span>Envíos a todo México</span><span>Aviso de privacidad</span><span>Términos y condiciones</span></div></div></div><div className="flex flex-col gap-2 pt-6 text-[10px] uppercase tracking-[0.13em] text-primary-foreground/50 sm:flex-row sm:justify-between"><span>© 2026 Vitelia</span><span>Querétaro, México</span></div></div></footer>

      <Button asChild variant="luxury" size="icon" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp text-primary-foreground shadow-xl hover:bg-whatsapp/90" aria-label="Hablar con Vitelia por WhatsApp"><a href={whatsappUrl("Hola Vitelia, quisiera información sobre sus portabotellas de piel.")} target="_blank" rel="noreferrer"><span className="text-xl font-bold">W</span></a></Button>
    </main>
  );
}

function CartPanel({ cart, total, changeLine }: { cart: CartLine[]; total: number; changeLine: (id: Variant["id"], amount: number) => void }) {
  const cartMessage = cart.length ? `Hola Vitelia, quiero comprar: ${cart.map((line) => `${line.quantity} ${line.variant.name}`).join(", ")}. Total de referencia: $${total} MXN. ¿Me ayudan a confirmar?` : "Hola Vitelia, quisiera información sobre sus portabotellas.";
  return <SheetContent className="flex w-[92vw] flex-col border-l border-border p-0 sm:max-w-md"><SheetHeader className="border-b border-border px-6 py-6 text-left"><SheetTitle className="font-display text-3xl font-bold">Tu selección</SheetTitle><SheetDescription>Precio temporal de referencia</SheetDescription></SheetHeader>{cart.length===0?<div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><ShoppingBag className="mb-5 text-gold" size={38}/><p className="font-display text-2xl font-bold">Tu carrito está vacío</p><p className="mt-2 text-sm text-muted-foreground">Elige un acabado para comenzar.</p></div>:<><div className="flex-1 overflow-y-auto px-6 py-6">{cart.map((line)=><div key={line.variant.id} className="grid grid-cols-[70px_1fr_auto] gap-4 border-b border-border py-5"><img src={productAsset.url} alt="" className={`h-24 w-[70px] bg-paper object-contain ${line.variant.image}`}/><div><p className="text-xs font-semibold">{line.variant.name}</p><p className="mt-1 text-xs text-muted-foreground">$200 MXN</p><div className="mt-4 flex items-center gap-3"><Button variant="outline" size="icon" className="h-7 w-7" onClick={()=>changeLine(line.variant.id,-1)}><Minus size={12}/></Button><span className="text-xs font-semibold">{line.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7" onClick={()=>changeLine(line.variant.id,1)}><Plus size={12}/></Button></div></div><Button variant="ghost" size="icon" onClick={()=>changeLine(line.variant.id,-line.quantity)} aria-label={`Eliminar ${line.variant.name}`}><X size={15}/></Button></div>)}</div><div className="border-t border-border bg-paper px-6 py-6"><div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase">Total de referencia</span><span className="font-display text-3xl font-bold">${total.toLocaleString("es-MX")} <small className="font-sans text-[10px]">MXN</small></span></div><p className="mt-2 text-[10px] text-muted-foreground">El precio final y el envío se confirmarán por WhatsApp.</p><Button asChild variant="luxury" size="xl" className="mt-5 w-full"><a href={whatsappUrl(cartMessage)} target="_blank" rel="noreferrer">Finalizar por WhatsApp <ChevronRight/></a></Button></div></>}</SheetContent>;
}