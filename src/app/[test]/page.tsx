import type { TestType } from "@/data/test";
import type { ReactNode } from "react";
import Aim from "./views/Aim";
import ClickSpeed from "./views/ClickSpeed";
import NumberMemory from "./views/NumberMemort";
import ReactionTest from "./views/ReactionTime";
import SequenceMemory from "./views/SequenceMemory";
import TypingSpeed from "./views/TypingSpeed";
import VisualMemory from "./views/VisualMemory";

async function page({ params }: { params: { test: TestType } }) {
    const { test } = await params;
    let comp: null | ReactNode = null;
    let title: null | string = null;
    switch (test) {
        case "reaction-time":
            title = "Reaction Test";
            comp = <ReactionTest />;
            break;
        case "sequence-memory":
            title = "Sequence Memory";
            comp = <SequenceMemory />;
            break;
        case "aim":
            title = "Aim";
            comp = <Aim />;
            break;
        case "visual-memory":
            title = "Visual Memory";
            comp = <VisualMemory />;
            break;
        case "number-memory":
            title = "Number Memory";
            comp = <NumberMemory />;
            break;
        case "click-speed":
            title = "Click Speed";
            comp = <ClickSpeed />;
            break;
        case "typing-speed":
            title = "Typing Speed";
            comp = <TypingSpeed />;
            break;
        default:
            comp = <>no page</>;
    }

    return (
        <div className={`relative h-full`}>
            {title && (
                <h1
                    data-test={test}
                    className="absolute top-0 mt-1 md:mt-0 text-3xl md:text-5xl h-fit data-[test=reaction-time]:text-white"
                >
                    {title}
                </h1>
            )}
            {comp}
        </div>
    );
}

export default page;
