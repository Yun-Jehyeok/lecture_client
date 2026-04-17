import { getAccessToken } from "@/shared/api";

export const logout = async () => {
    try {
        const accessToken = await getAccessToken();
        if (!accessToken) {
            return;
        }

        const response = await fetch(`/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Logout failed");
        }

        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
};
