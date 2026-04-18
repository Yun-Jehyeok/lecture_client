import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

const getApiBaseUrl = () =>
    process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

export async function POST() {
    const apiBaseUrl = getApiBaseUrl();

    if (!apiBaseUrl) {
        return new Response(
            JSON.stringify({ error: "API base URL is not configured" }),
            { status: 500 },
        );
    }

    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

        if (!accessToken) {
            cookieStore.delete(ACCESS_TOKEN_COOKIE);
            cookieStore.delete(REFRESH_TOKEN_COOKIE);

            return new Response(
                JSON.stringify({ message: "Logged out successfully" }),
                { status: 200 },
            );
        }

        const response = await fetch(new URL("/api/auth/logout", apiBaseUrl), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        cookieStore.delete(ACCESS_TOKEN_COOKIE);
        cookieStore.delete(REFRESH_TOKEN_COOKIE);

        const responseBody = await response.text();

        return new Response(
            responseBody ||
                JSON.stringify({ message: "Logged out successfully" }),
            {
                status: response.ok ? 200 : response.status,
                headers: {
                    "Content-Type":
                        response.headers.get("Content-Type") ||
                        "application/json",
                },
            },
        );
    } catch (error) {
        console.error("Failed to log out:", error);
        return new Response(JSON.stringify({ error: "Failed to log out" }), {
            status: 500,
        });
    }
}
