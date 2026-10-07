/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { variants, productViews } from "./catalog";

describe("Catálogo solicitado", () => {
  test("ofrece únicamente Distressed Brown", () => {
    expect(variants.map((variant) => variant.name)).toEqual(["Distressed Brown"]);
  });
  test("mantiene el orden solicitado de las siete vistas", () => {
    expect(productViews.map((view) => view.id)).toEqual(["front", "right", "left", "back-angle", "back", "top", "base"]);
  });
});