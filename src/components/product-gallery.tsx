import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { productViews } from "@/lib/catalog";

export function ProductGallery() {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    api.on("select", update);
    return () => { api.off("select", update); };
  }, [api]);

  useEffect(() => {
    if (!api || !playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) api.scrollNext();
    }, 5000);
    return () => window.clearInterval(timer);
  }, [api, playing]);

  function choose(index: number) {
    setPlaying(false);
    api?.scrollTo(index);
  }

  return <div className="min-w-0">
    <Carousel setApi={setApi} opts={{ loop: true }} aria-label="Vistas del portabotellas" onPointerDown={() => setPlaying(false)}>
      <CarouselContent>{productViews.map((view) => <CarouselItem key={view.id}><img src={view.src} alt={`Portabotellas Distressed Brown · ${view.label}`} className="aspect-[3/4] max-h-[720px] w-full bg-catalog object-contain" loading={view.id === "front" ? "eager" : "lazy"} /></CarouselItem>)}</CarouselContent>
      <div className="flex h-14 items-center justify-between border-b border-border">
        <p className="text-xs text-muted-foreground"><span className="mr-3 font-semibold text-primary">{String(active + 1).padStart(2, "0")} / {String(productViews.length).padStart(2, "0")}</span>{productViews[active]?.label}</p>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" title="Vista anterior" aria-label="Vista anterior" onClick={() => choose((active + productViews.length - 1) % productViews.length)}><ArrowLeft /></Button>
          <Button variant="ghost" size="icon" title={playing ? "Pausar fotografías" : "Reproducir fotografías"} aria-label={playing ? "Pausar fotografías" : "Reproducir fotografías"} onClick={() => setPlaying(!playing)}>{playing ? <Pause /> : <Play />}</Button>
          <Button variant="ghost" size="icon" title="Vista siguiente" aria-label="Vista siguiente" onClick={() => choose((active + 1) % productViews.length)}><ArrowRight /></Button>
        </div>
      </div>
    </Carousel>
    <div className="mt-3 grid grid-cols-6 gap-1 sm:gap-2">{productViews.map((view, index) => <Button key={view.id} variant="outline" className={`h-auto min-w-0 overflow-hidden p-0 ${active === index ? "border-primary ring-1 ring-primary" : "border-transparent"}`} onClick={() => choose(index)} aria-label={`Ver ${view.label}`} aria-pressed={active === index} title={view.label}><img src={view.src} alt="" className="aspect-[3/4] w-full bg-catalog object-contain" loading="lazy" /></Button>)}</div>
  </div>;
}