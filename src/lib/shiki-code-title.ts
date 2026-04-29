import type { ShikiTransformer } from "shiki";

export const transformerCodeTitle: ShikiTransformer = {
  name: "code-title",
  pre(node) {
    const meta = (this.options.meta as { __raw?: string } | undefined)?.__raw;
    if (!meta) return;
    const match = meta.match(/title="([^"]+)"/);
    if (!match) return;
    node.properties = node.properties ?? {};
    node.properties["data-title"] = match[1];
  },
};
