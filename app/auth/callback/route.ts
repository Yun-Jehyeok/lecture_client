import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";
const DEFAULT_REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 14;

type ExchangeSuccessResponse = {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};

const buildRedirectUrl = (path: string, requestUrl: URL) =>
    new URL(path, requestUrl.origin);

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    const state = requestUrl.searchParams.get("state");

    if (!code) {
        return NextResponse.redirect(
            buildRedirectUrl("/auth/social?error=missing_code", requestUrl),
        );
    }

    const apiBaseUrl =
        process.env.BACKEND_API_URL || process.env.NEXT_PUBLIC_API_URL;

    if (!apiBaseUrl) {
        return NextResponse.redirect(
            buildRedirectUrl("/auth/social?error=missing_api_url", requestUrl),
        );
    }

    try {
        const exchangeUrl = new URL("/api/auth/exchange", apiBaseUrl);
        const exchangeResponse = await fetch(exchangeUrl.toString(), {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code,
                ...(state ? { state } : {}),
            }),
            cache: "no-store",
        });

        if (!exchangeResponse.ok) {
            return NextResponse.redirect(
                buildRedirectUrl(
                    "/auth/social?error=exchange_failed",
                    requestUrl,
                ),
            );
        }

        const { accessToken, refreshToken, expiresIn } =
            (await exchangeResponse.json()) as ExchangeSuccessResponse;

        if (!accessToken || !refreshToken || !expiresIn) {
            return NextResponse.redirect(
                buildRedirectUrl(
                    "/auth/social?error=exchange_failed",
                    requestUrl,
                ),
            );
        }

        const cookieStore = await cookies();
        const isProduction = process.env.NODE_ENV === "production";

        cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            path: "/",
            maxAge: expiresIn,
        });

        cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax",
            path: "/",
            maxAge: DEFAULT_REFRESH_TOKEN_MAX_AGE,
        });

        return NextResponse.redirect(buildRedirectUrl("/", requestUrl));
    } catch (error) {
        console.error("Failed to exchange social login code:", error);
        return NextResponse.redirect(
            buildRedirectUrl("/auth/social?error=server_error", requestUrl),
        );
    }
}
