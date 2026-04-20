"use client";

import { useRouter } from "next/navigation";
import { markRouteStart } from "@/shared/utils/routePerformance";

export function useTrackedRouter() {
    const router = useRouter();

    return {
        ...router,
        push: (...args: Parameters<typeof router.push>) => {
            markRouteStart(args[0]);
            router.push(...args);
        },
        replace: (...args: Parameters<typeof router.replace>) => {
            markRouteStart(args[0]);
            router.replace(...args);
        },
        back: () => {
            markRouteStart();
            router.back();
        },
        forward: () => {
            markRouteStart();
            router.forward();
        },
        refresh: () => {
            markRouteStart();
            router.refresh();
        },
    };
}
