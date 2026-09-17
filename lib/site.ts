export const SITE = {
  name: "Kalyana.kuri",
  tagline: "Your Wedding. Your Story. One Beautiful Link.",
  description: "Digital invitations & interactive experiences for life's special moments.",
};

// Digits only, with country code, e.g. 91XXXXXXXXXX. Set NEXT_PUBLIC_WHATSAPP_NUMBER
// in .env.local / your hosting provider's environment settings.
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

export const WHATSAPP_MESSAGE =
  "Hi Kalyana.kuri! I'm interested in creating a digital invitation.";

export const WHATSAPP_PARTNER_MESSAGE =
  "Hi Kalyana.kuri! I'm a wedding professional and I'd like to know more about your partner programme.";

export function whatsappUrl(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const INSTAGRAM_HANDLE = "kalyana.kuri";

export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;
