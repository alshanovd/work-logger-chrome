import { Button, Input, Option, Select } from "@mui/joy";
import { useMemo, useState } from "react";
import { FaBars } from "react-icons/fa";
import EnterBoard, { sxInput, sxInputButton } from "../EnterBoard/EnterBoard";
import { ChromeStorage } from "../_classes/chrome-storage";
import "./Settings.css";

export enum SortBy {
    default = "По умолчанию",
    name = "По имени задачи",
    nameDESC = "По имени задачи (обр.)",
    status = "По статусу",
}

function Settings({ setBoard }: { setBoard: (board: string) => void }) {
    const storage = useMemo(() => new ChromeStorage(), []);
    const [maxIssues, setMaxIssues] = useState<string>();
    const [showAll, setShowAll] = useState<boolean>();
    const [sortBy, setSortBy] = useState<SortBy>(SortBy.default);
    const [daily, setDaily] = useState<string>();
    const onEnterMax = () => {
        storage.setMax(maxIssues!);
    };

    console.log(sortBy);
    if (sortBy === SortBy.default || sortBy === undefined) {
        storage.getSortBy().then((sortBy) => {
            setSortBy(sortBy ?? SortBy.default);
        });
    }
    if (showAll === undefined) {
        storage.getShowAll().then((showAll) => {
            setShowAll(showAll);
        });
    }
    if (maxIssues === undefined) {
        storage.getMax().then((max) => {
            if (max) {
                setMaxIssues(max);
            }
        });
    }
    if (daily === undefined) {
        storage.getDaily().then((daily) => {
            setDaily(daily);
        });
    }

    return (
        <div className="Settings">
            <EnterBoard setBoard={setBoard}></EnterBoard>
            <Input
                value={maxIssues}
                className="border-radius"
                type="number"
                placeholder="Показать задач (по ум. 100)"
                onChange={(e) =>
                    setMaxIssues((e.target as HTMLInputElement).value)
                }
                onKeyDown={(e) => e.code === "Enter" && onEnterMax()}
                startDecorator={<FaBars color="white" />}
                endDecorator={
                    <Button
                        className="border-radius"
                        onClick={(e) => onEnterMax()}
                        disabled={!maxIssues}
                        sx={sxInputButton}
                    >
                        Сохранить
                    </Button>
                }
                sx={{ ...sxInput, mt: 2 }}
            ></Input>
            <div className="show-all">
                <input
                    type="checkbox"
                    checked={showAll}
                    id="showAll"
                    onChange={(e) => {
                        setShowAll(e.target.checked);
                        storage.setShowAll(e.target.checked);
                    }}
                />
                <label htmlFor="showAll">
                    Показывать задачи Done / Closed / Cancelled
                </label>
            </div>
            <div
                className="show-all"
                style={{ justifyContent: "space-between" }}
            >
                <label style={{ margin: "0" }}>Сортировать</label>
                <Select
                    value={sortBy}
                    onChange={(e, value) => {
                        setSortBy(value!);
                        storage.setSortBy(value!);
                    }}
                >
                    {Object.entries(SortBy).map(([value, name]) => (
                        <Option value={name}>{name}</Option>
                    ))}
                </Select>
            </div>
            <div className="show-all" style={{ justifyContent: "end" }}>
                <Button
                    className="border-radius show-all"
                    onClick={(e) => storage.clear()}
                    sx={sxInputButton}
                >
                    Сброс настроек (очистить кеш)
                </Button>
            </div>
        </div>
    );
}

export default Settings;
