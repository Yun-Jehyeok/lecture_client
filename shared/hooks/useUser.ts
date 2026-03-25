import { useEffect, useState } from "react";
import { User as UserType } from "@/shared/types";
import { getUser } from "../api";

export const AUTH_CHANGED_EVENT = "auth-changed";

export const useUser = (initialUser: UserType | null = null) => {
    const [user, setUser] = useState<UserType | null>(initialUser);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                setUser(user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };

        fetchUser();

        const handleAuthChanged = () => {
            fetchUser();
        };

        window.addEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);

        return () => {
            window.removeEventListener(AUTH_CHANGED_EVENT, handleAuthChanged);
        };
    }, []);

    return { user, setUser };
};
