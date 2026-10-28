import double from "@/assets/coleccion-modelo-1.png.asset.json";
import individual from "@/assets/coleccion-modelo-2.png.asset.json";
import four from "@/assets/coleccion-modelo-3.png.asset.json";
import spirits from "@/assets/coleccion-modelo-4.png.asset.json";
import cafe1 from "@/assets/individual-cafe-1.png.asset.json";
import cafe2 from "@/assets/individual-cafe-2.png.asset.json";
import cafe3 from "@/assets/individual-cafe-3.png.asset.json";
import cafe4 from "@/assets/individual-cafe-4.png.asset.json";

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
  { id: "individual-cuero", name: "Portabotellas individual de cuero", description: "Bolsa de cuero para una botella.", image: cafe3.url, plannedColorCount: 4, colors: [
    { id: "cafe", name: "Café", swatch: "bg-leather-cafe", images: [cafe3.url, cafe4.url, cafe2.url, cafe1.url] },
  ] },
  { id: "doble", name: "Portabotellas doble", description: "Bolsa de cuero para dos botellas.", image: double.url, plannedColorCount: 4, colors: [] },
  { id: "porta-botella", name: "Bolsa de vino de cuero", description: "Bolsa de vino de cuero, porta botella.", image: individual.url, plannedColorCount: 4, colors: [] },
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