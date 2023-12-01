import { FaBars, FaCalendar, FaCog, FaHistory } from "react-icons/fa";
import { ScreenType } from "../App";
import "./Menu.css";

function Menu({
    setScreen,
    screen,
}: {
    setScreen: (screen: ScreenType) => void;
    screen: string;
}) {
    return (
        <div className="menu">
            <div className="top">
                <FaBars
                    onClick={(e) => setScreen(ScreenType.LIST)}
                    size={25}
                    className={
                        "settings" +
                        (screen === ScreenType.LIST ? " active" : "")
                    }
                />
                {/* <FaHistory
                    onClick={(e) => setScreen(ScreenType.HISTORY)}
                    size={25}
                    className={
                        "settings" +
                        (screen === ScreenType.CALENDAR ? " active" : "")
                    }
                /> */}
            </div>
            <FaCog
                onClick={(e) => setScreen(ScreenType.SETTINGS)}
                size={25}
                className={
                    "settings" +
                    (screen === ScreenType.SETTINGS ? " active" : "")
                }
            />
        </div>
    );
}

export default Menu;
