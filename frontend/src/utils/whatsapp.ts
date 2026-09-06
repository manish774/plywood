export function buildItemWhatsAppUrl(
  item: { name: string; price?: number | null },
  whatsappNumber: string,
): string {
  const priceLine = typeof item.price === "number" ? ` (₹${item.price.toFixed(2)} per sheet)` : "";
  const message = `Hi, I'm interested in *${item.name}*${priceLine}.\n${window.location.href}\n\nCan you share more details?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}
