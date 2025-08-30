import crypto from "crypto";
export function createVerifyToken(hours = 24) {
  const token = crypto.randomBytes(32).toString("hex");
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000);
  return { token, hash, expires };
}
export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
