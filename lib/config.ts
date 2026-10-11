export const SITE = {
  name: "Multi Equipment Trade and Services P. Ltd.",
  title: "Free 5-Litre Oxygen Concentrator Consultation",
  description:
    "Book a free one-to-one call about your 5-litre oxygen concentrator. Tell us the symptoms. We'll tell you honestly if it needs service.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "9779841449957").replace(/\D/g, ""),
  vimeoUrl: process.env.NEXT_PUBLIC_VIMEO_URL ?? "https://vimeo.com/76979871",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",
  // Edit this text if you want a different WhatsApp opening message.
  whatsappMessage:
    "Hi, I just submitted the form for the Free Oxygen Concentrator Consultation. I'd like to know the next steps.",
};

/** Turns a normal Vimeo link into a player embed URL. Returns null if it can't read an ID. */
export function vimeoEmbedUrl(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)(?:\/([a-zA-Z0-9]+))?/);
  if (!m) return null;
  const hash = m[2] ? `&h=${m[2]}` : "";
  return `https://player.vimeo.com/video/${m[1]}?autoplay=0${hash}`;
}
