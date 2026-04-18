import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";

const getAccessTokenFromHeader = (authorizationHeader: string | null) => {
    if (!authorizationHeader?.startsWith("Bearer ")) {
        return null;
    }

    return authorizationHeader.slice("Bearer ".length);
};

const getApiBaseUrl = () =>
    process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

export const proxyAuthenticatedRoute = async ({
    request,
    backendPath,
}: {
    request: Request;
    backendPath: string;
}) => {
    const apiBaseUrl = getApiBaseUrl();

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

        const headers = new Headers();
        headers.set("Authorization", `Bearer ${accessToken}`);

        const contentType = request.headers.get("content-type");
        if (contentType) {
            headers.set("Content-Type", contentType);
        }

        const requestBody =
            request.method === "GET" || request.method === "HEAD"
                ? undefined
                : await request.text();

        const response = await fetch(new URL(backendPath, apiBaseUrl), {
            method: request.method,
            headers,
            body: requestBody,
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
        console.error("Failed to proxy authenticated request:", error);
        return new Response(
            JSON.stringify({ error: "Failed to proxy authenticated request" }),
            {
                status: 500,
            },
        );
    }
};
