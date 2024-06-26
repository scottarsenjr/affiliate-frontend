export const removeNullValues = (obj: { [key: string]: any }) => {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
};