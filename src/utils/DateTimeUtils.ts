const FORMAT_LOCALE = "cs-CZ"

export const convertTimestamp = (timestamp: number): Date => {
    return new Date(timestamp * 1000);
}

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString(FORMAT_LOCALE);
}

export const formatTimestamp = (timestamp: number): string => {
    return formatDate(convertTimestamp(timestamp));
}