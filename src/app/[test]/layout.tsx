"use client";
import { useState, type ReactNode } from "react";
import SideBar, { SideBarBtn } from "./components/SideBar";

function TestsLayout({ children }: { children: ReactNode }) {
    const [showSideBar, setShowSideBar] = useState<boolean>(false);

    return (
        <div className="relative h-dvh md:grid grid-cols-[auto_1fr] gap-0 overflow-hidden">
            <div
                onClick={() => setShowSideBar(false)}
                className={`${
                    showSideBar ? "fixed md:hidden" : "hidden"
                } z-40 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-[1px]`}
            />
            <SideBar
                className={`fixed md:static z-50 top-0 left-0 transition-transform duration-500 ease-out ${
                    showSideBar
                        ? "translate-x-0"
                        : "-translate-x-[100%] md:translate-x-0"
                }`}
                setShowSideBar={() => setShowSideBar((p) => !p)}
            />
            <div className="flex justify-center gap-4 h-full w-full bg-foreground/[3%] overflow-y-auto px-6 py-4">
                <div id="workspace" className="w-full max-w-6xl">
                    {children}
                    <SideBarBtn
                        showSideBar={showSideBar}
                        onClick={() => setShowSideBar((p) => !p)}
                    />
                </div>
            </div>
        </div>
    );
}

export default TestsLayout;
