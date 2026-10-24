import double from "@/assets/coleccion-modelo-1.png.asset.json";
import individual from "@/assets/coleccion-modelo-2.png.asset.json";
import four from "@/assets/coleccion-modelo-3.png.asset.json";
import spirits from "@/assets/coleccion-modelo-4.png.asset.json";

export type ProductColor = { id: string; name: string; swatch: string; image?: string };
export type CollectionProduct = {
  id: string;
  name: string;
  description: string;
  image: string;
  plannedColorCount: number;
  colors: ProductColor[];
};

export const collection: CollectionProduct[] = [
  { id: "doble", name: "Portabotellas doble", description: "Bolsa de cuero para dos botellas.", image: double.url, plannedColorCount: 4, colors: [] },
  { id: "individual", name: "Portabotellas individual", description: "Bolsa de cuero para una botella de vino.", image: individual.url, plannedColorCount: 4, colors: [] },
  { id: "cuatro", name: "Portabotellas para cuatro", description: "Bolsa de cuero para cuatro botellas de vino.", image: four.url, plannedColorCount: 4, colors: [] },
  { id: "destilados", name: "Portabotellas para destilados", description: "Bolsa de cuero para botellas de destilados, licores, champán y tequila.", image: spirits.url, plannedColorCount: 4, colors: [] },
];

export type CollectionCartLine = { id: string; name: string; image: string; quantity: number; color?: string };

export function selectionLine(product: CollectionProduct, quantity: number, color?: ProductColor): CollectionCartLine {
  return { id: `${product.id}:${color?.id ?? "por-confirmar"}`, name: product.name, image: color?.image ?? product.image, quantity, color: color?.name };
}

export function addSelection(lines: CollectionCartLine[], incoming: CollectionCartLine): CollectionCartLine[] {
  const exists = lines.some((line) => line.id === incoming.id);
  return exists ? lines.map((line) => line.id === incoming.id ? { ...line, quantity: line.quantity + incoming.quantity } : line) : [...lines, incoming];
}

export function selectionName(line: CollectionCartLine) {
  return `${line.name} · ${line.color ?? "color por confirmar"}`;
}