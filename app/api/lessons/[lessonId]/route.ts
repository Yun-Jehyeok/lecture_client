import { proxyAuthenticatedRoute } from "@/shared/api/auth/proxyAuthenticatedRoute";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ lessonId: string }> },
) {
    const { lessonId } = await params;

    return proxyAuthenticatedRoute({
        request,
        backendPath: `/api/lessons/${lessonId}`,
    });
}
