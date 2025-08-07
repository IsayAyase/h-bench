const ProgressBar = ({
    value,
    total,
    postfix,
    reverse,
    showValues = true,
    className,
    direction = "left",
}: {
    value: number;
    total: number;
    postfix?: string;
    reverse?: boolean;
    showValues?: boolean;
    className?: string;
    direction?: "left" | "right";
}) => {
    return (
        <div className={`flex flex-col ${className}`} title={`${value}`}>
            <div
                data-direction={direction}
                className="w-full max-w-3xs h-1 bg-muted-foreground/10 rounded-full flex data-[direction=right]:justify-end"
            >
                <div
                    className={`h-full transition-all duration-300 ease-out rounded-full`}
                    style={{
                        width: `${(value / total) * 100}%`,
                        backgroundColor: reverse
                            ? (value / total) * 10 < 2.5
                                ? "var(--destructive)"
                                : "var(--foreground)"
                            : (value / total) * 10 > 7.5
                            ? "var(--destructive)"
                            : "var(--foreground)",
                    }}
                ></div>
            </div>
            {showValues && (
                <div className="flex items-end justify-end italic font-bold">
                    <span className="text-4xl">
                        {value}
                        {postfix}
                    </span>
                    <span>
                        /{total}
                        {postfix}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
