declare global {
    interface String {
        opacity(newOpacity: number): string;
        truncate(startLength?: number, endLength?: number);
    }
}

export { };