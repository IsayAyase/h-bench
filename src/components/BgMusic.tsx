"use client";

import { Info, PauseCircle, Play, PlayCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const BgMusic = () => {
    const [playing, setPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const startedRef = useRef(false);

    useEffect(() => {
        audioRef.current = new Audio("/ThisMoment-Wilkinson.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.7;

        const startMusicOnInteraction = () => {
            if (!startedRef.current && audioRef.current?.paused) {
                audioRef.current
                    .play()
                    .then(() => {
                        startedRef.current = true;
                        setPlaying(true);

                        // Remove all once audio started
                        window.removeEventListener(
                            "click",
                            startMusicOnInteraction
                        );
                        window.removeEventListener(
                            "keydown",
                            startMusicOnInteraction
                        );
                        window.removeEventListener(
                            "touchstart",
                            startMusicOnInteraction
                        );
                        window.removeEventListener(
                            "scroll",
                            startMusicOnInteraction
                        );
                        window.removeEventListener(
                            "scrollend",
                            startMusicOnInteraction
                        );
                    })
                    .catch((err) => {
                        console.warn("Auto-play blocked:", err);
                    });
            }
        };

        // Listen for user interaction events
        window.addEventListener("click", startMusicOnInteraction);
        window.addEventListener("keydown", startMusicOnInteraction);
        window.addEventListener("touchstart", startMusicOnInteraction);
        window.addEventListener("scroll", startMusicOnInteraction);
        window.addEventListener("scrollend", startMusicOnInteraction);

        return () => {
            window.removeEventListener("click", startMusicOnInteraction);
            window.removeEventListener("keydown", startMusicOnInteraction);
            window.removeEventListener("touchstart", startMusicOnInteraction);
            window.removeEventListener("scroll", startMusicOnInteraction);
            window.removeEventListener("scrollend", startMusicOnInteraction);
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (audioRef.current.paused) {
            audioRef.current
                .play()
                .then(() => setPlaying(true))
                .catch((err) => console.warn("Manual play blocked:", err));
        } else {
            audioRef.current.pause();
            setPlaying(false);
        }
    };

    return (
        <div className="fixed bottom-0 right-0 m-4 md:m-6 flex justify-center items-center gap-2 bg-muted-foreground/5 border border-border rounded-2xl px-2 py-1">
            <span id="music-btn" onClick={toggleMusic}>
                {playing ? <PauseCircle /> : <PlayCircle />}
            </span>
            <Popover>
                <PopoverTrigger>
                    <Info />
                </PopoverTrigger>
                <PopoverContent className="m-2 flex items-center gap-2 w-fit">
                    <Play />
                    <div>This Moment - Wilkinson</div>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default BgMusic;
