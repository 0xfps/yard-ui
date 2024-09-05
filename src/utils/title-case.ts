/**
 * Converts a string to its title case variant.
 * 
 * @param s String. 
 */
export function titleCase(s: string): string {
    s = s.replace(/ /g, "")
    if (s.length == 0) return ""
    return s.length == 1 ? s.toUpperCase() : `${s[0].toUpperCase()}${s.substring(1, s.length)}`
}