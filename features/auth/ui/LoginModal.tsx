export default function LoginModal({
    onCloseModal,
}: {
    onCloseModal: () => void;
}) {
    const onSocialLogin = async (provider: string) => {
        // Implement social login logic here
        console.log(`Logging in with ${provider}`);
        window.location.href = `http://localhost:8080/api/auth/${provider}`;
    };

    return (
        <div
            className="w-screen h-screen flex justify-center items-center bg-black/50 fixed top-0 left-0"
            style={{ zIndex: 1000 }}
        >
            <div className="p-6 bg-white rounded-lg border border-black/10 relative text-center">
                <div className="text-xl leading-7 text-[#0a0a0a] font-semibold mb-3">
                    로그인
                </div>
                <div className="text-sm leading-4 text-[#717182]">
                    소셜 계정으로 간편하게 시작하세요
                </div>
                <div className="my-8 flex flex-col gap-2.5 w-87">
                    <button
                        className="cursor-pointer text-sm font-medium text-black w-full h-10.5 rounded-md bg-white border border-black/10 relative hover:bg-gray-100 transition-colors"
                        onClick={() => onSocialLogin("google")}
                    >
                        <svg
                            className="absolute left-3.5 top-1/2 transform -translate-y-1/2"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13.16 7.14584C13.16 6.69084 13.1192 6.25334 13.0433 5.83334H7V8.31834H10.4533C10.3017 9.11751 9.84667 9.79418 9.16417 10.2492V11.865H11.2467C12.46 10.745 13.16 9.10001 13.16 7.14584Z"
                                fill="#4285F4"
                            />
                            <path
                                d="M7 13.4167C8.7325 13.4167 10.185 12.845 11.2467 11.865L9.16417 10.2492C8.5925 10.6342 7.86333 10.8675 7 10.8675C5.33167 10.8675 3.91417 9.74167 3.40667 8.22501H1.27167V9.88167C2.3275 11.9758 4.49167 13.4167 7 13.4167Z"
                                fill="#34A853"
                            />
                            <path
                                d="M3.40665 8.21918C3.27831 7.83418 3.20248 7.42584 3.20248 7.00001C3.20248 6.57418 3.27831 6.16584 3.40665 5.78084V4.12418H1.27165C0.834146 4.98751 0.583313 5.96168 0.583313 7.00001C0.583313 8.03834 0.834146 9.01251 1.27165 9.87584L2.93415 8.58084L3.40665 8.21918Z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M7 3.13834C7.945 3.13834 8.785 3.46501 9.45583 4.09501L11.2933 2.25751C10.1792 1.21918 8.7325 0.583344 7 0.583344C4.49167 0.583344 2.3275 2.02418 1.27167 4.12418L3.40667 5.78084C3.91417 4.26418 5.33167 3.13834 7 3.13834Z"
                                fill="#EA4335"
                            />
                        </svg>

                        <div className="leading-10.5">Google로 계속하기</div>
                    </button>
                    <button
                        className="cursor-pointer text-sm font-medium text-black w-full h-10.5 rounded-md bg-[#fee500] relative hover:bg-yellow-400 transition-colors"
                        onClick={() => onSocialLogin("kakao")}
                    >
                        <svg
                            className="absolute left-3.5 top-1/2 transform -translate-y-1/2"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7.00002 1.75C3.77827 1.75 1.16669 3.77825 1.16669 6.27083C1.16669 7.88317 2.25577 9.29075 3.87919 10.0771C3.7666 10.493 3.51052 11.4596 3.4586 11.6812C3.3956 11.9472 3.55602 11.9437 3.66335 11.872C3.7421 11.8195 4.9251 11.0273 5.46119 10.6668C5.7686 10.71 6.08477 10.7333 6.41669 10.7333C9.63844 10.7333 12.25 8.70508 12.25 6.2125C12.25 3.71992 10.2218 1.75 7.00002 1.75Z"
                                fill="black"
                            />
                        </svg>

                        <div className="leading-10.5">카카오로 계속하기</div>
                    </button>
                    <button
                        className="cursor-pointer text-sm font-medium text-white w-full h-10.5 rounded-md bg-[#03C75A] relative hover:bg-green-600 transition-colors"
                        onClick={() => onSocialLogin("naver")}
                    >
                        <svg
                            className="absolute left-3.5 top-1/2 transform -translate-y-1/2"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1_4977)">
                                <path
                                    d="M9.49258 7.49292L4.30267 0H0V14H4.50742V6.50708L9.69733 14H14V0H9.49258V7.49292Z"
                                    fill="white"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1_4977">
                                    <rect width="14" height="14" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>

                        <div className="leading-10.5">네이버로 계속하기</div>
                    </button>
                </div>
                <div className="text-xs leading-4 text-[#717182]">
                    소셜 로그인을 통해 DevLearn의
                    <br />
                    모든 강의를 수강하실 수 있습니다
                </div>

                <div
                    className="absolute right-4 top-4 p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
                    onClick={onCloseModal}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g opacity="0.7">
                            <path
                                d="M10.5 3.5L3.5 10.5"
                                stroke="#0A0A0A"
                                strokeWidth="1.16667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M3.5 3.5L10.5 10.5"
                                stroke="#0A0A0A"
                                strokeWidth="1.16667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    );
}
