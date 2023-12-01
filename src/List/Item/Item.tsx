import { Dispatch, SetStateAction } from "react";
import { FaPaperclip } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Issue } from "../../_classes/models";
import { FavAct, FavAction } from "../List";
import "./Item.css";

function Item({
    issue,
    setIssue,
    dailyKey,
    favAction,
    isFav,
}: {
    issue: Issue;
    setIssue: Dispatch<SetStateAction<Issue | undefined>>;
    dailyKey?: string;
    favAction: (action: FavAction) => void;
    isFav: boolean;
}) {
    return (
        <div
            className="Issue"
            style={
                issue.key === dailyKey
                    ? { borderTop: "1px solid", borderBottom: "1px solid" }
                    : {}
            }
        >
            <div onClick={(e) => setIssue(issue)} className="content">
                <div
                    className={
                        "status " + issue.fields.status.statusCategory.key
                    }
                >
                    {issue.fields.status.name}
                </div>
                <div className="task">{issue.key}</div>
                <div className="title" title={issue.fields.summary}>
                    {issue.fields.summary}
                </div>
            </div>
            <div
                className="pin-button"
                onClick={() =>
                    favAction({ type: FavAct.toggle, payload: issue })
                }
            >
                {isFav ? <FaXmark /> : <FaPaperclip />}
            </div>
        </div>
    );
}

export default Item;
