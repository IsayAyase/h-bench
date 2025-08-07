"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

const GRID_SIZE = 6;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;

type State = "idle" | "showing" | "waiting" | "success" | "fail";

function getRandomTiles(count: number): number[] {
    const indices: number[] = new Array(count);
    for (let i = indices.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (TOTAL_TILES - 1));
        indices[i] = j;
    }
    return indices;
}

export default function VisualMemory() {
    const [level, setLevel] = useState(1);
    const [state, setState] = useState<State>("idle");
    const [sequence, setSequence] = useState<number[]>([]);
    const [userClicks, setUserClicks] = useState<Set<number>>(new Set());
    const [flashTiles, setFlashTiles] = useState<number[]>([]);

    const startLevel = () => {
        const newSequence = getRandomTiles(level + 2);
        setSequence(newSequence);
        setUserClicks((p) => {
            p.clear();
            return p;
        });
        setState("showing");
        setFlashTiles(newSequence);

        // hiding the tiles after a timeout
        // timeout will increase, with level
        setTimeout(() => {
            setFlashTiles([]);
            setState("waiting");
        }, 1000 + newSequence.length * 200);
    };

    const handleTileClick = (index: number) => {
        if (state !== "waiting") return;
        if (userClicks.has(index)) return;

        const newClicks = new Set(userClicks);
        newClicks.add(index);
        setUserClicks(newClicks);

        // Incorrect click
        if (!sequence.includes(index)) {
            setState("fail");
            return;
        }

        // Correct number of clicks
        if (newClicks.size === sequence.length) {
            const isCorrect = sequence.every((tile) => newClicks.has(tile));
            if (isCorrect) {
                setState("success");
                setTimeout(() => {
                    setLevel((prev) => prev + 1);
                    startLevel();
                }, 1000);
            } else {
                setState("fail");
            }
        }
    };

    const restart = () => {
        setLevel(1);
        setState("idle");
        setSequence([]);
        setUserClicks((p) => {
            p.clear();
            return p;
        });
        setFlashTiles([]);
    };

    useEffect(() => {
        if (state === "idle") return;
        if (state === "success" || state === "fail") return;
        startLevel();
    }, [state === "idle"]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                if (state === "idle") setState("showing");
                else if (state === "fail") restart();
                else if (state === "success") {
                    setTimeout(() => {
                        setState("showing");
                    }, 1000);
                }
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state]);

    return (
        <div className="relative h-full pt-12 md:pt-16">
            <div className="relative w-full py-20 flex flex-col items-center justify-center gap-4">
                <div className="absolute w-full top-0 flex flex-col items-end">
                    <div
                        className={`float-end w-fit transition-transform duration-300 ease-in-out italic`}
                    >
                        <span className="text-4xl font-bold">{level}</span>
                        <span className="font-bold">Level</span>
                    </div>
                </div>

                <div className="h-6 w-full text-center">
                    {state === "fail" ? (
                        <span className="text-destructive">Over!</span>
                    ) : (
                        state === "success" && (
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
                    {Array.from({ length: TOTAL_TILES }, (_, i) => {
                        const isFlashing = flashTiles.includes(i);
                        const isClicked = userClicks.has(i);
                        const isCorrect = sequence.includes(i);
                        const isWrong = isClicked && !isCorrect;

                        return (
                            <button
                                key={i}
                                onClick={() => handleTileClick(i)}
                                disabled={state !== "waiting"}
                                data-state={
                                    isFlashing
                                        ? "flash"
                                        : isClicked
                                        ? isWrong
                                            ? "wrong"
                                            : "clicked"
                                        : undefined
                                }
                                className={clsx(
                                    "w-14 h-14 rounded border border-muted-foreground/25 transition-colors duration-200",
                                    {
                                        "bg-yellow-400": isFlashing,
                                        "bg-green-500": isClicked && isCorrect,
                                        "bg-red-500": isWrong,
                                        "bg-muted": !isFlashing && !isClicked,
                                    }
                                )}
                            />
                        );
                    })}
                </div>

                <div className="mt-10">
                    {state === "idle" && (
                        <Button onClick={() => setState("showing")}>
                            <PlayCircle />
                            <span>Start</span>
                        </Button>
                    )}

                    {state === "fail" && (
                        <Button onClick={restart}>
                            <PlayCircle />
                            <span>Restart</span>
                        </Button>
                    )}
                </div>
            </div>

            <div className="absolute md:m-0 bottom-0 left-0 right-0 text-center text-sm text-muted-foreground">
                *Can use Space Bar to start and level up
            </div>
        </div>
    );
}
