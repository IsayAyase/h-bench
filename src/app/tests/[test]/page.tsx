import type { ReactNode } from "react";
import type { TestType } from "../components/Tests";
import Aim from "./views/Aim";
import ReactionTest from "./views/ReactionTime";
import SequenceMemory from "./views/SequenceMemory";

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
        case "analytics":
        case "settings":
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
