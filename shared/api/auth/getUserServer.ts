import { headers } from "next/headers";

const getUserApiUrl = async () => {
    const headerStore = await headers();
    const host = headerStore.get("x-forwarded-host") || headerStore.get("host");
    const protocol =
        headerStore.get("x-forwarded-proto") ||
        (host?.includes("localhost") ? "http" : "https");

    if (!host) {
        return "http://localhost:3000/api/auth/me";
    }

    return `${protocol}://${host}/api/auth/me`;
};

export const getUserServer = async ({
    accessToken,
}: { accessToken?: string } = {}) => {
    try {
        const response = await fetch(await getUserApiUrl(), {
            method: "GET",
            headers: accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : undefined,
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
};
