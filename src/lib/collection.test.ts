/// <reference types="bun" />
import { expect, test } from "bun:test";
import { addSelection, collection, selectionLine, selectionName } from "./collection";

test("el portabotellas individual aparece antes del doble", () => {
  expect(collection.map((product) => product.id)).toEqual(["individual-cuero", "doble", "cuatro", "destilados"]);
});
test("cada uno de los cuatro modelos contempla cuatro colores", () => {
  expect(collection.map((product) => product.plannedColorCount)).toEqual([4, 4, 4, 4]);
});
test("los cuatro colores del individual tienen cinco fotos cada uno", () => {
  const colors = collection.flatMap((product) => product.colors.map((color) => [product.id, color.name, color.images.length]));
  expect(colors).toEqual([
    ["individual-cuero", "Café claro", 5],
    ["individual-cuero", "Café", 5],
    ["individual-cuero", "Verde", 5],
    ["individual-cuero", "Negro", 5],
  ]);
});
test("cada color del individual abre con su foto frontal y cierra con la del logo", () => {
  const individual = collection.find((product) => product.id === "individual-cuero");
  if (!individual) throw new Error("Falta el portabotellas individual");
  expect(individual.colors.map((color) => [color.name, color.images[0]!.includes("-frente"), color.images[4]!.includes("-logo")])).toEqual([
    ["Café claro", true, true],
    ["Café", true, true],
    ["Verde", true, true],
    ["Negro", true, true],
  ]);
});

test("el carrito conserva los modelos por separado y suma el mismo modelo", () => {
  const double = collection.find((product) => product.id === "doble");
  const individual = collection.find((product) => product.id === "individual-cuero");
  if (!double || !individual) throw new Error("Faltan modelos");
  let cart = addSelection([], selectionLine(double, 2));
  cart = addSelection(cart, selectionLine(individual, 1));
  cart = addSelection(cart, selectionLine(double, 3));
  expect(cart.map((line) => [line.name, line.quantity])).toEqual([["Portabotellas doble", 5], ["Portabotellas individual de cuero", 1]]);
  const first = cart[0];
  if (!first) throw new Error("Carrito vacío");
  expect(selectionName(first)).toBe("Portabotellas doble · color por confirmar");
});