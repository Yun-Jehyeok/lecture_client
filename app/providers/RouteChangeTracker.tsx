"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
    finishRouteChange,
    ROUTE_CHANGE_MEASURE,
    ROUTE_END_MARK,
    ROUTE_START_MARK,
} from "@/shared/utils/routePerformance";

export default function RouteChangeTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const search = searchParams.toString();
    const route = search ? `${pathname}?${search}` : pathname;

    useEffect(() => {
        const startEntries = performance.getEntriesByName(
            ROUTE_START_MARK,
            "mark",
        );
        const latestStartEntry = startEntries.at(-1);

        if (!latestStartEntry) {
            return;
        }

        performance.mark(ROUTE_END_MARK);
        performance.measure(
            ROUTE_CHANGE_MEASURE,
            ROUTE_START_MARK,
            ROUTE_END_MARK,
        );

        const measureEntries = performance.getEntriesByName(
            ROUTE_CHANGE_MEASURE,
            "measure",
        );
        const latestMeasureEntry = measureEntries.at(-1);

        if (!latestMeasureEntry) {
            return;
        }

        finishRouteChange(route, latestMeasureEntry.duration);

        performance.clearMarks(ROUTE_START_MARK);
        performance.clearMarks(ROUTE_END_MARK);
        performance.clearMeasures(ROUTE_CHANGE_MEASURE);
    }, [route]);

    return null;
}
