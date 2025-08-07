import type { ReactNode } from "react";

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
        title: "Reaction Time",
        value: "reaction-time",
        icon: null,
        description:
            "Test how quickly you can react when the screen changes color. Click as fast as you can when it turns green.",
    },
    {
        title: "Sequence Memory",
        value: "sequence-memory",
        icon: null,
        description:
            "Repeat an increasingly long sequence of highlighted blocks. Great for testing how well you remember order and pattern.",
    },
    {
        title: "Aim",
        value: "aim",
        icon: null,
        description:
            "Click on as many randomly appearing targets as you can in a short time. Trains precision and mouse control.",
    },
    {
        title: "Visual Memory",
        value: "visual-memory",
        icon: null,
        description:
            "Memorize the location of tiles that light up, then recall and click them. The number of tiles increases each level.",
    },
    {
        title: "Number Memory",
        value: "number-memory",
        icon: null,
        description:
            "A number will flash on screen for a moment. Type it from memory. Each round, the number gets longer.",
    },
    {
        title: "Click Speed",
        value: "click-speed",
        icon: null,
        description:
            "How fast can you click in 5 seconds? A classic test of raw clicking ability and speed.",
    },
    {
        title: "Typing Speed",
        value: "typing-speed",
        icon: null,
        description:
            "Type a given sentence as fast and accurately as you can. Measures both speed and precision.",
    },
];
