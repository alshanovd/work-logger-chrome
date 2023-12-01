import { Button, CircularProgress, Input } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import {
    ChangeEvent,
    Dispatch,
    SetStateAction,
    useMemo,
    useReducer,
    useState,
} from "react";
import { FaCheck, FaCircleInfo, FaClock, FaXmark } from "react-icons/fa6";
import { sxInput, sxInputButton } from "../../EnterBoard/EnterBoard";
import { Api } from "../../_classes/api";
import { Issue } from "../../_classes/models";
import "./IssueDialog.css";
import { Alert, AlertColor, AlertTitle } from "@mui/material";
import { FaInfo } from "react-icons/fa";

interface TimeAction {
    type: AddTime;
    payload?: string | dayjs.Dayjs;
}

enum AddTime {
    add30m = "30m",
    add1h = "1h",
    add7h30m = "7h30m",
    reset = "",
    comment = "comment",
    day = "day",
}

interface TimeState {
    text: string;
    seconds: number;
    comment?: string;
    day?: dayjs.Dayjs;
}

const secToText = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = (seconds % 3600) / 60;
    return (h ? h + "h" : "") + (m ? " " + m + "m" : "");
};

const reducer = (state: TimeState, action: TimeAction): TimeState => {
    switch (action.type) {
        case AddTime.add30m:
            return {
                ...state,
                seconds: state.seconds + 1800,
                text: secToText(state.seconds + 1800),
            };
        case AddTime.add1h:
            return {
                ...state,
                seconds: state.seconds + 3600,
                text: secToText(state.seconds + 3600),
            };
        case AddTime.add7h30m:
            return {
                ...state,
                seconds: state.seconds + 27000,
                text: secToText(state.seconds + 27000),
            };
        case AddTime.reset:
            return {
                seconds: 0,
                text: "",
                comment: "",
                day: dayjs(),
            };
        case AddTime.comment:
            return {
                ...state,
                comment: action.payload as string,
            };
        case AddTime.day:
            return {
                ...state,
                day: action.payload as Dayjs,
            };
        default:
            return state;
    }
};

function IssueDialog({
    issue,
    setIssue,
}: {
    issue?: Issue;
    setIssue: Dispatch<SetStateAction<Issue | undefined>>;
}) {
    const api = useMemo(() => new Api(), []);
    const initialState: TimeState = {
        text: "",
        seconds: 0,
        day: dayjs(),
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [notify, setNotify] = useState<{
        type: true | false;
        show: boolean;
    }>({ type: true, show: false });

    const chargeTime = async () => {
        if (isLoading || notify.show) {
            return;
        }
        setIsLoading(true);

        try {
            const chargeStatus = await api.chargeTime(
                issue!.key,
                state.text,
                state.day!.toISOString().replace("Z", "-0000"),
                state.comment
            );
            if (chargeStatus === 201) {
                setNotify({ type: true, show: true });
                console.log(`Списано`, state, issue?.key);
            }
        } catch {
            setNotify({ type: false, show: true });
            console.error("Ошибка");
        }
        setTimeout(() => {
            setNotify({ type: true, show: false });
            dispatch({ type: AddTime.reset });
        }, 3000);
        setIsLoading(false);
    };

    return (
        <div className="IssueDialog">
            <div className="header">
                <DatePicker
                    value={state.day}
                    slotProps={{
                        layout: {
                            sx: {
                                color: "white",
                                background: "rgba(0, 0, 0, 0.8)",
                                height: "290px",
                                borderRadius: "2px",
                            },
                        },
                        day: {
                            sx: {
                                color: "white",
                                background: "rgba(0, 0, 0, 0.6)",
                            },
                        },
                        inputAdornment: {
                            sx: {
                                filter: "invert(100%)",
                            },
                        },
                        calendarHeader: {
                            sx: {
                                margin: "7px 0",
                            },
                        },
                    }}
                    onChange={(e) =>
                        dispatch({ type: AddTime.day, payload: e! })
                    }
                />
                <div className="title">
                    <a
                        href={"https://jira.int.tsum.com/browse/" + issue?.key}
                        className="number"
                        target="_blank"
                        rel="noreferrer"
                    >
                        {issue?.key}
                    </a>
                </div>
            </div>
            <div className="title">
                <span>{issue?.fields.summary}</span>
            </div>
            <Input
                value={state.text}
                className="border-radius"
                placeholder="Время"
                startDecorator={<FaClock color="white" />}
                onChange={(e) => console.log(e)}
                endDecorator={
                    <div className="time-buttons">
                        <FaXmark
                            color="white"
                            onClick={() => dispatch({ type: AddTime.reset })}
                            style={{ cursor: "pointer" }}
                        />
                        <Button
                            className="border-radius time-button"
                            onClick={(e) => dispatch({ type: AddTime.add30m })}
                            sx={sxInputButton}
                        >
                            +30m
                        </Button>
                        <Button
                            className="border-radius time-button"
                            onClick={(e) => dispatch({ type: AddTime.add1h })}
                            sx={sxInputButton}
                        >
                            +1h
                        </Button>
                        <Button
                            className="border-radius time-button"
                            onClick={(e) =>
                                dispatch({ type: AddTime.add7h30m })
                            }
                            sx={sxInputButton}
                        >
                            +7h 30m
                        </Button>
                    </div>
                }
                sx={{ ...sxInput, fontWeight: "bold" }}
            ></Input>
            <Input
                className="border-radius"
                placeholder="Комментарий (необязательно)"
                sx={sxInput}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                        type: AddTime.comment,
                        payload: e.target.value,
                    })
                }
            ></Input>
            <div className="charge-buttons">
                <Button
                    className="border-radius time-button"
                    onClick={(e) => setIssue(undefined)}
                    sx={sxInputButton}
                >
                    Отмена
                </Button>
                <Button
                    className="border-radius time-button"
                    disabled={!state.text}
                    sx={sxInputButton}
                    style={
                        notify.show
                            ? notify.type
                                ? { backgroundColor: "green" }
                                : { backgroundColor: "red" }
                            : {}
                    }
                    onClick={() => chargeTime()}
                >
                    {notify.show ? (
                        notify.type ? (
                            <FaCheck style={{ width: "58.5px " }} />
                        ) : (
                            <FaCircleInfo style={{ width: "58.5px " }} />
                        )
                    ) : isLoading ? (
                        <CircularProgress sx={{ width: "58.5px " }} />
                    ) : (
                        "Списать"
                    )}
                </Button>
            </div>
        </div>
    );
}

export default IssueDialog;
