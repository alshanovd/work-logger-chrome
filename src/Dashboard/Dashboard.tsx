import { useEffect, useMemo } from "react";
import EnterBoard from "../EnterBoard/EnterBoard";
import List from "../List/List";
import { ChromeStorage } from "../_classes/chrome-storage";
import { UserData } from "../_classes/models";
import "./Dashboard.css";

const Dashboard = ({
    user,
    setBoard,
    board,
}: {
    user: UserData;
    setBoard: (b: string) => void;
    board?: string;
}) => {
    const storage = useMemo(() => new ChromeStorage(), []);
    useEffect(() => {
        storage.getBoard().then((b) => setBoard(b));
    });

    return (
        <>
            {!board && <EnterBoard setBoard={setBoard}></EnterBoard>}
            {board && <List board={board}></List>}
        </>
    );
};

export default Dashboard;
