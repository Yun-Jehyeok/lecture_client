import { proxyAuthenticatedRoute } from "@/shared/api/auth/proxyAuthenticatedRoute";

export async function GET(request: Request) {
    return proxyAuthenticatedRoute({
        request,
        backendPath: "/api/enrollments",
    });
}

export async function POST(request: Request) {
    return proxyAuthenticatedRoute({
        request,
        backendPath: "/api/enrollments",
    });
}
