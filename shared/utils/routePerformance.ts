import * as Sentry from "@sentry/nextjs";

export const ROUTE_START_MARK = "route-start";
export const ROUTE_END_MARK = "route-end";
export const ROUTE_CHANGE_MEASURE = "route-change";

let activeRouteChangeSpan: ReturnType<typeof Sentry.startInactiveSpan> | null =
    null;

function stringifyRouteTarget(target: unknown) {
    if (!target) {
        return undefined;
    }

    if (typeof target === "string") {
        return target;
    }

    if (target instanceof URL) {
        return `${target.pathname}${target.search}${target.hash}`;
    }

    if (typeof target !== "object") {
        return undefined;
    }

    const routeTarget = target as {
        pathname?: string;
        query?: Record<string, string | number | boolean | null | undefined>;
        search?: string;
        hash?: string;
    };

    const pathname = routeTarget.pathname ?? "";

    if (routeTarget.search) {
        return `${pathname}${routeTarget.search}${routeTarget.hash ?? ""}`;
    }

    if (routeTarget.query) {
        const params = new URLSearchParams();

        Object.entries(routeTarget.query).forEach(([key, value]) => {
            if (value === undefined || value === null) {
                return;
            }

            params.set(key, String(value));
        });

        const search = params.toString();

        return `${pathname}${search ? `?${search}` : ""}${routeTarget.hash ?? ""}`;
    }

    if (!pathname) {
        return undefined;
    }

    return `${pathname}${routeTarget.hash ?? ""}`;
}

export function markRouteStart(target?: unknown) {
    if (typeof performance === "undefined") {
        return;
    }

    const targetRoute = stringifyRouteTarget(target);

    activeRouteChangeSpan?.setAttribute("route.interrupted", true);
    activeRouteChangeSpan?.end();
    activeRouteChangeSpan = Sentry.startInactiveSpan({
        name: targetRoute ? `route change: ${targetRoute}` : "route change",
        op: "navigation",
        forceTransaction: true,
        attributes: {
            "route.target": targetRoute ?? "unknown",
        },
    });

    performance.clearMarks(ROUTE_START_MARK);
    performance.clearMarks(ROUTE_END_MARK);
    performance.clearMeasures(ROUTE_CHANGE_MEASURE);
    performance.mark(ROUTE_START_MARK);
}

export function finishRouteChange(route: string, duration: number) {
    Sentry.logger.info("route_change", {
        route,
        duration,
    });

    activeRouteChangeSpan?.setAttributes({
        "route.destination": route,
        "route.duration_ms": duration,
    });
    activeRouteChangeSpan?.end();
    activeRouteChangeSpan = null;
}
