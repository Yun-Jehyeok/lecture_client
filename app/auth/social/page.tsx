import Link from "next/link";

type SocialAuthPageProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};

const ERROR_MESSAGES: Record<string, string> = {
    missing_code: "로그인 코드가 누락되었습니다. 다시 시도해주세요.",
    exchange_failed: "로그인 처리 중 오류가 발생했습니다. 다시 시도해주세요.",
    server_error:
        "서버와 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
    missing_api_url: "서버 설정이 올바르지 않습니다. 관리자에게 문의해주세요.",
};

export default async function SocialAuthPage({
    searchParams,
}: SocialAuthPageProps) {
    const { error } = await searchParams;
    const message =
        (error && ERROR_MESSAGES[error]) ||
        "로그인에 실패했습니다. 다시 시도해주세요.";

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center px-4">
                <h1 className="text-2xl font-bold mb-3">로그인 실패</h1>
                <p className="text-sm text-gray-600 mb-6">{message}</p>
                <Link
                    href="/"
                    className="inline-flex h-10 px-4 items-center justify-center rounded-md bg-black text-white text-sm"
                >
                    홈으로 이동
                </Link>
            </div>
        </div>
    );
}
