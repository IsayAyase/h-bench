"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../components/ProgressBar";

const TIME = 30000;

export default function Aim() {
    const [playing, setPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIME);
    const [targetPosition, setTargetPosition] = useState({ top: 50, left: 50 });
    const [clickTimes, setClickTimes] = useState<number[]>([]);
    const spawnTimeRef = useRef<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const seg = 50;
        if (playing && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((t) => t - seg);
            }, seg);
        } else if (timeLeft <= 0) {
            setPlaying(false);
        }
        return () => clearInterval(timer);
    }, [playing, timeLeft]);

    const start = () => {
        setPlaying(true);
        setTimeLeft(TIME);
        setClickTimes([]);
        spawnNewTarget();
    };

    const spawnNewTarget = () => {
        const top = Math.random() * 90;
        const left = Math.random() * 90;
        setTargetPosition({ top, left });
        spawnTimeRef.current = performance.now();
    };

    const handleClick = () => {
        const now = performance.now();
        const reaction = now - spawnTimeRef.current;
        setClickTimes((times) => [...times, reaction]);
        spawnNewTarget();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                if (!playing) start();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [playing]);

    const averageTime = clickTimes.length
        ? (clickTimes.reduce((a, b) => a + b) / clickTimes.length).toFixed(0)
        : "0";

    return (
        <div className="w-full h-full mx-auto text-center pt-16">
            <div className="relative w-full h-[calc(100%-50px)] bg-background rounded-md border">
                <div className="absolute w-full top-0 flex flex-col items-end my-4">
                    <ProgressBar
                        className="items-end mx-4"
                        total={TIME}
                        value={timeLeft}
                        reverse={true}
                        postfix="ms"
                        direction="right"
                    />
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out italic`}
                    >
                        <span className="text-4xl font-bold">
                            {clickTimes.length}
                        </span>
                        <span className="font-bold">hits</span>
                    </div>
                    <div
                        className={`float-end text-right mx-4 w-fit transition-transform duration-300 ease-in-out italic`}
                    >
                        <span className="text-4xl font-bold">
                            {averageTime}
                        </span>
                        <span className="font-bold">ms</span>
                        <h5 className="text-xs">*Average Reaction Time</h5>
                    </div>
                </div>

                {playing ? (
                    <button
                        onClick={handleClick}
                        className="absolute w-12 h-12 bg-yellow-400 rounded-full"
                        style={{
                            top: `${targetPosition.top}%`,
                            left: `${targetPosition.left}%`,
                            transform: "translate(-50%, -50%)",
                        }}
                    />
                ) : (
                    <Button
                        onClick={start}
                        className="absolute top-1/2 left-1/2 translate-[-50%] w-fit"
                    >
                        <PlayCircle />
                        <span>Start</span>
                    </Button>
                )}

                {!playing && clickTimes.length > 0 && (
                    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-150%] flex flex-col justify-center items-center gap-4">
                        <div className="flex flex-col">
                            <span>Targets Hit</span>
                            <span className="text-7xl font-bold">
                                {clickTimes.length}
                            </span>
                        </div>
                        <Separator orientation={"horizontal"} />
                        <div className="flex flex-col">
                            <span className="text-sm">Avg Reaction Time</span>
                            <span className="text-2xl">{averageTime}ms</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="absolute md:m-0 bottom-0 left-0 right-0 text-center text-sm text-muted-foreground">
                *Can use Space Bar to start and level up
            </div>
        </div>
    );
}
