import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, Minus, Plus, ShoppingBag, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import logoAsset from "@/assets/vitelia-logo-original.jpg.asset.json";
import productAsset from "@/assets/hero_2.jpg.asset.json";
import { addSelection, selectionName, type CollectionCartLine } from "@/lib/collection";
import { ProductCollection } from "@/components/product-collection";
import { cartQuoteMessage, generalQuoteMessage, whatsappUrl } from "@/lib/quote";
import { ProductGallery } from "@/components/product-gallery";
import { ProductStory } from "@/components/product-story";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vitelia | Colección de bolsas portabotellas de cuero" },
      { name: "description", content: "Descubre los cuatro modelos de bolsas portabotellas Vitelia: individual, doble, para cuatro botellas y para destilados. Cotiza por WhatsApp." },
      { property: "og:title", content: "Vitelia | Colección de bolsas portabotellas de cuero" },
      { property: "og:description", content: "Bolsas portabotellas de cuero para vino y destilados. Conoce la colección Vitelia y solicita tu cotización por WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});



function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <a href="#inicio" className="flex shrink-0 items-center gap-3" aria-label="Vitelia, ir al inicio">
      <img src={logoAsset.url} alt="" className="h-11 w-11 object-cover" />
      <span className={`font-display text-2xl font-bold uppercase ${inverse ? "text-primary-foreground" : "text-primary"}`}>Vitelia</span>
    </a>
  );
}

