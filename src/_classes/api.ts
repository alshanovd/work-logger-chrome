import { Issue, Project, Sprint, UserData } from "./models";

export class Api {
    async getUser(): Promise<UserData> {
        const user = await fetch("https://jira.int.tsum.com/rest/api/2/myself");
        return user.json();
    }

    async getProjects(): Promise<Project[]> {
        const url =
            "https://jira.int.tsum.com/rest/api/2/issue/createmeta?issuetypeNames=";
        let request = await fetch(url);
        return (await (request.json() as Promise<{ projects: Project[] }>))
            .projects;
    }

    async getSprints(board: string): Promise<Sprint[]> {
        const url = `https://jira.int.tsum.com/rest/agile/1.0/board/${board}/sprint?state=active&maxResults=3`;
        const response = await fetch(url);

        const json = await response.json();
        return json.values;
    }

    async chargeTime(task = '', timeSpent = '', started = '', comment = '') {
        const charge = await this.chargeTimeRequest(task, timeSpent, started, comment);
        return charge.status;
    }

    async chargeTimeRequest(issue = '', timeSpent = '', started = '', comment = '') {
        const url = `https://jira.int.tsum.com/rest/api/2/issue/${issue}/worklog`;
        const data = {
            started,
            timeSpent,
            comment,
        };
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(data)
        });
    }

    async getIssues(board: string, max = '100', all = false): Promise<Issue[]> {
        const url = `https://jira.int.tsum.com/rest/agile/1.0/board/${board}/issue?fields=status,summary&jql=${all ? '' : 'status!=done+and+status!=Closed+and+status!=Cancelled+'}order+by+id+desc&maxResults=${max}`;

        const response = await fetch(url);

        return (await response.json()).issues;
    }

    async getAssignedIssues(name: string): Promise<Issue[]> {
        const url = `https://jira.int.tsum.com/rest/agile/1.0/board/${'234'}/issue?jql=assignee=${name}&fields=status,summary&status!=Done+and+status!=Closed+and+status!=Cancelled+order+by+id+desc`;
        const response = await fetch(url);

        return (await response.json()).issues;
    }
}
