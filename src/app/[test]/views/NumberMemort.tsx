"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";

type State = "idle" | "show" | "input" | "fail" | "success";

export default function NumberMemory() {
    const [level, setLevel] = useState(1);
    const [number, setNumber] = useState("");
    const [input, setInput] = useState("");
    const [state, setState] = useState<State>("idle");

    const generateNumber = (length: number) => {
        let num = "";
        for (let i = 0; i < length; i++) {
            num += Math.floor(Math.random() * 10).toString();
        }
        return num;
    };

    useEffect(() => {
        if (state === "show") {
            const generated = generateNumber(level);
            setNumber(generated);
            setInput("");

            const timeout = setTimeout(() => {
                setState("input");
            }, 1500 + level * 300);

            return () => clearTimeout(timeout);
        }
    }, [state, level]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input === number) {
            setLevel((prev) => prev + 1);
            setState("success");
            setTimeout(() => {
                setState("show");
            }, 1000);
        } else {
            setState("fail");
        }
    };

    const start = () => {
        setLevel(1);
        setState("show");
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                if (state === "idle" || state === "fail") start();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [state]);

    return (
        <div className="relative h-full pt-12 md:pt-16">
            <div className="relative w-full h-[calc(100%-6rem)] flex items-center justify-center gap-4">
                <div className="absolute w-full top-0 flex flex-col items-end">
                    <div
                        className={`float-end w-fit transition-transform duration-300 ease-in-out italic`}
                    >
                        <span className="text-4xl font-bold">{level}</span>
                        <span className="font-bold">Level</span>
                    </div>
                </div>

                <div>
                    {state === "show" ? (
                        <div className="text-6xl font-mono font-bold text-primary tracking-widest">
                            {number}
                        </div>
                    ) : state === "idle" ? (
                        <Button onClick={start}>
                            <PlayCircle />
                            <span>Start</span>
                        </Button>
                    ) : state === "input" ? (
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col items-center gap-4"
                        >
                            <input
                                autoFocus
                                type="text"
                                inputMode="numeric"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="text-center border-b border-b-border focus-visible:outline-none"
                                style={{
                                    fontSize: "60px",
                                    fontFamily: "monospace",
                                    fontWeight: "bold",
                                }}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    ) : state === "success" ? (
                        <div className="text-center space-y-4">
                            <h2 className="text-3xl font-mono font-bold italic">
                                Leveling Up!
                            </h2>
                        </div>
                    ) : (
                        state === "fail" && (
                            <div className="text-center space-y-4">
                                <h2 className="text-3xl font-mono font-bold text-destructive italic">
                                    You reached Level {level}
                                </h2>
                                <p className="text-muted-foreground">
                                    The number was:{" "}
                                    <span className="font-mono">{number}</span>
                                </p>
                                <Button onClick={start}>
                                    <PlayCircle />
                                    <span>Restart</span>
                                </Button>
                            </div>
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
