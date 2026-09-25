import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, Check, ChevronLeft, ChevronRight, MapPin, Minus, PackageCheck, Plus, ShieldCheck, ShoppingBag, Sparkles, Truck, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import productAsset from "@/assets/vitelia-portabotellas.jpeg.asset.json";
import logoAsset from "@/assets/vitelia-logo.jpeg.asset.json";
import queretaroAsset from "@/assets/queretaro-origen.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitelia | Portabotellas de piel artesanal" },
      { name: "description", content: "Descubre el portabotellas de piel Vitelia, hecho para regalar, compartir y llevar historias. Envíos desde Querétaro a todo México." },
      { property: "og:title", content: "Vitelia | Leather Wine Carriers" },
      { property: "og:description", content: "One product, many stories. Portabotellas de piel con diseño atemporal y envío a todo México." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const variants = [
  { id: "hazelnut", name: "Clásico Avellana", short: "Avellana", swatch: "bg-[#9a5c37]", image: "sepia-[.15] saturate-[.9]" },
  { id: "walnut", name: "Vintage Nogal", short: "Nogal", swatch: "bg-[#5d3528]", image: "sepia-[.35] saturate-[.75] brightness-[.82]" },
  { id: "onyx", name: "Minimalista Onyx", short: "Onyx", swatch: "bg-[#252421]", image: "grayscale brightness-[.58] contrast-[1.25]" },
] as const;

type Variant = (typeof variants)[number];
type CartLine = { variant: Variant; quantity: number };

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className="flex shrink-0 items-center gap-2.5" aria-label="Vitelia, ir al inicio">
      <img src={logoAsset.url} alt="" className={compact ? "h-9 w-9 object-cover object-top" : "h-11 w-11 object-cover object-top"} />
      <span className="font-display text-2xl font-semibold uppercase leading-none text-primary sm:text-3xl">Vitelia</span>
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
    setCart((current) => current
      .map((line) => line.variant.id === id ? { ...line, quantity: line.quantity + amount } : line)
      .filter((line) => line.quantity > 0));
  }

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <div className="bg-primary px-4 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-foreground sm:text-xs">
        Envíos desde Querétaro a todo México
      </div>

      <header className="absolute top-[31px] z-30 w-full border-b border-primary-foreground/20 text-primary-foreground sm:top-8">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-8">
          <a href="#inicio" className="flex min-w-0 items-center gap-3" aria-label="Vitelia, ir al inicio">
            <span className="grid h-10 w-10 shrink-0 place-items-center border border-gold font-display text-2xl">V</span>
            <span className="truncate font-display text-2xl font-semibold uppercase sm:text-3xl">Vitelia</span>
          </a>
          <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] lg:flex" aria-label="Navegación principal">
            <a href="#inicio" className="transition-colors hover:text-gold">Inicio</a>
            <a href="#producto" className="transition-colors hover:text-gold">Producto</a>
            <a href="#historia" className="transition-colors hover:text-gold">Historia</a>
            <a href="#contacto" className="transition-colors hover:text-gold">Contacto</a>
          </nav>
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-11 w-11 border border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label={`Abrir carrito, ${cartCount} artículos`}>
                <ShoppingBag />
                {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-coral px-1 text-[10px] font-bold text-primary-foreground">{cartCount}</span>}
              </Button>
            </SheetTrigger>
            <CartPanel cart={cart} total={total} changeLine={changeLine} />
          </Sheet>
        </div>
      </header>

      <section id="inicio" className="relative flex min-h-[720px] items-end bg-primary pt-40 text-primary-foreground sm:min-h-[790px] lg:min-h-[min(880px,92vh)]">
        <div className="absolute inset-0">
          <img src={productAsset.url} alt="Portabotellas Vitelia de piel avellana con una botella de vino" className="h-full w-full object-cover object-[63%_center] opacity-90 sm:object-[72%_center] lg:object-right" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/35" />
        </div>
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl">
            <p className="mb-5 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold sm:text-xs"><span className="h-px w-10 bg-gold" />Leather wine carriers</p>
            <h1 className="max-w-xl text-5xl font-medium leading-[0.92] sm:text-7xl lg:text-[6.5rem]">Historias que merecen ser llevadas.</h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-primary-foreground/80 sm:text-base">Un portabotellas de piel con presencia, carácter y oficio. Diseñado para convertir cada vino en un gesto inolvidable.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="luxury" size="xl" className="bg-gold text-primary hover:bg-gold/90"><a href="#producto">Ver colección <ChevronRight /></a></Button>
              <Button asChild variant="luxuryOutline" size="xl" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="#historia">Nuestra esencia</a></Button>
            </div>
          </div>
          <a href="#producto" className="absolute bottom-6 right-5 grid h-11 w-11 place-items-center border border-primary-foreground/30 text-primary-foreground sm:right-8" aria-label="Bajar al producto"><ArrowDown size={18} /></a>
        </div>
      </section>

      <section id="producto" className="mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.12fr_.88fr] lg:gap-20 lg:py-36">
        <div className="relative min-h-[480px] bg-paper sm:min-h-[650px]">
          <span className="absolute left-5 top-5 z-10 bg-primary px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary-foreground">Pieza insignia</span>
          <img src={productAsset.url} alt={`Portabotellas Vitelia, edición ${selected.name}`} className={`h-full w-full object-contain p-4 transition duration-500 sm:p-10 ${selected.image}`} />
          <span className="absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Imagen de referencia · Acabado {selected.short}</span>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coral">Colección esencial 01</p>
          <h2 className="mt-4 text-5xl font-medium leading-none sm:text-6xl">Portabotellas Vitelia</h2>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">Una sola pieza de piel abraza y protege la botella, mientras el asa integrada permite llevarla con naturalidad. Hecha para mesas, viajes y regalos con intención.</p>
          <div className="mt-7 flex items-end justify-between border-y border-border py-5">
            <div><p className="font-display text-4xl">$200 <span className="font-sans text-xs font-medium uppercase text-muted-foreground">MXN</span></p><p className="mt-1 text-[10px] text-muted-foreground">Precio provisional sujeto a ajuste</p></div>
            <div className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary"><Check size={14} /> Disponible</div>
          </div>

          <fieldset className="mt-7">
            <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.13em]">Elige tu acabado</legend>
            <div className="grid grid-cols-3 gap-2">
              {variants.map((variant) => (
                <button key={variant.id} type="button" onClick={() => setSelected(variant)} className={`min-w-0 border p-3 text-left transition ${selected.id === variant.id ? "border-primary bg-muted" : "border-border bg-transparent hover:border-primary/50"}`} aria-pressed={selected.id === variant.id}>
                  <span className={`mb-4 block h-6 w-6 rounded-full border border-foreground/10 ${variant.swatch}`} />
                  <span className="block truncate text-[10px] font-semibold uppercase tracking-[0.08em]">{variant.short}</span>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 grid grid-cols-[auto_minmax(0,1fr)] gap-3">
            <div className="grid h-12 grid-cols-[40px_36px_40px] items-center border border-border" aria-label="Selector de cantidad">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Restar cantidad"><Minus /></Button>
              <span className="text-center text-sm font-semibold">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(quantity + 1)} aria-label="Sumar cantidad"><Plus /></Button>
            </div>
            <Button variant="luxury" size="xl" onClick={() => addToCart(false)}><ShoppingBag /> Agregar al carrito</Button>
          </div>
          <Button variant="luxuryOutline" size="xl" className="mt-3 w-full" onClick={() => addToCart(true)}>Comprar ahora</Button>
          <p className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.1em] text-muted-foreground"><ShieldCheck size={14} /> Compra protegida · Envío rastreable</p>
        </div>
      </section>

      <section id="historia" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
          <div className="min-h-[460px] overflow-hidden lg:min-h-[680px]"><img src={queretaroAsset.url} alt="Paisaje de las montañas de Querétaro al atardecer" className="h-full w-full object-cover" /></div>
          <div className="flex flex-col justify-center px-6 py-16 sm:px-14 lg:px-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">De Querétaro para México</p>
            <h2 className="mt-5 text-5xl font-medium leading-[0.98] sm:text-6xl">One product,<br /><em className="font-normal text-gold">many stories.</em></h2>
            <p className="mt-8 max-w-lg text-sm leading-7 text-primary-foreground/75">Vitelia nace del deseo de transformar la forma en que llevamos un vino: no como una botella más, sino como el comienzo de una historia compartida.</p>
            <p className="mt-5 max-w-lg text-sm leading-7 text-primary-foreground/75">Este espacio está preparado para contar el origen de la marca, el oficio detrás de cada pieza y las personas que hacen posible una visión nacida en Querétaro.</p>
            <div className="mt-10 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold"><MapPin size={16} /> Santiago de Querétaro, México</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-14 max-w-xl"><p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-coral">Hecho para acompañarte</p><h2 className="mt-4 text-5xl font-medium leading-none sm:text-6xl">Belleza con propósito.</h2></div>
        <div className="grid border-y border-border md:grid-cols-3">
          {[
            [Sparkles, "Piel genuina", "Materiales seleccionados por su textura, resistencia y la pátina única que adquieren con el tiempo."],
            [PackageCheck, "Protección elegante", "Una estructura envolvente que resguarda la botella y realza su presencia al regalarla o transportarla."],
            [Truck, "Envíos nacionales", "Empacamos cada pieza con cuidado en Querétaro y la enviamos de forma segura a todo México."],
          ].map(([Icon, title, copy], index) => {
            const BenefitIcon = Icon as typeof Sparkles;
            return <article key={String(title)} className={`py-10 md:px-8 ${index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""}`}><span className="grid h-11 w-11 place-items-center border border-gold text-gold"><BenefitIcon size={19} /></span><h3 className="mt-7 text-3xl font-medium">{String(title)}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{String(copy)}</p></article>;
          })}
        </div>
      </section>

      <section className="border-y border-border bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 py-12 text-center sm:px-8 lg:flex-row lg:text-left">
          <div><p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Métodos de pago aceptados</p><p className="mt-2 font-display text-3xl">Elige cómo pagar al finalizar</p></div>
          <div className="flex flex-wrap justify-center gap-2">{["Mercado Pago", "PayPal", "VISA", "Mastercard"].map((name) => <span key={name} className="border border-border bg-background px-4 py-3 text-xs font-semibold">{name}</span>)}</div>
        </div>
      </section>

      <footer id="contacto" className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 border-b border-primary-foreground/20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
            <div><div className="text-gold"><BrandMark compact /></div><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">Diseño en piel para las historias que empiezan alrededor de una botella.</p></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Explora</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="#producto">Producto</a><a href="#historia">Nuestra historia</a><a href="#contacto">Contacto</a></div></div>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Información</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><span>Envíos a todo México</span><span>Aviso de privacidad</span><span>Términos y condiciones</span></div></div>
          </div>
          <div className="flex flex-col gap-2 pt-6 text-[10px] uppercase tracking-[0.13em] text-primary-foreground/50 sm:flex-row sm:justify-between"><span>© 2026 Vitelia</span><span>Con origen en Querétaro, México</span></div>
        </div>
      </footer>
    </main>
  );
}

