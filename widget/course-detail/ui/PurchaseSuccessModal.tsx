export default function PurchaseSuccessModal({
    onCloseModal,
}: {
    onCloseModal: () => void;
}) {
    return (
        <div
            className="w-screen h-screen flex justify-center items-center bg-black/50 fixed top-0 left-0"
            style={{ zIndex: 1000 }}
        >
            <div className="p-6 bg-white rounded-lg border border-black/10 relative text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto bg-primary/20 mb-3.5">
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.4998 32.0833C25.554 32.0833 32.0832 25.5541 32.0832 17.5C32.0832 9.44581 25.554 2.91663 17.4998 2.91663C9.44568 2.91663 2.9165 9.44581 2.9165 17.5C2.9165 25.5541 9.44568 32.0833 17.4998 32.0833Z"
                            stroke="#1CE479"
                            strokeWidth="2.91667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M13.125 17.5L16.0417 20.4167L21.875 14.5834"
                            stroke="#1CE479"
                            strokeWidth="2.91667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <h2 className="text-xl leading-7 font-semibold mb-3.5 text-[#0A0A0A]">
                    강의 신청 완료!
                </h2>

                <div className="text-sm leading-5 font-normal text-[#717182] mb-6">
                    축하합니다! 강의가 성공적으로 신청되었습니다.
                </div>

                <button className="bg-primary text-black w-full flex items-center justify-center h-10 text-sm font-medium gap-2 rounded-md cursor-pointer hover:bg-primary/90 transition-colors">
                    바로 보러가기
                </button>

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
