export function memoize<R, P extends any[]>(
    fn: (...args: P) => R,
    hasher: (args: [...P]) => any = JSON.stringify)
: (...args: P) => R {
    const m = new Map();
    return (...args: P): R => {
        // Arrays can't be keyed off of in Map, but strings sure can
        const key = hasher(args);
        if(m.has(key)) return m.get(key);
        const r = fn(...args);
        m.set(key, r);
        return r;
    };
}
