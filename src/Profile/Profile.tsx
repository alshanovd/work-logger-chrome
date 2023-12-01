import { FaJira } from "react-icons/fa";
import { UserData } from "../_classes/models";
import "./Profile.css";

function Profile({ user, board }: { user: UserData; board?: string }) {
    return (
        <div className="Profile">
            <div>
                <img src={user.avatarUrls!["48x48"]} alt="Avatar" />
                <h2 className="name">{user.displayName}</h2>
            </div>
            <div>
                {board && (
                    <div className="board">
                        <span>{board}</span>
                        <FaJira />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;
