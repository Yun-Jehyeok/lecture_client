import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get("accessToken")?.value;

        console.log("Access Token:", accessToken);
        if (!accessToken) {
            return new Response(
                JSON.stringify({ error: "Access token not found" }),
                { status: 401 },
            );
        }
        return new Response(JSON.stringify({ accessToken }), { status: 200 });
    } catch (error) {
        console.error("Failed to get access token:", error);
        return new Response(
            JSON.stringify({ error: "Failed to get access token" }),
            { status: 500 },
        );
    }
}
