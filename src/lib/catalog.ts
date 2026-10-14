import front from "@/assets/hero_2.jpg.asset.json";
import right from "@/assets/3_cuartos_derecha.jpg.asset.json";
import left from "@/assets/3_cuartos_izquierda.jpg.asset.json";
import backAngle from "@/assets/vista_trasera_3_cuartos.jpg.asset.json";
import back from "@/assets/vista_trasera.jpg.asset.json";
import top from "@/assets/vista_superior.jpg.asset.json";

export const variants = [
  { id: "distressed", name: "Distressed Brown", note: "Original · cálido y rústico", swatch: "bg-leather-distressed" },
] as const;

export const productViews = [
  { id: "front", label: "Frontal", src: front.url },
  { id: "right", label: "3/4 derecha", src: right.url },
  { id: "left", label: "3/4 izquierda", src: left.url },
  { id: "back-angle", label: "3/4 espalda", src: backAngle.url },
  { id: "back", label: "Espalda", src: back.url },
  { id: "top", label: "Superior", src: top.url },
] as const;