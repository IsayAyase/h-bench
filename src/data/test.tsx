import type { title } from "process";
import type { ReactNode } from "react";
import { AiOutlineAim } from "react-icons/ai";
import { GrKeyboard } from "react-icons/gr";
import { LuBlocks } from "react-icons/lu";
import { MdOutlineTimer } from "react-icons/md";
import { PiBrainLight } from "react-icons/pi";
import { TbHandClick, TbNumbers } from "react-icons/tb";

export type TestType =
    | "reaction-time"
    | "sequence-memory"
    | "aim"
    | "visual-memory"
    | "number-memory"
    | "click-speed"
    | "typing-speed";

export const tests: {
    title: string;
    value: TestType;
    icon: ReactNode | null;
    description: string;
}[] = [
    {
        title: "Click Speed",
        value: "click-speed",
        icon: <TbHandClick />,
        description:
            "How fast can you click in 5 seconds? A classic test of raw clicking ability and speed.",
    },
    {
        title: "Typing Speed",
        value: "typing-speed",
        icon: <GrKeyboard />,
        description:
            "Type a given sentence as fast and accurately as you can. Measures both speed and precision.",
    },
    {
        title: "Reaction Time",
        value: "reaction-time",
        icon: <MdOutlineTimer />,
        description:
            "Test how quickly you can react when the screen changes color. Click as fast as you can when it turns green.",
    },
    {
        title: "Aim",
        value: "aim",
        icon: <AiOutlineAim />,
        description:
            "Click on as many randomly appearing targets as you can in a short time. Trains precision and mouse control.",
    },
    {
        title: "Sequence Memory",
        value: "sequence-memory",
        icon: <PiBrainLight />,
        description:
            "Repeat an increasingly long sequence of highlighted blocks. Great for testing how well you remember order and pattern.",
    },
    {
        title: "Visual Memory",
        value: "visual-memory",
        icon: <LuBlocks />,
        description:
            "Memorize the location of tiles that light up, then recall and click them. The number of tiles increases each level.",
    },
    {
        title: "Number Memory",
        value: "number-memory",
        icon: <TbNumbers />,
        description:
            "A number will flash on screen for a moment. Type it from memory. Each round, the number gets longer.",
    },
];
