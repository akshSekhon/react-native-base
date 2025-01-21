String.prototype.opacity = function (newOpacity: number): string {
    // Regex for RGBA or RGB
    const rgbaRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*([01]?\.?\d*))?\s*\)$/;
    // Regex for Hex (3, 4, 6, or 8 characters)
    const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const shortHexRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;

    if (rgbaRegex.test(this)) {
        // Handle RGBA or RGB
        const match = this.match(rgbaRegex);
        if (!match) {
            throw new Error("Invalid RGBA or RGB color format");
        }
        const r = match[1];
        const g = match[2];
        const b = match[3];
        const a = newOpacity;

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    } else if (hexRegex.test(this) || shortHexRegex.test(this)) {
        // Handle Hex and short Hex
        let match;
        if (shortHexRegex.test(this)) {
            match = this.match(shortHexRegex);
            match = match!.slice(1).map((x) => x + x); // Expand short hex to full hex
        } else {
            match = this.match(hexRegex);
        }
        const r = parseInt(match![1], 16);
        const g = parseInt(match![2], 16);
        const b = parseInt(match![3], 16);
        const a = Math.round(newOpacity * 255).toString(16).padStart(2, '0');

        return `#${match![1]}${match![2]}${match![3]}${a}`;
    } else {
        throw new Error("Invalid color format. Please use a valid hex or RGBA color.");
    }
};

String.prototype.truncate = function (startLength: number = 6, endLength: number = 4): string {
    const text = this.toString(); // Ensure the string is properly referenced
    if (text.length <= startLength + endLength) return text;
    return `${text.slice(0, startLength)}....${text.slice(-endLength)}`;
};
