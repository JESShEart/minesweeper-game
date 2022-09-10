import { useEffect } from "preact/hooks";

export function useUpdateTitle(routeTitle: string): void {
    useEffect(function() {
        document.title = `Minesweeper Game - ${routeTitle}`;
    }, []);
}
