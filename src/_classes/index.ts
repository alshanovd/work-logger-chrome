import { Jira } from "./jira";
import { User } from "./user";

async function init(): Promise<void> {
    const user = new User();
    await user.checkUser();
    const allRight = await user.checkProjectAndBoard();
    
    if (allRight) {
        const jira = new Jira(user);
        jira.sprintsAndIssues();
    }

    const clear = document.getElementById('clear');
    // clear.addEventListener('click', () => {
    //     chrome.storage.sync.remove('project');
    //     chrome.storage.sync.remove('board');
    // })
}

init().then();