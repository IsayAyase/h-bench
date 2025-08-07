"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PlayCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Status = "idle" | "showing" | "input" | "fail" | "success";

const GRID_SIZE = 6; // 6x6 grid = 36 tiles

function getRandomTileIndex(): number {
    return Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
}

export default function SequenceMemory() {
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState<number[]>([]);
    const [playerInput, setPlayerInput] = useState<number[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const [activeTile, setActiveTile] = useState<number | null>(null);
    const [clickedTiles, setClickedTiles] = useState<number[]>([]);

    // Flash sequence one by one
    useEffect(() => {
        if (status === "showing") {
            let i = 0;
            const interval = setInterval(() => {
                setActiveTile(sequence[i]);
                i++;
                setTimeout(() => setActiveTile(null), 500);
                if (i >= sequence.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus("input"), 550);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [status, sequence]);

    const startLevel = useCallback(() => {
        const newSequence = Array.from({ length: level }, () =>
            getRandomTileIndex()
        );
        setSequence(newSequence);
        setPlayerInput([]);
        setClickedTiles([]);
        setStatus("showing");
    }, [level]);

    const handleTileClick = (index: number) => {
        if (status !== "input") return;

        const newInput = [...playerInput, index];
        setPlayerInput(newInput);
        setClickedTiles((prev) => [...prev, index]);

        const correct = sequence[newInput.length - 1] === index;

        if (!correct) {
            setStatus("fail");
            return;
        }

        if (newInput.length === sequence.length) {
            setStatus("success");
            setTimeout(() => {
                setLevel((prev) => prev + 1);
                startLevel();
            }, 1000);
        }
    };

    const handleContinue = useCallback(() => {
        setClickedTiles([]);
        if (status === "fail") {
            setStatus("idle");
            setLevel(1);
        } else if (status === "success") {
            setLevel((prev) => prev + 1);
            startLevel();
        }
    }, [status, startLevel]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                if (status === "idle") startLevel();
                else if (status === "fail") handleContinue();
                else if (status === "success") handleContinue();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [status]);

    return (
        <div className="relative h-full pt-10 md:pt-16">
            <div className="relative w-full py-20 flex flex-col items-center justify-center gap-4">
                <div className="absolute w-full top-0 flex flex-col items-end">
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out italic`}
                    >
                        <span className="text-4xl font-bold">{level}</span>
                        <span className="font-bold">Level</span>
                    </div>
                </div>

                <div className="h-6 w-full text-center">
                    {status === "fail" ? (
                        <span className="text-destructive">Over!</span>
                    ) : (
                        status === "success" && (
                            <span className="italic">Leveling up!</span>
                        )
                    )}
                </div>

                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 3.5rem)`,
                    }}
                >
                    {Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
                        (_, i) => {
                            const isActive = activeTile === i;
                            const isClickable = status === "input";
                            const isClicked = clickedTiles.includes(i);

                            return (
                                <button
                                    key={i}
                                    onClick={() => handleTileClick(i)}
                                    disabled={!isClickable}
                                    className={clsx(
                                        "w-14 h-14 rounded border border-muted-foreground/25 transition duration-200",
                                        {
                                            "bg-yellow-400 scale-105": isActive,
                                            "bg-blue-400 scale-105": isClicked,
                                            "bg-muted hover:bg-blue-300 hover:scale-105":
                                                isClickable &&
                                                !isActive &&
                                                !isClicked,
                                            "bg-muted":
                                                !isClickable &&
                                                !isActive &&
                                                !isClicked,
                                        }
                                    )}
                                />
                            );
                        }
                    )}
                </div>
                <div className="mt-10">
                    {status === "idle" ? (
                        <Button onClick={startLevel}>
                            <PlayCircle />
                            <span>Start</span>
                        </Button>
                    ) : (
                        status === "fail" && (
                            <Button onClick={handleContinue}>
                                <PlayCircle />
                                <span>Restart</span>
                            </Button>
                        )
                    )}
                </div>
            </div>

            <div className="absolute md:m-0 bottom-0 left-0 right-0 text-center text-sm text-muted-foreground">
                *Can use Space Bar to start and level up
            </div>
        </div>
    );
}
