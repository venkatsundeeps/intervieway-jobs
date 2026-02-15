export function cn(...items: Array<string | undefined | false>) {
  return items.filter(Boolean).join(" ");
}

export function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}
