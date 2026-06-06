// Generates public/og.png (1200×630) — the social share card.
//
// Run with: npm run og
// Reads the brand fonts straight from the @fontsource packages (static .woff,
// which satori can parse — it does not support variable fonts).
// Regenerate whenever the hero title or branding changes.

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const fontFile = (pkg, file) =>
  join(root, "node_modules", pkg, "files", file);

const FONTS = {
  bricolage: fontFile(
    "@fontsource/bricolage-grotesque",
    "bricolage-grotesque-latin-600-normal.woff",
  ),
  instrumentItalic: fontFile(
    "@fontsource/instrument-serif",
    "instrument-serif-latin-400-italic.woff",
  ),
  jetbrains: fontFile(
    "@fontsource/jetbrains-mono",
    "jetbrains-mono-latin-400-normal.woff",
  ),
};

// Module accent colors, in course order — mirrors src/styles/global.css.
const dotColors = [
  "#d97706", "#4c6ef5", "#e4572e", "#2563eb", "#f0db4f",
  "#3178c6", "#61dafb", "#22c55e", "#c084fc",
];

const INK = "#0a0a0b";
const MUTE = "#6b6b72";
const LINE = "#e8e7e3";
const CANVAS = "#ffffff";

function el(type, style, children) {
  return { type, props: { style, children } };
}

const tree = el(
  "div",
  {
    width: 1200,
    height: 630,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 72,
    backgroundColor: CANVAS,
    color: INK,
    fontFamily: "Bricolage Grotesque",
    border: `1px solid ${LINE}`,
  },
  [
    // Top: logo mark + wordmark
    el("div", { display: "flex", alignItems: "center", gap: 14 }, [
      el(
        "div",
        {
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
          borderRadius: 10,
          backgroundColor: INK,
          color: CANVAS,
          fontFamily: "JetBrains Mono",
          fontSize: 19,
        },
        [
          "af",
          el("div", {
            position: "absolute",
            top: -3,
            right: -3,
            width: 12,
            height: 12,
            borderRadius: 12,
            backgroundColor: "#61dafb",
            border: `2px solid ${CANVAS}`,
          }),
        ],
      ),
      el(
        "div",
        { fontFamily: "JetBrains Mono", fontSize: 20, color: MUTE, letterSpacing: 1 },
        "aprenda frontend",
      ),
    ]),

    // Middle: title + subtitle
    el("div", { display: "flex", flexDirection: "column" }, [
      el(
        "div",
        {
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          fontSize: 86,
          fontWeight: 600,
          lineHeight: 1.02,
          letterSpacing: -2.5,
        },
        [
          el("span", {}, "Aprenda "),
          el(
            "span",
            { fontFamily: "Instrument Serif", fontStyle: "italic", fontWeight: 400 },
            " frontend,",
          ),
        ],
      ),
      el(
        "div",
        { fontSize: 86, fontWeight: 600, lineHeight: 1.02, letterSpacing: -2.5 },
        "do começo ao React.",
      ),
      el(
        "div",
        { marginTop: 34, fontSize: 27, lineHeight: 1.45, color: MUTE, maxWidth: 820 },
        "Curso introdutório de desenvolvimento frontend, em português — da web ao React, um módulo de cada vez.",
      ),
    ]),

    // Bottom: module dots + url
    el("div", { display: "flex", alignItems: "center", justifyContent: "space-between" }, [
      el(
        "div",
        { display: "flex", alignItems: "center", gap: 10 },
        dotColors.map((c) =>
          el("div", { width: 14, height: 14, borderRadius: 14, backgroundColor: c }),
        ),
      ),
      el(
        "div",
        { fontFamily: "JetBrains Mono", fontSize: 19, color: MUTE },
        "aprenda-frontend.tiagocastro.dev",
      ),
    ]),
  ],
);

const [bricolage, instrumentItalic, jetbrains] = await Promise.all([
  readFile(FONTS.bricolage),
  readFile(FONTS.instrumentItalic),
  readFile(FONTS.jetbrains),
]);

const svg = await satori(tree, {
  width: 1200,
  height: 630,
  fonts: [
    { name: "Bricolage Grotesque", data: bricolage, weight: 600, style: "normal" },
    { name: "Instrument Serif", data: instrumentItalic, weight: 400, style: "italic" },
    { name: "JetBrains Mono", data: jetbrains, weight: 400, style: "normal" },
  ],
});

const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } })
  .render()
  .asPng();

const out = join(root, "public", "og.png");
await writeFile(out, png);
console.log(`✓ Wrote ${out} (${(png.length / 1024).toFixed(0)} KB)`);
