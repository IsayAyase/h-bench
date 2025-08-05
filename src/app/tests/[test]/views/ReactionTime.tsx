"use client";

import { useEffect, useState } from "react";

export default function ReactionTest() {
    const [status, setStatus] = useState<
        "idle" | "waiting" | "ready" | "tooSoon" | "done"
    >("idle");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [reactionTime, setReactionTime] = useState<number | null>(null);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") handleClick();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [status, startTime]);

    const startTest = () => {
        setStatus("waiting");
        setReactionTime(null);
        const delay = Math.floor(Math.random() * 2000) + 3000; // 3-5 sec
        const id = setTimeout(() => {
            setStartTime(performance.now());
            setStatus("ready");
        }, delay);
        setTimeoutId(id);
    };

    const handleClick = () => {
        if (status === "waiting") {
            if (timeoutId) clearTimeout(timeoutId);
            setStatus("tooSoon");
        } else if (status === "ready") {
            const endTime = performance.now();
            if (startTime && endTime)
                setReactionTime(Number((endTime - startTime).toFixed(0)));
            setStatus("done");
        } else if (
            status === "idle" ||
            status === "tooSoon" ||
            status === "done"
        ) {
            startTest();
        }
    };

    const getDisplayText = () => {
        switch (status) {
            case "idle":
                return "Click to start";
            case "waiting":
                return "Wait for green...";
            case "ready":
                return "CLICK!";
            case "tooSoon":
                return "Too soon! Click to try again.";
            case "done":
                return `Click to try again.`;
        }
    };

    return (
        <div
            onClick={handleClick}
            className={`relative w-full h-full flex items-center justify-center text-white text-2xl cursor-pointer transition-all duration-300`}
        >
            <div
                className={`fixed top-0 left-0 -z-10 w-dvw h-dvh ${
                    status === "waiting"
                        ? "bg-red-500"
                        : status === "ready"
                        ? "bg-green-500"
                        : status === "tooSoon"
                        ? "bg-yellow-500"
                        : "bg-blue-600"
                }`}
            />
            <div className="flex flex-col justify-center items-center gap-6">
                {reactionTime && (
                    <h1 className="text-7xl font-bold">{reactionTime}ms</h1>
                )}
                <span>{getDisplayText()}</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 text-center text-sm text-white/50">
                *Can use Space Bar
            </div>
        </div>
    );
}
