import { useLayoutEffect, useRef } from "react";

/**
* A custom useEffect hook that only triggers on updates, not on initial mount
*/
export function CustomUseEffect(effect: () => void, dependencies:Array<any> = []) {
    const isInitialMount = useRef(true);
    useLayoutEffect(() => {
        if (isInitialMount.current)
            isInitialMount.current = false;
        else
            effect();
    }, dependencies);
}