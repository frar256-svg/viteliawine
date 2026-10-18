export const whatsappNumber = "5215563489801";

export const generalQuoteMessage = "Hola Vitelia, quisiera cotizar sus portabotellas de piel.";

export function whatsappUrl(message: string) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function quoteMessage(quantity: number, variantName: string) {
  return `Hola Vitelia, quiero cotizar ${quantity} portabotellas en acabado ${variantName}. ¿Me comparten precio y envío?`;
}

export function cartQuoteMessage(items: { name: string; quantity: number }[]) {
  return items.length
    ? `Hola Vitelia, quiero cotizar: ${items.map((item) => `${item.quantity} ${item.name}`).join(", ")}. ¿Me comparten precio y envío?`
    : "Hola Vitelia, quisiera información sobre sus portabotellas.";
}
