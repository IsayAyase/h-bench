"use client";

import { type TestType, tests } from "@/data/test";
import Link from "next/link";
import { useParams } from "next/navigation";

// #region Body
const Tests = ({ setShowSideBar }: { setShowSideBar: () => void }) => {
    const params: { test: TestType } = useParams();
    return (
        <div className="flex flex-col gap-6 px-2">
            <div className="flex flex-col gap-2">
                {tests.map((test) => (
                    <Link
                        key={test.value}
                        href={test.value}
                        data-iscurrent={params.test === test.value}
                        className={`flex items-center gap-2 w-full rounded-md px-2 py-1 hover:bg-muted-foreground/10 data-[iscurrent=true]:bg-muted-foreground/15`}
                        onClick={() => setShowSideBar()}
                    >
                        {test.icon}
                        <span>{test.title}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tests;
// #endregion Body
