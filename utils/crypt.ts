import { Aes } from "$crypto/aes.ts";
import { Cbc, Padding } from "$crypto/block-modes.ts";
import { decode, encode } from "$std/encoding/base64.ts";

import "$std/dotenv/load.ts"

export function encrypt<T>(src: T) {
  const te = new TextEncoder();
  const key = te.encode(Deno.env.get("ENCRYPTION_KEY"));
  const data = te.encode(JSON.stringify(src));
  const iv = crypto.getRandomValues(new Uint8Array(16));
  const encrypted = new Cbc(Aes, key, iv, Padding.PKCS7).encrypt(data);
  return encode(Uint8Array.from([...encrypted, ...iv]));
}

export function decrypt<T>(str: string) {
  const key = new TextEncoder().encode(Deno.env.get("ENCRYPTION_KEY"));
  const decoded = decode(str);
  const iv = decoded.slice(-16);
  const encrypted = decoded.slice(0, -16);
  const data = new Cbc(Aes, key, iv, Padding.PKCS7).decrypt(encrypted);
  return JSON.parse(new TextDecoder().decode(data)) as T;
}
