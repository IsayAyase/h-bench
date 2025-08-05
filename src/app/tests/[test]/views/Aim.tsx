"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "../../components/ProgressBar";

const TIME = 30000;

export default function Aim() {
    const [playing, setPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(TIME);
    const [targetPosition, setTargetPosition] = useState({ top: 50, left: 50 });
    const [clickTimes, setClickTimes] = useState<number[]>([]);
    const spawnTimeRef = useRef<number>(0);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const seg = 150;
        if (playing && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((t) => t - seg);
            }, seg);
        } else if (timeLeft <= 0) {
            setPlaying(false);
        }
        return () => clearInterval(timer);
    }, [playing, timeLeft]);

    const startGame = () => {
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

    const averageTime = clickTimes.length
        ? (clickTimes.reduce((a, b) => a + b) / clickTimes.length).toFixed(0)
        : "0";

    return (
        <div className="w-full h-full mx-auto text-center pt-10 md:pt-16">
            <ProgressBar
                className=" items-center my-4"
                total={TIME}
                value={timeLeft}
                reverse={true}
                postfix="s"
                showValues={false}
            />

            <div className="relative w-full h-[calc(100%-50px)] bg-background rounded-md border">
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
                        onClick={startGame}
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
        </div>
    );
}
