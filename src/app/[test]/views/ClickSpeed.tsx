"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/ProgressBar";

const TIME = 5000;

export default function ClickSpeed() {
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(TIME);
    const [started, setStarted] = useState(false);
    const [finished, setFinished] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startTest = () => {
        setClicks(0);
        setTimeLeft(TIME);
        setFinished(false);
        setStarted(true);
    };

    const endTest = () => {
        setStarted(false);
        setFinished(true);
        if (intervalRef.current) clearInterval(intervalRef.current);

        document.activeElement instanceof HTMLElement &&
            document.activeElement.blur();
    };

    // Timer effect
    useEffect(() => {
        if (!started) return;

        let seg = 50;
        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    endTest();
                    return 0;
                }
                return prev - seg;
            });
        }, seg);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [started]);

    // Keypress and click handler
    useEffect(() => {
        const handleClick = () => {
            if (started) setClicks((prev) => prev + 1);
        };

        const handleKey = (e: KeyboardEvent) => {
            if (started && e.code === "Space") {
                e.preventDefault();
                setClicks((prev) => prev + 1);
            }
        };

        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKey);
        };
    }, [started]);

    return (
        <div className="relative h-full pt-10 md:pt-16">
            <div className="relative w-full h-[calc(100%-6rem)] flex items-center justify-center gap-4">
                <div className="absolute w-full top-0 flex flex-col items-end">
                    <ProgressBar
                        className="items-end mx-4 w-full"
                        total={TIME}
                        value={timeLeft}
                        reverse={true}
                        postfix="ms"
                        direction="right"
                    />
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out`}
                    >
                        <span className="text-4xl font-bold italic">
                            {clicks}
                        </span>
                        <span className="font-bold italic">clicks</span>
                    </div>
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out`}
                    >
                        <span className="text-4xl font-bold italic">
                            {clicks / (TIME / 1000)}
                        </span>
                        <span className="font-bold italic">clicks/sec</span>
                    </div>
                </div>

                <Button
                    onClick={startTest}
                    tabIndex={-1}
                    style={{ outline: "none" }}
                >
                    <PlayCircle />
                    <span>{!started && !finished ? "Start" : "Restart"}</span>
                </Button>
            </div>

            <div className="absolute md:m-0 bottom-0 left-0 right-0 text-center text-sm text-muted-foreground">
                *Once started, click anywhere or press spacebar
            </div>
        </div>
    );
}
