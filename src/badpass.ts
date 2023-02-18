import { createHmac, randomBytes } from "node:crypto";

// These are just toy methods for password hashing; you probably
// shouldn't use these in real projects

const ALGO = "sha384";

function genKey(bytes = 32) {
    return randomBytes(bytes).toString("base64").replace(/=/g, "");
}

function calculateDigest(password: string, key: string) {
    return createHmac(ALGO, key).update(password).digest("base64").replace(/=/g, "");
}

/**
 * Generate a salted hash using HMAC and SHA-384
 * @param password Password to hash
 * @returns Complex hash string, salt included
 */
export function hashPass(password: string) {
    const key = genKey();
    const digest = calculateDigest(password, key);
    return `${key}$${digest}`;
}

/**
 * Compare a password to a complex hash 
 * @param password Password to check
 * @param hash Hash to compare against
 * @returns True if the password reproduces the hash
 */
export function checkPass(password: string, hash: string) {
    const [key, digest] = hash.split("$");
    return digest === calculateDigest(password, key);
}