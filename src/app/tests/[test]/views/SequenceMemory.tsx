"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, PlayCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type GameStatus = "idle" | "showing" | "input" | "fail" | "success";

const GRID_SIZE = 5; // 6x6 grid = 36 tiles

function getRandomTileIndex(): number {
    return Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
}

export default function SequenceMemory() {
    const [level, setLevel] = useState(1);
    const [sequence, setSequence] = useState<number[]>([]);
    const [playerInput, setPlayerInput] = useState<number[]>([]);
    const [status, setStatus] = useState<GameStatus>("idle");
    const [activeTile, setActiveTile] = useState<number | null>(null);
    const [clickedTiles, setClickedTiles] = useState<number[]>([]);

    // Flash sequence one by one
    useEffect(() => {
        if (status === "showing") {
            let i = 0;
            const interval = setInterval(() => {
                setActiveTile(sequence[i]);
                i++;
                setTimeout(() => setActiveTile(null), 400);
                if (i >= sequence.length) {
                    clearInterval(interval);
                    setTimeout(() => setStatus("input"), 500);
                }
            }, 800);
            return () => clearInterval(interval);
        }
    }, [status, sequence]);

    const startLevel = useCallback(() => {
        const newSequence = Array.from({ length: level }, () =>
            getRandomTileIndex()
        );
        setSequence(newSequence);
        setPlayerInput([]);
        setClickedTiles([]); // 👈
        setStatus("showing");
    }, [level]);

    const handleTileClick = (index: number) => {
        if (status !== "input") return;

        const newInput = [...playerInput, index];
        setPlayerInput(newInput);
        setClickedTiles((prev) => [...prev, index]); // 👈 add this line

        const correct = sequence[newInput.length - 1] === index;

        if (!correct) {
            setStatus("fail");
            return;
        }

        if (newInput.length === sequence.length) {
            setStatus("success");
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
            <h3 className="mb-4 text-xl md:text-3xl text-gray-600">
                Level: {level}
            </h3>
            {/* Grid */}
            <div className="w-full my-20 flex flex-col items-center justify-center gap-4">
                <div className="h-6 w-full text-center">
                    {status === "fail" ? (
                        <span className="text-destructive">
                            Wrong! Try again.
                        </span>
                    ) : (
                        status === "success" && (
                            <span className="text-green-500">
                                Great! Level up.
                            </span>
                        )
                    )}
                </div>
                <div
                    className="grid gap-2"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 4rem)`,
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
                                    className={`w-16 h-16 rounded transition duration-200 ${
                                        isActive
                                            ? "bg-yellow-400 scale-105"
                                            : isClicked
                                            ? "bg-blue-400 scale-105"
                                            : isClickable
                                            ? "bg-muted-foreground/30 hover:bg-blue-300 hover:scale-105"
                                            : "bg-muted-foreground/20"
                                    }`}
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
                    ) : status === "fail" ? (
                        <Button onClick={handleContinue}>
                            <PlayCircle />
                            <span>Restart</span>
                        </Button>
                    ) : (
                        status === "success" && (
                            <Button onClick={handleContinue}>
                                <ArrowUp className="animate-bounce" />
                                <span>Level up</span>
                                <ArrowUp className="animate-bounce" />
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
