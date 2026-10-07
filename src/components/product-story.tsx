import { PackageCheck, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import leather from "@/assets/close_up_cuero.jpg.asset.json";
import stitches from "@/assets/close_up_costuras.jpg.asset.json";
import metal from "@/assets/close_up_metalico.jpg.asset.json";
import handle from "@/assets/close_up_asa.jpg.asset.json";
import texture from "@/assets/close_up.jpg.asset.json";
import handleFront from "@/assets/close_up_aza.jpg.asset.json";
import craft from "@/assets/artesanal.jpg.asset.json";
import dinner from "@/assets/cena.jpg.asset.json";
import picnic from "@/assets/picnic.jpg.asset.json";
import restaurant from "@/assets/restaurante.jpg.asset.json";
import terrace from "@/assets/sunset.jpg.asset.json";
import gift from "@/assets/regalo.jpg.asset.json";
import giftSecond from "@/assets/regalo_2.jpg.asset.json";
import poster from "@/assets/poster.jpg.asset.json";

const details = [
  { asset: leather, title: "La piel", text: "Una textura con carácter propio." },
  { asset: stitches, title: "Las costuras", text: "Precisión en cada unión." },
  { asset: metal, title: "Los broches", text: "El acento metálico que completa la pieza." },
  { asset: handle, title: "El asa", text: "Piel, costura y herrajes en equilibrio." },
  { asset: texture, title: "El acabado", text: "Distressed Brown: cálido y rústico." },
  { asset: handleFront, title: "Los detalles", text: "Una silueta cuidada de principio a fin." },
];

export function ProductStory({ contactUrl }: { contactUrl: string }) {
  return <>
    <section className="border-y border-border bg-paper"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8"><p className="text-xs font-semibold uppercase text-wine">Diseñado para llevar vino con estilo</p><div className="mt-9 grid gap-8 md:grid-cols-3">{[{Icon: PackageCheck,title:"Una botella, una pieza",copy:"Una forma envolvente que acompaña la botella."},{Icon: ShieldCheck,title:"Llévalo con naturalidad",copy:"Asa integrada y una abertura que deja ver el vino."},{Icon:Truck,title:"Desde Querétaro",copy:"Envíos seguros a todo México."}].map(({Icon,title,copy})=><article key={title}><Icon className="mb-5 text-gold" strokeWidth={1.4}/><h3 className="text-xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>

    <section id="materiales" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><p className="text-xs font-semibold uppercase text-wine">Materiales · calidad · detalles</p><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">La diferencia está en el detalle.</h2><p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">La textura de la piel, el recorrido de las costuras y el contraste de los herrajes. Cada elemento aporta carácter a Vitelia.</p><div className="mt-12 grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{details.map(({asset,title,text})=><figure key={title}><img src={asset.url} alt={`Detalle Vitelia: ${title}`} loading="lazy" className="aspect-[3/4] w-full object-contain"/><figcaption className="mt-5"><h3 className="text-xl">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></figcaption></figure>)}</div></section>

    <section id="historia" className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20"><img src={craft.url} alt="Portabotellas Vitelia entre herramientas y materiales en un taller artesanal" className="aspect-[3/4] w-full object-contain" loading="lazy"/><div><p className="text-xs font-semibold uppercase text-gold">El valor de lo artesanal</p><h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Oficio, materia<br/>y carácter.</h2><p className="mt-8 text-sm leading-7 text-primary-foreground/80">Lo artesanal es dedicar atención a la materia: al corte de la piel, a cada costura y al ensamblado de cada detalle.</p><p className="mt-5 text-sm leading-7 text-primary-foreground/80">En Vitelia, esa sensibilidad se refleja en una pieza de piel genuina con personalidad propia. Un portabotellas para acompañar momentos y conservar historias.</p><p className="mt-9 text-xs uppercase text-gold">Querétaro, México</p></div></div></section>

    <section id="ocasiones" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28"><p className="text-xs font-semibold uppercase text-wine">One product, many stories.</p><h2 className="mt-4 text-4xl sm:text-5xl">Perfecto para…</h2><div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2">{[{asset:dinner,title:"Una cena especial",text:"La mesa está puesta. Lleva algo que merezca compartirse."},{asset:picnic,title:"Un picnic",text:"Una botella, aire libre y tiempo para disfrutar."},{asset:restaurant,title:"Tu restaurante favorito",text:"Un detalle con presencia para una buena mesa."},{asset:terrace,title:"Un brindis en la terraza",text:"Cuando el atardecer invita a quedarse un poco más."}].map(({asset,title,text})=><figure key={title}><img src={asset.url} alt={`Portabotellas Vitelia: ${title}`} className="aspect-[3/4] w-full object-contain" loading="lazy"/><figcaption className="mt-6"><h3 className="text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></figcaption></figure>)}</div></section>

    <section id="regalos" className="bg-paper"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8"><div className="mb-12 max-w-xl"><p className="text-xs font-semibold uppercase text-wine">El arte de regalar</p><h2 className="mt-4 text-4xl leading-tight sm:text-5xl">Un regalo para recordar.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Para quien aprecia un buen vino y los objetos que cuentan una historia. Consulta las opciones de presentación al confirmar tu pedido.</p></div><div className="grid gap-8 sm:grid-cols-2"><img src={gift.url} alt="Vitelia junto a una presentación de regalo" loading="lazy" className="aspect-[3/4] w-full object-contain"/><img src={giftSecond.url} alt="Portabotellas Vitelia y caja de regalo" loading="lazy" className="aspect-[3/4] w-full object-contain"/></div></div></section>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20"><img src={poster.url} alt="VITELIA — Carry wine beautifully. Portabotellas Distressed Brown" loading="lazy" className="aspect-[3/4] w-full object-contain"/><div><p className="text-xs font-semibold uppercase text-wine">Tu próxima historia</p><h2 className="mt-5 text-4xl leading-tight sm:text-5xl">Portabotellas Vitelia</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Distressed Brown. Una pieza con carácter para una botella especial.</p><Button asChild variant="luxury" size="xl" className="mt-8"><a href={contactUrl} target="_blank" rel="noreferrer">Comprar o cotizar por WhatsApp</a></Button></div></section>
  </>;
}