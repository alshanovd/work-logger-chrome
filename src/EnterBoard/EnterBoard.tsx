import { Button, Input } from "@mui/joy";
import { useMemo, useState } from "react";
import { FaJira } from "react-icons/fa";
import { ChromeStorage } from "../_classes/chrome-storage";
import "./EnterBoard.css";

export const sxInput = {
    backgroundColor: "rgba(0,0,0,0.2)",
    "--Input-focusedHighlight": "none",
    color: "white",
    border: "0",
    "&:hover": {
        color: "white",
    },
};

export const sxInputButton = {
    backgroundColor: "rgba(255,255,255,0.8)",
    "&:hover": {
        backgroundColor: "rgba(255,255,255,1)",
    },
    "&.Mui-disabled": {
        opacity: "0.8",
    },
    transition: "all 0.2s ease-in-out",
    color: "black",
};

function EnterBoard(props: { setBoard: (board: string) => void }) {
    const storage = useMemo(() => new ChromeStorage(), []);
    const [board, setLocalBoard] = useState<string>();
    const onEnter = () => {
        props.setBoard(board!);
        storage.setBoard(board!);
    };

    if (!board) {
        storage.getBoard().then((b) => {
            setLocalBoard(b);
        });
    }

    return (
        <>
            <Input
                className="border-radius"
                type="number"
                placeholder="Номер доски"
                startDecorator={<FaJira color="white" />}
                onChange={(e) =>
                    setLocalBoard((e.target as HTMLInputElement).value)
                }
                onKeyDown={(e) => e.code === "Enter" && onEnter()}
                value={board}
                endDecorator={
                    <Button
                        className="border-radius"
                        onClick={(e) => onEnter()}
                        disabled={!board}
                        sx={sxInputButton}
                    >
                        Сохранить
                    </Button>
                }
                sx={sxInput}
            ></Input>
        </>
    );
}

export default EnterBoard;
