export const formatIsoDateString = (isoDateString: string) => {
    const date = new Date(isoDateString);
    return date.toLocaleString();
};
