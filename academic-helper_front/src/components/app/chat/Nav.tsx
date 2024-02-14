"use client"
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx"
import {Link} from "react-router-dom";
import {cn} from "@/lib/utils.ts";
import {buttonVariants} from "@/components/ui/button.tsx";

interface NavProps {
    isCollapsed: boolean
    links: {
        title: string
        label?: string
        variant: "default" | "ghost"
    }[]
}

export function Nav({links}: NavProps) {
    return (
        <div
            className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
        >
            <nav
                className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {links.map((link, index) =>
                    <Link
                        to="#"
                        className={cn(
                            buttonVariants({variant: link.variant, size: "sm"}),
                            link.variant === "default" &&
                            "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                            "justify-start"
                        )}
                    >
                        {link.title}
                        <span
                            className={cn(
                                "ml-auto",
                                link.variant === "default" &&
                                "text-background dark:text-white"
                            )}
                        >
                              {link.label}
                            </span>
                    </Link>
                )}
            </nav>
        </div>
    )
}