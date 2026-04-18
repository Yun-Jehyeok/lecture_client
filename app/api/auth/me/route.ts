import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";

const getAccessTokenFromHeader = (authorizationHeader: string | null) => {
    if (!authorizationHeader?.startsWith("Bearer ")) {
        return null;
    }

    return authorizationHeader.slice("Bearer ".length);
};

export async function GET(request: Request) {
    const apiBaseUrl =
        process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiBaseUrl) {
        return new Response(
            JSON.stringify({ error: "API base URL is not configured" }),
            {
                status: 500,
            },
        );
    }

    try {
        const cookieStore = await cookies();
        const accessTokenFromCookie =
            cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
        const accessTokenFromHeader = getAccessTokenFromHeader(
            request.headers.get("authorization"),
        );
        const accessToken = accessTokenFromHeader || accessTokenFromCookie;

        if (!accessToken) {
            return new Response(
                JSON.stringify({ error: "Access token not found" }),
                { status: 401 },
            );
        }

        const response = await fetch(new URL("/api/auth/me", apiBaseUrl), {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const responseBody = await response.text();

        return new Response(responseBody, {
            status: response.status,
            headers: {
                "Content-Type":
                    response.headers.get("Content-Type") || "application/json",
            },
        });
    } catch (error) {
        console.error("Failed to fetch user via BFF:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch user" }), {
            status: 500,
        });
    }
}
