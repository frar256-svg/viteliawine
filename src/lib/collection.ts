import double from "@/assets/coleccion-modelo-1.png.asset.json";
import four from "@/assets/coleccion-modelo-3.png.asset.json";
import spirits from "@/assets/coleccion-modelo-4.png.asset.json";
import cafe3 from "@/assets/individual-cafe-3.png.asset.json";
import cafe4 from "@/assets/individual-cafe-4.png.asset.json";
import cafeIzq from "@/assets/individual-cafe-34-izq.webp.asset.json";
import cafeDer from "@/assets/individual-cafe-34-der.webp.asset.json";
import cafeLogo from "@/assets/individual-cafe-logo.png.asset.json";
import claroFrente from "@/assets/individual-cafe-claro-frente.jpg.asset.json";
import claroIzq from "@/assets/individual-cafe-claro-34_izq.jpg.asset.json";
import claroDer from "@/assets/individual-cafe-claro-34_derecha.jpg.asset.json";
import claroEspalda from "@/assets/individual-cafe-claro-espalda.jpg.asset.json";
import claroLogo from "@/assets/individual-cafe-claro-logo.png.asset.json";
import verdeFrente from "@/assets/individual-verde-frente.jpg.asset.json";
import verdeIzq from "@/assets/individual-verde-34-izq.jpg.asset.json";
import verdeDer from "@/assets/individual-verde-34-der.jpg.asset.json";
import verdeEspalda from "@/assets/individual-verde-espalda.jpg.asset.json";
import verdeLogo from "@/assets/individual-verde-logo.png.asset.json";
import negroFrente from "@/assets/individual-negro-frente.jpg.asset.json";
import negroIzq from "@/assets/individual-negro-34-izq.jpg.asset.json";
import negroDer from "@/assets/individual-negro-34-der.jpg.asset.json";
import negroEspalda from "@/assets/individual-negro-espalda.jpg.asset.json";
import negroLogo from "@/assets/individual-negro-logo.png.asset.json";


export type ProductColor = { id: string; name: string; swatch: string; images: string[] };
export type CollectionProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  plannedColorCount: number;
  colors: ProductColor[];
};

export const collection: CollectionProduct[] = [
  { id: "individual-cuero", name: "Portabotellas individual de cuero", description: "Bolsa de cuero para una botella.", image: claroFrente.url, plannedColorCount: 4, colors: [
    { id: "cafe-claro", name: "Café claro", swatch: "bg-leather-cafe-claro", images: [claroFrente.url, claroIzq.url, claroDer.url, claroEspalda.url, claroLogo.url] },
    { id: "cafe", name: "Café", swatch: "bg-leather-cafe", images: [cafe3.url, cafeIzq.url, cafeDer.url, cafe4.url, cafeLogo.url] },
    { id: "verde", name: "Verde", swatch: "bg-leather-verde", images: [verdeFrente.url, verdeIzq.url, verdeDer.url, verdeEspalda.url, verdeLogo.url] },
    { id: "negro", name: "Negro", swatch: "bg-leather-negro", images: [negroFrente.url, negroIzq.url, negroDer.url, negroEspalda.url, negroLogo.url] },

  ] },
  { id: "doble", name: "Portabotellas doble", description: "Bolsa de cuero para dos botellas.", image: double.url, plannedColorCount: 4, colors: [] },
  { id: "cuatro", name: "Portabotellas para cuatro", description: "Bolsa de cuero para cuatro botellas de vino.", image: four.url, plannedColorCount: 4, colors: [] },
  { id: "destilados", name: "Portabotellas para destilados", description: "Bolsa de cuero para botellas de destilados, licores, champán y tequila.", image: spirits.url, plannedColorCount: 4, colors: [] },
];

export type CollectionCartLine = { id: string; name: string; image: string; quantity: number; color?: string | undefined };

export function selectionLine(product: CollectionProduct, quantity: number, color?: ProductColor): CollectionCartLine {
  return { id: `${product.id}:${color?.id ?? "por-confirmar"}`, name: product.name, image: color?.images[0] ?? product.image, quantity, color: color?.name };
}

export function addSelection(lines: CollectionCartLine[], incoming: CollectionCartLine): CollectionCartLine[] {
  const exists = lines.some((line) => line.id === incoming.id);
  return exists ? lines.map((line) => line.id === incoming.id ? { ...line, quantity: line.quantity + incoming.quantity } : line) : [...lines, incoming];
}

export function selectionName(line: CollectionCartLine) {
  return `${line.name} · ${line.color ?? "color por confirmar"}`;
}