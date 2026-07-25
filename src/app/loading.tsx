import { CirclesWithBar } from "react-loader-spinner";

export default function Loading() {
    return (
        <div className="min-h-[calc(100dvh-53px)] md:min-h-[calc(100dvh-82px)] flex items-center justify-center bg-background">
            <CirclesWithBar
                height="60"
                width="60"
                color="#059669"
                outerCircleColor="#059669"
                innerCircleColor="#059669"
                barColor="#059669"
                ariaLabel="circles-with-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    );
}