export const logout = async () => {
    try {
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