function Index() {
  const [cart, setCart] = useState<CollectionCartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = cart.reduce((sum, line) => sum + line.quantity, 0);

  function addToCart(line: CollectionCartLine) {
    setCart((current) => addSelection(current, line));
  }

  function changeLine(id: string, amount: number) {
    setCart((current) => current.map((line) => line.id === id ? { ...line, quantity: line.quantity + amount } : line).filter((line) => line.quantity > 0));
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
            <a href="#producto" className="hover:text-wine">Productos</a><a href="#materiales" className="hover:text-wine">Materiales</a><a href="#historia" className="hover:text-wine">Historia</a>
          </nav>
          <div className="flex justify-end gap-2">
            <Button asChild variant="luxuryOutline" className="hidden sm:inline-flex"><a href={whatsappUrl(generalQuoteMessage)} target="_blank" rel="noreferrer">Cotizar</a></Button>
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild><Button variant="outline" size="icon" className="relative" aria-label={`Abrir carrito, ${cartCount} artículos`}><ShoppingBag />{cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-wine px-1 text-[10px] font-bold text-primary-foreground">{cartCount}</span>}</Button></SheetTrigger>
              <CartPanel cart={cart} changeLine={changeLine} />
            </Sheet>
          </div>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden bg-catalog">
        <img src={productAsset.url} alt="Portabotellas Vitelia Distressed Brown, vista frontal" className="mx-auto h-[460px] w-full object-contain sm:h-[520px] lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%]" fetchPriority="high" />
        <div className="relative mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:flex lg:min-h-[620px] lg:items-center lg:py-16">
          <div className="max-w-lg lg:max-w-[48%]">
            <p className="text-[10px] font-semibold uppercase text-gold">Colección de portabotellas · Querétaro</p>
            <h1 className="mt-5 text-5xl font-bold leading-tight text-primary sm:text-7xl">Vitelia</h1>
            <p className="mt-4 font-display text-2xl italic text-wine sm:text-3xl">Una pieza, muchas historias.</p>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Bolsas de cuero para acompañar el vino y los destilados. Cuatro modelos para llevar una botella especial o compartir un brindis.</p>
            <div className="mt-8 flex flex-col gap-3 sm:items-start">
              <Button asChild variant="luxury" size="xl"><a href={whatsappUrl(generalQuoteMessage)} target="_blank" rel="noreferrer">Cotizar por WhatsApp <ChevronRight /></a></Button>
              <Button asChild variant="luxuryOutline" size="xl"><a href="#producto">Descubrir nuestros productos</a></Button>
            </div>
          </div>
        </div>
      </section>

      <ProductCollection onAdd={addToCart} />

      <section id="pieza-original" className="mx-auto grid max-w-7xl items-center gap-12 border-t border-border px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <ProductGallery />
        <div><p className="text-xs font-semibold uppercase text-wine">Una mirada al detalle</p><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">La pieza original</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Explora las vistas del portabotellas Vitelia en acabado Distressed Brown.</p><Button asChild variant="luxuryOutline" className="mt-7"><a href={whatsappUrl("Hola Vitelia, quisiera información sobre la pieza original Distressed Brown.")} target="_blank" rel="noreferrer">Consultar por WhatsApp <ChevronRight /></a></Button></div>
      </section>

      <ProductStory contactUrl={whatsappUrl(generalQuoteMessage)} />

      <footer className="bg-primary text-primary-foreground"><div className="mx-auto max-w-7xl px-5 py-14 sm:px-8"><div className="grid gap-10 border-b border-primary-foreground/20 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]"><div><BrandMark inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-primary-foreground/65">Diseño en piel para las historias que empiezan alrededor de una botella.</p></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Explora</p><div className="mt-5 flex flex-col gap-3 text-sm"><a href="#producto">Productos</a><a href="#materiales">Materiales</a><a href="#ocasiones">Ocasiones</a><a href="#historia">Nuestra historia</a></div></div><div><p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-gold">Información</p><div className="mt-5 flex flex-col gap-3 text-sm text-primary-foreground/75"><span>Envíos a todo México</span><span>Aviso de privacidad</span><span>Términos y condiciones</span></div></div></div><div className="flex flex-col gap-2 pt-6 text-[10px] uppercase tracking-[0.13em] text-primary-foreground/50 sm:flex-row sm:justify-between"><span>© 2026 Vitelia</span><span>Querétaro, México</span></div></div></footer>

      <Button asChild variant="luxury" size="icon" className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-whatsapp text-primary-foreground shadow-xl hover:bg-whatsapp/90" aria-label="Hablar con Vitelia por WhatsApp"><a href={whatsappUrl("Hola Vitelia, me interesa conocer más sobre los portabotellas VITELIA.")} target="_blank" rel="noreferrer"><span className="text-xl font-bold">W</span></a></Button>
    </main>
  );
}

function CartPanel({ cart, changeLine }: { cart: CollectionCartLine[]; changeLine: (id: string, amount: number) => void }) {
  const cartMessage = cartQuoteMessage(cart.map((line) => ({ name: selectionName(line), quantity: line.quantity })));
  return <SheetContent className="flex w-[92vw] flex-col border-l border-border p-0 sm:max-w-md">
    <SheetHeader className="border-b border-border px-6 py-6 text-left"><SheetTitle className="font-display text-3xl font-bold">Tu selección</SheetTitle><SheetDescription>Te compartimos precio y envío por WhatsApp</SheetDescription></SheetHeader>
    {cart.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center px-8 text-center"><ShoppingBag className="mb-5 text-gold" size={38} /><p className="font-display text-2xl font-bold">Tu carrito está vacío</p><p className="mt-2 text-sm text-muted-foreground">Añade un portabotellas para comenzar.</p></div> : <>
      <div className="flex-1 overflow-y-auto px-6 py-6">{cart.map((line) => <div key={line.id} className="grid grid-cols-[70px_minmax(0,1fr)_36px] gap-3 border-b border-border py-5"><img src={line.image} alt={line.name} className="h-24 w-[70px] bg-catalog object-contain" /><div><p className="text-sm font-semibold">{line.name}</p><p className="mt-1 text-xs text-muted-foreground">{line.color ?? "Color por confirmar"}</p><div className="mt-4 flex items-center gap-3"><Button variant="outline" size="icon" className="h-7 w-7" aria-label={`Restar ${line.name}`} onClick={() => changeLine(line.id, -1)}><Minus size={12} /></Button><span className="text-xs font-semibold">{line.quantity}</span><Button variant="outline" size="icon" className="h-7 w-7" aria-label={`Sumar ${line.name}`} onClick={() => changeLine(line.id, 1)}><Plus size={12} /></Button></div></div><Button variant="ghost" size="icon" onClick={() => changeLine(line.id, -line.quantity)} aria-label={`Eliminar ${line.name}`}><X size={15} /></Button></div>)}</div>
      <div className="border-t border-border bg-paper px-6 py-6"><p className="text-xs leading-6 text-muted-foreground">El color, el precio final y el envío se confirmarán por WhatsApp.</p><Button asChild variant="luxury" className="mt-5 w-full"><a href={whatsappUrl(cartMessage)} target="_blank" rel="noreferrer">Solicitar cotización por WhatsApp <ChevronRight /></a></Button></div>
    </>}
  </SheetContent>;
}
