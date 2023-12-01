import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Api } from "../_classes/api";
import "./List.css";
import { Issue } from "../_classes/models";
import Item from "./Item/Item";
import { CircularProgress } from "@mui/joy";
import { ChromeStorage } from "../_classes/chrome-storage";
import IssueDialog from "./IssueDialog/IssueDialog";
import autoAnimate from "@formkit/auto-animate";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import { SortBy } from "../Settings/Settings";

interface FavState {
    favorites: Issue[];
}

export enum FavAct {
    add = "add",
    remove = "remove",
    updateAll = "updateAll",
    toggle = "toggle",
}

export interface FavAction {
    type: FavAct;
    payload: string | Issue[] | Issue;
}

function List(props: { board: string }) {
    const api = useMemo(() => new Api(), []);
    const storage = useMemo(() => new ChromeStorage(), []);
    const [issues, setIssues] = useState<Issue[]>();
    const [chosenIssue, setChosenIssue] = useState<Issue>();
    const [dailyKey, setDailyKey] = useState<string>();
    const parentRef = useRef(null);
    const [favorites, dispatch] = useReducer(reducer, { favorites: [] });

    useEffect(() => {
        if (parentRef.current) {
            autoAnimate(parentRef.current);
        }
        if (!issues) {
            loadList().then((issues) => {
                setIssues(issues);
            });
        }
    }, [parentRef]);

    function reducer(state: FavState, action: FavAction): FavState {
        switch (action.type) {
            case FavAct.toggle:
                const payload = action.payload as Issue;
                let favorites: Issue[] = [];
                if (state.favorites.some((f) => f.key === payload.key)) {
                    favorites = state.favorites.filter(
                        (f) => f.key !== payload.key
                    );
                } else {
                    favorites = [...state.favorites, action.payload as Issue];
                }
                storage.setFavs(favorites);
                return { favorites };

            case FavAct.updateAll:
                return {
                    favorites: action.payload as Issue[],
                };
        }
        return state;
    }

    const favAction = (action: FavAction) => {
        dispatch(action);
    };

    async function loadList(): Promise<Issue[]> {
        const max = await storage.getMax();
        const all = await storage.getShowAll();
        const key = await storage.getDaily();
        const favs = await storage.getFavorites();
        const sortBy = await storage.getSortBy();
        setDailyKey(key);
        dispatch({ type: FavAct.updateAll, payload: favs || [] });
        const issues = await api.getIssues(props.board, max, all);
        switch (sortBy) {
            case SortBy.status:
                return issues.sort(
                    (i1, i2) => +i1.fields.status.id - +i2.fields.status.id
                );
            case SortBy.name:
                return issues.sort((i1, i2) =>
                    i1.fields.summary.localeCompare(i2.fields.summary)
                );
            case SortBy.nameDESC:
                return issues.sort((i1, i2) =>
                    i2.fields.summary.localeCompare(i1.fields.summary)
                );
            default:
                return issues;
        }
    }

    return (
        <>
            <div className={"List" + (issues ? " show" : "")}>
                {favorites.favorites?.map((issue) => (
                    <Item
                        setIssue={setChosenIssue}
                        issue={issue}
                        favAction={favAction}
                        isFav={true}
                    ></Item>
                ))}
                {favorites.favorites.length ? <hr /> : ""}
                {issues
                    ?.filter(
                        (i) => !favorites.favorites.some((f) => f.key === i.key)
                    )
                    .map((issue) => (
                        <Item
                            dailyKey={dailyKey}
                            setIssue={setChosenIssue}
                            issue={issue}
                            favAction={favAction}
                            isFav={false}
                        ></Item>
                    ))}
            </div>
            {!issues && (
                <CircularProgress
                    size="lg"
                    variant="plain"
                    thickness={2}
                    sx={{ "--CircularProgress-progressColor": "white" }}
                />
            )}
            <div className={"overlay" + (chosenIssue ? " show" : "")}>
                <div
                    onClick={() => setChosenIssue(undefined)}
                    className="overlay-click"
                ></div>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                >
                    <IssueDialog
                        setIssue={setChosenIssue}
                        issue={chosenIssue}
                    ></IssueDialog>
                </LocalizationProvider>
            </div>
        </>
    );
}

export default List;
