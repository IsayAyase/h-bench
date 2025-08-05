"use client;";

import Link from "next/link";
import { useParams } from "next/navigation";
import type { ReactNode } from "react";

// #region Body
export type TestType =
    | "reaction-time"
    | "sequence-memory"
    | "aim"
    | "analytics"
    | "settings";
const tabs: { title: string; value: TestType; icon: ReactNode | null }[] = [
    { title: "Reaction Time", value: "reaction-time", icon: null },
    { title: "Sequence Memory", value: "sequence-memory", icon: null },
    { title: "Aim", value: "aim", icon: null },
    { title: "Settings", value: "settings", icon: null },
];
const Tests = ({ setShowSideBar }: { setShowSideBar: () => void }) => {
    const params: { test: TestType } = useParams();
    return (
        <div className="flex flex-col gap-6 px-2">
            <div className="flex flex-col gap-2">
                {tabs.map((tab) => (
                    <Link
                        key={tab.value}
                        href={tab.value}
                        data-iscurrent={params.test === tab.value}
                        className={`flex items-center gap-2 w-full rounded-md px-2 py-1 hover:bg-muted-foreground/10 data-[iscurrent=true]:bg-muted-foreground/15`}
                        onClick={() => setShowSideBar()}
                    >
                        {tab.icon}
                        <span>{tab.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tests;
// #endregion Body
