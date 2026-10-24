/// <reference types="bun" />
import { expect, test } from "bun:test";
import { addSelection, collection, selectionLine, selectionName } from "./collection";

test("la colección contiene los cuatro modelos del documento", () => {
  expect(collection.map((product) => product.id)).toEqual(["doble", "individual", "cuatro", "destilados"]);
});
test("cada uno de los cuatro modelos contempla cuatro colores", () => {
  expect(collection.map((product) => product.plannedColorCount)).toEqual([4, 4, 4, 4]);
});
test("no publica variantes cuyos nombres no han sido confirmados", () => {
  expect(collection.flatMap((product) => product.colors)).toEqual([]);
});
test("el carrito conserva los modelos por separado y suma el mismo modelo", () => {
  const double = collection.find((product) => product.id === "doble");
  const individual = collection.find((product) => product.id === "individual");
  if (!double || !individual) throw new Error("Faltan modelos");
  let cart = addSelection([], selectionLine(double, 2));
  cart = addSelection(cart, selectionLine(individual, 1));
  cart = addSelection(cart, selectionLine(double, 3));
  expect(cart.map((line) => [line.name, line.quantity])).toEqual([["Portabotellas doble", 5], ["Portabotellas individual", 1]]);
  expect(selectionName(cart[0])).toBe("Portabotellas doble · color por confirmar");
});