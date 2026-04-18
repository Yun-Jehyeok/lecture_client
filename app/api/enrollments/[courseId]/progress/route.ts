import { proxyAuthenticatedRoute } from "@/shared/api/auth/proxyAuthenticatedRoute";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ courseId: string }> },
) {
    const { courseId } = await params;

    return proxyAuthenticatedRoute({
        request,
        backendPath: `/api/enrollments/${courseId}/progress`,
    });
}
