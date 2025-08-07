import { Button } from "@/components/ui/button";
import { PanelLeft, PanelLeftClose } from "lucide-react";
import Link from "next/link";
import Tests from "./Tests";

const SideBar = ({
    setShowSideBar,
    className,
}: {
    setShowSideBar: () => void;
    className?: string;
}) => {
    return (
        <div
            className={`w-60 h-full backdrop-blur-lg bg-background py-4 flex flex-col justify-between ${className}`}
        >
            <div className="flex flex-col gap-6">
                <SideBarHeader setShowSideBar={setShowSideBar} />
                <Tests setShowSideBar={setShowSideBar} />
            </div>
        </div>
    );
};

export default SideBar;

export const SideBarHeader = ({
    setShowSideBar,
}: {
    setShowSideBar: () => void;
}) => {
    return (
        <div className="flex items-center justify-between gap-2 px-4">
            <Link href={"/"}>
                <h3 className="text-3xl font-extralight">HBench.com</h3>
            </Link>
        </div>
    );
};
// #endregion Header

export const SideBarBtn = ({
    showSideBar,
    onClick,
}: {
    showSideBar: boolean;
    onClick: () => void;
}) => {
    return (
        <Button
            variant={"outline"}
            className="fixed top-0 right-0 m-6 md:hidden transition-all duration-300 ease-out z-50"
            onClick={onClick}
            size={"icon"}
        >
            <div className={``}>
                {showSideBar ? (
                    <PanelLeftClose className="size-5" />
                ) : (
                    <PanelLeft className="size-5" />
                )}
            </div>
        </Button>
    );
};
