import { Button, CircularProgress } from "@mui/joy";
import { useEffect, useMemo, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./App.css";
import Auth from "./Auth/Auth";
import Dashboard from "./Dashboard/Dashboard";
import Menu from "./Menu/Menu";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import { Api } from "./_classes/api";
import { ChromeStorage } from "./_classes/chrome-storage";
import { UserData } from "./_classes/models";
import { History } from "./History/History";

export enum ScreenType {
    LIST = "list",
    CALENDAR = "calendar",
    SETTINGS = "settings",
    HISTORY = "HISTORY",
}

function App() {
    const [user, setUser] = useState<UserData | null | undefined>(undefined);
    const [screen, setScreen] = useState<ScreenType>(ScreenType.LIST);
    const storage = useMemo(() => new ChromeStorage(), []);
    const [board, setBoard] = useState<string>();
    const api = useMemo(() => new Api(), []);
    const nodeRef = useRef(null);

    useEffect(() => {
        storage.getUser().then((user) => {
            if (user) {
                api.getUser().catch(() => setUser(null)); // check auth
                setUser(user);
            } else {
                api.getUser()
                    .then((user) => {
                        storage.setUser(user);
                        return setUser(user);
                    })
                    .catch(() => {
                        setUser(null);
                    });
            }
        });
    }, [storage, api]);

    const switchTab = () => console.log("show closed and done issues");

    return (
        <div className="App">
            <div className="glass-container">
                {!!user && (
                    <>
                        <Menu setScreen={setScreen} screen={screen}></Menu>
                        <Profile user={user} board={board}></Profile>
                    </>
                )}
                <CSSTransition
                    in={!!user}
                    nodeRef={nodeRef}
                    timeout={300}
                    classNames="alert"
                    mountOnEnter
                >
                    <div ref={nodeRef}>
                        {!!user && screen === ScreenType.LIST && (
                            <Dashboard
                                user={user!}
                                setBoard={setBoard}
                                board={board}
                            />
                        )}
                    </div>
                </CSSTransition>
                {user === undefined && (
                    <CircularProgress
                        size="lg"
                        variant="plain"
                        thickness={2}
                        color="neutral"
                    />
                )}
                {user === null && <Auth />}
                {screen === ScreenType.SETTINGS && (
                    <Settings setBoard={setBoard}></Settings>
                )}
                {screen === ScreenType.HISTORY && <History></History>}
            </div>
        </div>
    );
}

export default App;
