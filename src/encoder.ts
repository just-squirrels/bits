/** Basic single direction encoding by alphabet map */
export function encode(buffer: Buffer, alpha: string | string[]) {
    const base = alpha.length;
    let num = 0;
    let out = "";
    for (const byte of buffer) {
        num = (num << 8) + byte;
        while (num >= base) {
            out = out + alpha[num % base];
            num = Math.floor(num / base);
        }
    }
    return out + alpha[num];
}

export function toBase62(buffer: Buffer) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return encode(buffer, alpha);
}

export function toBase58(buffer: Buffer) {
    const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
    return encode(buffer, alpha);
}

export function toBase16(buffer: Buffer) {
    const alpha = "0123456789abcdef";
    return encode(buffer, alpha);
}

// export default { encode, toBase58, toBase62 };
