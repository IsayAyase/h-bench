"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const prompts = [
    "The quick brown",
    "The quick brown fox jumps over the lazy dog. It's a phrase known for using every letter of the alphabet, and has been typed by generations of students and typists.",
    "Typing fast is not just about speed but also about accuracy. With regular practice, anyone can improve their typing skills significantly over time.",
    "Artificial intelligence is no longer a thing of the future. From chatbots to self-driving cars, it's already shaping the world in ways we never imagined.",
    "Success in programming comes from persistence, curiosity, and the ability to solve problems. Bugs are just part of the journey, not the end of it.",
    "Stay curious, keep learning, and always push yourself out of your comfort zone. Growth happens when you challenge what you think you know.",
    "Great developers aren't born, they're built. Line by line, bug by bug, through sleepless nights and endless StackOverflow tabs.",
];

export default function TypingSpeed() {
    const [prompt, setPrompt] = useState(
        prompts[Math.floor(Math.random() * prompts.length)]
    );
    const [typed, setTyped] = useState("");
    const [stopWatch, setStopWatch] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const [finished, setFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(0);

    const promptChars = prompt.split("");

    useEffect(() => {
        if (!finished && typed.length > 0) {
            let seg = 50;
            intervalRef.current = setInterval(() => {
                setStopWatch((p) => p + seg);
            }, seg);
        } else if (!finished && typed.length === 0) {
            setStopWatch(0);
            setWpm(0);
            setAccuracy(0);
        }
        // else if (intervalRef.current) {
        //     clearInterval(intervalRef.current);
        // }

        if (typed.length === prompt.length) {
            setFinished(true);
        } else {
            setWpm(getWPM());
            setAccuracy(getAccuracy());
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [typed, finished]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (finished) return;

        if (e.key === "Backspace") {
            setTyped((prev) => prev.slice(0, -1));
        } else if (e.key.length === 1) {
            // prevent typing more than prompt
            if (typed.length < prompt.length) {
                setTyped((prev) => prev + e.key);
            }
        }

        e.preventDefault();
    };

    const getAccuracy = () => {
        let correct = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === prompt[i]) correct++;
        }
        return Number(((correct / prompt.length) * 100).toFixed(1));
    };

    const getWPM = () => {
        if (!stopWatch) return 0;
        const minutes = stopWatch / 1000 / 60;
        const words = typed.trim().split(/\s+/).length;
        return Math.round(words / minutes);
    };

    const reset = () => {
        setPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
        setTyped("");
        setStopWatch(0);
        setFinished(false);
        setWpm(0);
        setAccuracy(0);
    };

    return (
        <div className="relative h-full pt-10 md:pt-16">
            <div
                className="relative w-full h-[calc(100%-6rem)] flex flex-col items-center justify-center gap-4"
                onKeyDown={handleKeyDown}
                tabIndex={0}
                autoFocus
            >
                <div className="absolute w-full top-0 flex flex-col items-end">
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out`}
                    >
                        <span className="text-4xl font-bold italic">
                            {(stopWatch / 1000).toFixed(2)}
                        </span>
                        <span className="font-bold italic">sec</span>
                    </div>
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out`}
                    >
                        <span className="text-4xl font-bold italic">{wpm}</span>
                        <span className="font-bold italic">words/min</span>
                    </div>
                    <div
                        className={`float-end mx-4 w-fit transition-transform duration-300 ease-in-out`}
                    >
                        <span className="text-4xl font-bold italic">
                            {accuracy}
                        </span>
                        <span className="font-bold italic">% accuracy</span>
                    </div>
                </div>

                <div className="text-xl text-center font-mono max-w-2xl mx-auto mb-6 break-words">
                    {promptChars.map((char, idx) => {
                        const typedChar = typed[idx];
                        let className = "text-muted-foreground/50";
                        if (typedChar != null) {
                            if (typedChar === char) {
                                className = "text-green-600";
                            } else {
                                className =
                                    char === " "
                                        ? "bg-red-500"
                                        : "text-red-500";
                            }
                        }
                        if (typed.length === idx) {
                            return (
                                <span key={idx} className={className}>
                                    <span className="animate-caret-blink h-4 w-[1px] border border-muted-foreground" />
                                    {char}
                                </span>
                            );
                        }
                        return (
                            <span key={idx} className={className}>
                                {char}
                            </span>
                        );
                    })}
                </div>

                {finished && (
                    <Button onClick={reset}>
                        <PlayCircle />
                        <span>Restart</span>
                    </Button>
                )}
            </div>
            <div className="absolute md:m-0 bottom-0 left-0 right-0 text-center text-sm text-muted-foreground">
                Start typing the text above. Backspace is supported. Case
                sensitive.
            </div>
        </div>
    );
}
