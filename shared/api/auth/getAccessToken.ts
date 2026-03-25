/**
 * Fetches the access token from the server.
 * @returns accessToken if successful, otherwise null
 * @throws Error if the fetch request fails
 */
export const getAccessToken = async (): Promise<string | null> => {
    try {
        const response = await fetch("/api/auth/token");
        if (response.ok) {
            const data = await response.json();

            return data.accessToken;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Failed to get access token:", error);
        return null;
    }
};
