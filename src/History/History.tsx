import { useMemo, useState } from "react";
import { ChromeStorage } from "../_classes/chrome-storage";

export interface HistoryRecord {
    key: string;
    summary: string;
    timeString: string;
    timeNumber: number;
}

export const History = () => {
    const storage = useMemo(() => new ChromeStorage(), []);
    const [history, setHistory] = useState([]);

    if (history.length === 0) {
        storage.getHistory().then((history) => {
            console.log(history);
        });
    }

    return <div></div>;
};
