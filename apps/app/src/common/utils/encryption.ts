// Source: https://github.com/lucia-auth/example-nextjs-email-password-2fa/blob/main/lib/server/encryption.ts

import { env } from "@/env";
import { DynamicBuffer } from "@oslojs/binary";
import {
  createCipheriv,
  createDecipheriv,
  getRandomValues,
  type CipherGCMTypes,
} from "node:crypto";

const ALGORITHM: CipherGCMTypes = "aes-256-gcm";
const KEY = Buffer.from(env.ENCRYPTION_KEY, "base64");

export function encrypt(data: Uint8Array): Uint8Array {
  const iv = new Uint8Array(16);
  getRandomValues(iv);

  const cipher = createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = new DynamicBuffer(0);
  encrypted.write(iv);
  encrypted.write(cipher.update(data));
  encrypted.write(cipher.final());
  encrypted.write(cipher.getAuthTag());

  return encrypted.bytes();
}

export function encryptString(data: string): Uint8Array {
  return encrypt(new TextEncoder().encode(data));
}

export function decrypt(encrypted: Uint8Array): Uint8Array {
  if (encrypted.byteLength < 33) throw new Error("Invalid data");

  const decipher = createDecipheriv(ALGORITHM, KEY, encrypted.slice(0, 16));
  decipher.setAuthTag(encrypted.slice(encrypted.byteLength - 16));

  const decrypted = new DynamicBuffer(0);
  decrypted.write(
    decipher.update(encrypted.slice(16, encrypted.byteLength - 16)),
  );
  decrypted.write(decipher.final());

  return decrypted.bytes();
}

export function decryptToString(data: Uint8Array): string {
  return new TextDecoder().decode(decrypt(data));
}
