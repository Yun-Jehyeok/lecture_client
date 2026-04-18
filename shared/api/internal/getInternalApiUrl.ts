import "server-only";
import { headers } from "next/headers";

export const getInternalApiUrl = async (path: string) => {
    const headerStore = await headers();
    const host = headerStore.get("x-forwarded-host") || headerStore.get("host");
    const protocol =
        headerStore.get("x-forwarded-proto") ||
        (host?.includes("localhost") ? "http" : "https");

    if (!host) {
        return `http://localhost:3000${path}`;
    }

    return `${protocol}://${host}${path}`;
};
