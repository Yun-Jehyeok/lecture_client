import type { Metadata } from "next";
import "./styles/globals.css";
import LNB from "@/widget/lnb";
import { getCategories } from "@/entities/course";
import { cookies } from "next/headers";
import { getUser } from "@/shared/api";

export const metadata: Metadata = {
    title: "DevLearn",
    description: "코빡이 강의 플랫폼",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const initialCategories = await getCategories();
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    const user = await getUser({ accessToken });

    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
                    rel="stylesheet"
                ></link>
            </head>
            <body
                className={`antialiased flex flex-col md:flex-row min-h-screen`}
            >
                <LNB
                    initialCategories={initialCategories}
                    prefetchedUser={user}
                />
                <div className="bg-background flex-1 min-w-0">{children}</div>
            </body>
        </html>
    );
}
