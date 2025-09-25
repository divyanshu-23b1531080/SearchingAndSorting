import { useEffect, useRef } from "react";
import * as d3 from "d3";

export function useD3(renderChartFn, dependencies) {
    const ref = useRef();

    useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    return ref;
}