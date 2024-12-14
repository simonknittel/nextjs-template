import { encodeBase32 } from "@oslojs/encoding";
import { createTOTPKeyURI } from "@oslojs/otp";
import { renderSVG } from "uqr";

export const createTotpKey = (accountName: string) => {
  const key = new Uint8Array(20);
  crypto.getRandomValues(key);

  const base32EncodedKey = encodeBase32(key);

  const keyUri = createTOTPKeyURI("Next.js Template", accountName, key, 30, 6);
  const qrCode = renderSVG(keyUri);

  return {
    base32EncodedKey,
    qrCode,
  };
};
