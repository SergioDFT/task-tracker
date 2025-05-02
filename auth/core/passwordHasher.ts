export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder()

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password.normalize()),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  )

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    64 * 8
  )

  return Buffer.from(derivedBits).toString("hex").normalize()
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string
  salt: string
  hashedPassword: string
}): Promise<boolean> {
  const inputHashed = await hashPassword(password, salt)
  if (inputHashed.length !== hashedPassword.length) return false

  let result = 0
  for (let i = 0; i < inputHashed.length; i++) {
    result |= inputHashed.charCodeAt(i) ^ hashedPassword.charCodeAt(i)
  }

  return result === 0
}

export function generateSalt(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .normalize()
}