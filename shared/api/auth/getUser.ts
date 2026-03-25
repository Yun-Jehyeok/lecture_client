import { getAccessToken } from "./getAccessToken";

export const getUser = async ({
    accessToken,
}: { accessToken?: string } = {}) => {
    try {
        const token = accessToken || (await getAccessToken());
        if (!token) {
            return null;
        }

        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/auth/me",
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        console.log("response:::", response);
        if (response.ok) {
            const userData = await response.json();
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
};
