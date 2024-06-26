export const secondsToDtfmt = (seconds: number) => {
    const days = Math.floor(seconds / (3600 * 24));
    seconds %= 3600 * 24;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Prepare the formatted string
    const parts = [];
    if (days > 0) {
        parts.push(days + "d");
    }
    if (hours > 0) {
        parts.push(hours + "h");
    }
    if (minutes > 0) {
        parts.push(minutes + "m");
    }
    if (seconds > 0 || parts.length === 0) {
        parts.push(seconds + "s");
    }

    return parts.join(" ");
}
