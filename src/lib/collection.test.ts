/// <reference types="bun" />
import { expect, test } from "bun:test";
import { addSelection, collection, selectionLine, selectionName } from "./collection";

test("el portabotellas individual aparece antes del doble", () => {
  expect(collection.map((product) => product.id)).toEqual(["individual-cuero", "doble", "porta-botella", "cuatro", "destilados"]);
});
test("cada uno de los cuatro modelos contempla cuatro colores", () => {
  expect(collection.map((product) => product.plannedColorCount)).toEqual([4, 4, 4, 4, 4]);
});
test("Café es el segundo color confirmado del individual y tiene cuatro fotos", () => {
  const colors = collection.flatMap((product) => product.colors.map((color) => [product.id, color.name, color.images.length]));
  expect(colors).toEqual([["individual-cuero", "Café", 4]]);
});
test("el carrito conserva los modelos por separado y suma el mismo modelo", () => {
  const double = collection.find((product) => product.id === "doble");
  const individual = collection.find((product) => product.id === "porta-botella");
  if (!double || !individual) throw new Error("Faltan modelos");
  let cart = addSelection([], selectionLine(double, 2));
  cart = addSelection(cart, selectionLine(individual, 1));
  cart = addSelection(cart, selectionLine(double, 3));
  expect(cart.map((line) => [line.name, line.quantity])).toEqual([["Portabotellas doble", 5], ["Bolsa de vino de cuero", 1]]);
  expect(selectionName(cart[0]!)).toBe("Portabotellas doble · color por confirmar");
});