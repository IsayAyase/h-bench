const ProgressBar = ({
    value,
    total,
    postfix,
    reverse,
    showValues = true,
    className,
}: {
    value: number;
    total: number;
    postfix?: string;
    reverse?: boolean;
    showValues?: boolean;
    className?: string;
}) => {
    return (
        <div className={`flex flex-col gap-1 ${className}`} title={`${value}`}>
            {showValues && (
                <div className="flex justify-end">
                    <span className="">
                        {value}
                        {postfix} / {total}
                        {postfix}
                    </span>
                </div>
            )}
            <div className="w-full max-w-3xs h-1 bg-muted-foreground/10 rounded-full">
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
        </div>
    );
};

export default ProgressBar;
