import { Button } from "@/components/ui/button";
import { tests } from "@/data/test";
import Link from "next/link";

function Footer() {
    return (
        <div className="relative w-full p-4" id="footer">
            <div className="absolute -z-0 top-0 left-0 w-full h-20">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(0deg, 
                                    transparent 0%, 
                                    transparent 25%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 45%, 
                                    color-mix(in oklab, var(--background) 45%, transparent) 50%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 65%, transparent) 85%, 
                                    color-mix(in oklab, var(--background) 75%, transparent) 100%
                                )`,
                        backdropFilter: `blur(0px)`,
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(0deg, 
                    transparent 0%, 
                                    color-mix(in oklab, var(--background) 20%, transparent) 60%, 
                                    color-mix(in oklab, var(--background) 30%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 80%, 
                                    color-mix(in oklab, var(--background) 50%, transparent) 90%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 100%
                                )`,
                        backdropFilter: `blur(8px)`,
                        maskImage: `linear-gradient(0deg, 
                                    transparent 0%, 
                                    transparent 10%, 
                                    color-mix(in oklab, var(--foreground) 20%, transparent) 55%, 
                                    color-mix(in oklab, var(--foreground) 30%, transparent) 65%, 
                                    color-mix(in oklab, var(--foreground) 50%, transparent) 75%, 
                                    color-mix(in oklab, var(--foreground) 70%, transparent) 85%, 
                                    color-mix(in oklab, var(--foreground) 100%, transparent) 100%
                                )`,
                    }}
                />
            </div>
            <div className="max-w-7xl mx-auto flex flex-col gap-8 items-center">
                <h1 className="text-5xl md:text-7xl font-extralight text-muted-foreground">
                    HBench
                </h1>
            </div>
        </div>
    );
}

function Tests() {
    return (
        <div className="h-dvh max-w-7xl w-full mx-auto px-4 py-32" id="tests">
            <div className="h-full flex flex-col gap-8 items-center">
                <h1 className="text-3xl md:text-5xl font-extralight">Tests</h1>
                <div className="max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tests?.map((test) => (
                        <Link
                            key={test.value}
                            href={test.value}
                            className={`flex flex-col gap-1 bg-background/0 backdrop-blur-[1px] hover:backdrop-blur-[2px] shadow-xl hover:shadow-2xl hover:scale-[102%] transition-all duration-300 ease-in-out border border-muted-foreground/10 rounded-xl p-4`}
                        >
                            <div className="flex gap-2 items-center">
                                {test.icon}
                                <span className={`text-2xl font-semibold`}>
                                    {test.title}
                                </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {test.description}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="h-dvh max-w-7xl w-full mx-auto px-4 py-32" id="home">
            <div className="h-full flex flex-col gap-8 items-center justify-center">
                <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-center md:leading-24 lg:leading-32">
                    Think you're sharp? Let's ruin your confidence.
                </h1>
                <Link href={"#tests"}>
                    <Button className="text-xl rounded-full w-52">Tests</Button>
                </Link>
            </div>
        </div>
    );
}

function NavBar() {
    return (
        <div className="w-full fixed z-20 top-0 p-6 h-24">
            <div className="absolute -z-0 top-0 left-0 w-full h-40">
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(0deg, 
                                    transparent 0%, 
                                    transparent 25%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 45%, 
                                    color-mix(in oklab, var(--background) 45%, transparent) 50%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 65%, transparent) 85%, 
                                    color-mix(in oklab, var(--background) 75%, transparent) 100%
                                )`,
                        backdropFilter: `blur(0px)`,
                    }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: `linear-gradient(0deg, 
                    transparent 0%, 
                                    color-mix(in oklab, var(--background) 20%, transparent) 60%, 
                                    color-mix(in oklab, var(--background) 30%, transparent) 70%, 
                                    color-mix(in oklab, var(--background) 40%, transparent) 80%, 
                                    color-mix(in oklab, var(--background) 50%, transparent) 90%, 
                                    color-mix(in oklab, var(--background) 60%, transparent) 100%
                                )`,
                        backdropFilter: `blur(8px)`,
                        maskImage: `linear-gradient(0deg, 
                                    transparent 0%, 
                                    transparent 10%, 
                                    color-mix(in oklab, var(--foreground) 20%, transparent) 55%, 
                                    color-mix(in oklab, var(--foreground) 30%, transparent) 65%, 
                                    color-mix(in oklab, var(--foreground) 50%, transparent) 75%, 
                                    color-mix(in oklab, var(--foreground) 70%, transparent) 85%, 
                                    color-mix(in oklab, var(--foreground) 100%, transparent) 100%
                                )`,
                    }}
                />
            </div>

            <nav className="z-10 absolute left-0 right-0 max-w-7xl w-full mx-auto flex items-center justify-between gap-8">
                <h3 className="font-bold text-3xl">HBench</h3>
                <div className="flex gap-4">
                    <Link href="#home">Home</Link>
                    <Link href="#tests">Tests</Link>
                </div>
            </nav>
        </div>
    );
}

function Page() {
    return (
        <div className="relative flex flex-col gap-10 h-full">
            <NavBar />
            <Home />
            <Tests />
            <Footer />

            <div
                className="fixed -z-10 top-0 w-full inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
        repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(75, 85, 99, 0.08) 19px, rgba(75, 85, 99, 0.08) 20px, transparent 20px, transparent 39px, rgba(75, 85, 99, 0.08) 39px, rgba(75, 85, 99, 0.08) 40px),
        radial-gradient(circle at 20px 20px, rgba(55, 65, 81, 0.12) 2px, transparent 2px),
        radial-gradient(circle at 40px 40px, rgba(55, 65, 81, 0.12) 2px, transparent 2px)
      `,
                    backgroundSize:
                        "40px 40px, 40px 40px, 40px 40px, 40px 40px",
                }}
            />
        </div>
    );
}
export default Page;
