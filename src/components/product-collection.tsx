import { useState } from "react";
import { ArrowUpRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { collection, selectionLine, selectionName, type CollectionProduct, type CollectionCartLine, type ProductColor } from "@/lib/collection";
import { cartQuoteMessage, whatsappUrl } from "@/lib/quote";

function Colors({ product, selected, onSelect }: { product: CollectionProduct; selected?: ProductColor | undefined; onSelect: (color: ProductColor) => void }) {
  return <div className="mt-5 border-t border-border pt-4">
    <p className="text-xs font-semibold">Colores disponibles{product.colors.length ? ` · ${product.colors.length} de ${product.plannedColorCount}` : ""}</p>
    {product.colors.length ? <div className="mt-3 flex flex-wrap items-center gap-3">{product.colors.map((color) => <Button key={color.id} variant="outline" size="icon" aria-label={`Elegir ${color.name} para ${product.name}`} title={color.name} aria-pressed={selected?.id === color.id} onClick={() => onSelect(color)} className={`h-8 w-8 rounded-full border-border ${color.swatch} ${selected?.id === color.id ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`} />)}{selected && <span className="text-xs text-muted-foreground">{selected.name}</span>}</div> : <p className="mt-2 text-xs text-muted-foreground">Consulta los colores por WhatsApp.</p>}
  </div>;
}

function ProductCard({ product, onOpen }: { product: CollectionProduct; onOpen: (product: CollectionProduct, color?: ProductColor) => void }) {
  const [color, setColor] = useState<ProductColor | undefined>(product.colors[0]);
  return <article className="min-w-0">
    <Button variant="ghost" className="block h-auto w-full overflow-hidden rounded-sm p-0 hover:bg-catalog" aria-label={`Ver ${product.name}`} onClick={() => onOpen(product, color)}>
      <img src={color?.images[0] ?? product.image} alt={product.name} loading="lazy" className="aspect-[4/5] w-full bg-catalog object-contain" />
    </Button>
    <div className="mt-5 flex items-start justify-between gap-3"><h3 className="text-xl leading-snug">{product.name}</h3><Button variant="ghost" size="icon" className="shrink-0" aria-label={`Detalles de ${product.name}`} title="Ver modelo" onClick={() => onOpen(product, color)}><ArrowUpRight /></Button></div>
    <p className="mt-2 text-sm leading-6 text-muted-foreground">{product.description}</p>
    <Colors product={product} selected={color} onSelect={setColor} />
    <Button variant="luxuryOutline" className="mt-5 w-full" onClick={() => onOpen(product, color)}>Ver modelo <ArrowUpRight /></Button>
  </article>;
}

export function ProductCollection({ onAdd }: { onAdd: (line: CollectionCartLine) => void }) {
  const [product, setProduct] = useState<CollectionProduct>();
  const [color, setColor] = useState<ProductColor>();
  const [photo, setPhoto] = useState(0);
  const [quantity, setQuantity] = useState(1);
  function open(next: CollectionProduct, nextColor?: ProductColor) { setProduct(next); setColor(nextColor ?? next.colors[0]); setPhoto(0); setQuantity(1); }
  function chooseColor(next: ProductColor) { setColor(next); setPhoto(0); }
  const photos = color?.images.length ? color.images : product ? [product.image] : [];
  const line = product ? selectionLine(product, quantity, color) : undefined;
  return <section id="producto" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
    <p className="text-xs font-semibold uppercase text-wine">Colección Vitelia</p>
    <h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Nuestros productos</h2>
    <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">Bolsas portabotellas de cuero para el vino, los destilados y los momentos que compartes.</p>
    <div className="mt-12 grid items-start gap-x-7 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">{collection.map((item) => <ProductCard key={item.id} product={item} onOpen={open} />)}</div>
    <Sheet open={Boolean(product)} onOpenChange={(isOpen) => { if (!isOpen) setProduct(undefined); }}>
      <SheetContent className="w-[94vw] overflow-y-auto px-5 py-8 sm:max-w-xl sm:px-8">
        {product && line && <><SheetHeader className="pr-6 text-left"><SheetTitle className="font-display text-2xl">{product.name}</SheetTitle><SheetDescription>{product.description}</SheetDescription></SheetHeader>
          <img src={photos[photo] ?? line.image} alt={`${product.name}${color ? ` en color ${color.name}` : ""}, fotografía ${photo + 1}`} className="mt-6 aspect-[4/5] max-h-[460px] w-full bg-catalog object-contain" />
          {photos.length > 1 && <div className="mt-3 grid grid-cols-4 gap-2">{photos.map((src, index) => <Button key={src} variant="outline" aria-label={`Ver fotografía ${index + 1} de ${color?.name ?? product.name}`} aria-pressed={photo === index} onClick={() => setPhoto(index)} className={`h-auto overflow-hidden p-0 ${photo === index ? "border-primary ring-1 ring-primary" : "border-transparent"}`}><img src={src} alt="" className="aspect-square w-full bg-catalog object-contain" /></Button>)}</div>}
          <Colors product={product} selected={color} onSelect={chooseColor} />
          <div className="mt-6 flex items-center justify-between border-y border-border py-4"><span className="text-sm">Cantidad</span><div className="grid grid-cols-[36px_36px_36px] items-center"><Button variant="ghost" size="icon" aria-label="Restar cantidad del modelo" disabled={quantity === 1} onClick={() => setQuantity((n) => Math.max(1, n - 1))}><Minus /></Button><span className="text-center text-sm">{quantity}</span><Button variant="ghost" size="icon" aria-label="Sumar cantidad del modelo" onClick={() => setQuantity((n) => n + 1)}><Plus /></Button></div></div>
          <Button variant="luxury" className="mt-6 w-full" onClick={() => { onAdd(line); setProduct(undefined); }}><ShoppingBag /> Agregar al carrito</Button>
          <Button asChild variant="luxuryOutline" className="mt-3 w-full"><a href={whatsappUrl(cartQuoteMessage([{ name: selectionName(line), quantity }]))} target="_blank" rel="noreferrer">Cotizar por WhatsApp <ArrowUpRight /></a></Button>
          <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5 text-xs">{["Alto", "Ancho", "Profundidad"].map((label) => <div key={label}><dt className="font-semibold">{label}</dt><dd className="mt-1 text-muted-foreground">Por confirmar</dd></div>)}</dl>
          <p className="mt-4 text-xs leading-6 text-muted-foreground">Confirmamos el color, el precio y el envío por WhatsApp.</p>
        </>}
      </SheetContent>
    </Sheet>
  </section>;
}