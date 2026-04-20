"use client";

import Link from "next/link";
import { MouseEvent, type ComponentProps } from "react";
import { markRouteStart } from "@/shared/utils/routePerformance";

type TrackedLinkProps = ComponentProps<typeof Link>;

export default function TrackedLink({
    onClick,
    target,
    href,
    ...props
}: TrackedLinkProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            target === "_blank"
        ) {
            return;
        }

        markRouteStart(href);
    };

    return (
        <Link href={href} {...props} target={target} onClick={handleClick} />
    );
}
