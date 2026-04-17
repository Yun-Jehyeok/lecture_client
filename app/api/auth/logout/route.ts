import { cookies } from "next/headers";

const ACCESS_TOKEN_COOKIE = "accessToken";
const REFRESH_TOKEN_COOKIE = "refreshToken";

export async function POST() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(ACCESS_TOKEN_COOKIE);
        cookieStore.delete(REFRESH_TOKEN_COOKIE);

        return new Response(
            JSON.stringify({ message: "Logged out successfully" }),
            { status: 200 },
        );
    } catch (error) {
        console.error("Failed to log out:", error);
        return new Response(JSON.stringify({ error: "Failed to log out" }), {
            status: 500,
        });
    }
}
