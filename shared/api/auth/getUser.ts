export const getUser = async ({
    accessToken,
}: { accessToken?: string } = {}) => {
    try {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include",
            headers: accessToken
                ? {
                      Authorization: `Bearer ${accessToken}`,
                  }
                : undefined,
            cache: "no-store",
        });

        if (!response.ok) {
            return null;
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return null;
    }
};