function CartPanel({ cart, total, changeLine }: { cart: CartLine[]; total: number; changeLine: (id: Variant["id"], amount: number) => void }) {
  return (
    <SheetContent className="flex w-[92vw] flex-col border-l border-border p-0 sm:max-w-md">
      <SheetHeader className="border-b border-border px-6 py-6 text-left"><SheetTitle className="font-display text-3xl font-medium">Tu selección</SheetTitle><SheetDescription>Portabotellas Vitelia · precio provisional</SheetDescription></SheetHeader>
      {cart.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><ShoppingBag className="mb-5 text-gold" size={38} strokeWidth={1.3} /><p className="font-display text-2xl">Tu carrito está vacío</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Elige un acabado para comenzar una nueva historia.</p></div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {cart.map((line) => <div key={line.variant.id} className="grid grid-cols-[76px_minmax(0,1fr)_auto] gap-4 border-b border-border py-5 first:pt-0"><img src={productAsset.url} alt="" className={`h-24 w-[76px] bg-paper object-contain ${line.variant.image}`} /><div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.1em]">{line.variant.short}</p><p className="mt-1 text-xs text-muted-foreground">$200 MXN</p><div className="mt-4 flex items-center gap-3"><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeLine(line.variant.id, -1)} aria-label="Restar"><Minus size={12} /></Button><span className="text-xs font-semibold">{line.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7" onClick={() => changeLine(line.variant.id, 1)} aria-label="Sumar"><Plus size={12} /></Button></div></div><Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => changeLine(line.variant.id, -line.quantity)} aria-label={`Eliminar ${line.variant.short}`}><X size={15} /></Button></div>)}
          </div>
          <div className="border-t border-border bg-paper px-6 py-6"><div className="flex items-end justify-between"><span className="text-xs font-semibold uppercase tracking-[0.13em]">Total provisional</span><span className="font-display text-3xl">${total.toLocaleString("es-MX")} <small className="font-sans text-[10px]">MXN</small></span></div><p className="mt-2 text-[10px] leading-5 text-muted-foreground">El costo de envío y el precio final se confirmarán al habilitar el pago.</p><Button variant="luxury" size="xl" className="mt-5 w-full" disabled>Finalizar compra <ChevronRight /></Button></div>
        </>
      )}
    </SheetContent>
  );
}