/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { cartQuoteMessage, generalQuoteMessage, quoteMessage, whatsappNumber, whatsappUrl } from "./quote";

describe("Cotización por WhatsApp", () => {
  test("abre el número solicitado con el mensaje codificado", () => {
    expect(whatsappUrl("Hola Vitelia, quisiera cotizar")).toBe(
      `https://wa.me/${whatsappNumber}?text=Hola%20Vitelia%2C%20quisiera%20cotizar`,
    );
  });

  test("ningún mensaje de cotización muestra un precio", () => {
    const messages = [
      generalQuoteMessage,
      quoteMessage(3, "Distressed Brown"),
      cartQuoteMessage([{ name: "Distressed Brown", quantity: 2 }]),
      cartQuoteMessage([]),
    ];
    for (const message of messages) {
      expect(message).not.toMatch(/\$|MXN|200/);
    }
  });

  test("la cotización del carrito lista las cantidades seleccionadas", () => {
    expect(cartQuoteMessage([{ name: "Distressed Brown", quantity: 2 }])).toBe(
      "Hola Vitelia, quiero cotizar: 2 Distressed Brown. ¿Me comparten precio y envío?",
    );
  });
});
