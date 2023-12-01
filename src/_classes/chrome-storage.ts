import { HistoryRecord } from "../History/History";
import { SortBy } from "../Settings/Settings";
import { Issue, Project, UserData } from "./models";

export class ChromeStorage {
    setHistory(history: HistoryRecord[]): Promise<void> {
        return chrome.storage.sync.set({ history });
    }

    async getHistory(): Promise<HistoryRecord[]> {
        return (await (chrome.storage.sync.get('history') as Promise<{history: HistoryRecord[]}>)).history;
    }

    setSortBy(sortBy: SortBy): Promise<void> {
        return chrome.storage.sync.set({ sortBy });
    }

    async getSortBy(): Promise<SortBy> {
        return (await (chrome.storage.sync.get('sortBy') as Promise<{sortBy: SortBy}>)).sortBy;
    }

    async getUser(): Promise<UserData> {
        return (await (chrome.storage.sync.get('user') as Promise<{user: UserData}>)).user;
    }

    setUser(user: UserData): Promise<void> {
        return chrome.storage.sync.set({ user });
    }

    async getProject(): Promise<Project> {
        return (await (chrome.storage.sync.get('project') as Promise<{project: Project}>)).project;
    }

    setProject(project: Project): Promise<void> {
        return chrome.storage.sync.set({ project });
    }

    async getBoard(): Promise<string> {
        return (await (chrome.storage.sync.get('board') as Promise<{board: string}>)).board;
    }

    setBoard(board: string): Promise<void> {
        return chrome.storage.sync.set({ board });
    }

    async getMax(): Promise<string> {
        return (await (chrome.storage.sync.get('max') as Promise<{max: string}>)).max;
    }

    setMax(max: string): Promise<void> {
        return chrome.storage.sync.set({ max });
    }

    async getShowAll(): Promise<boolean> {
        return (await (chrome.storage.sync.get('showAll') as Promise<{showAll: boolean}>)).showAll;
    }

    setShowAll(showAll: boolean): Promise<void> {
        return chrome.storage.sync.set({ showAll });
    }

    async getDaily(): Promise<string> {
        return (await (chrome.storage.sync.get('daily') as Promise<{daily: string}>)).daily;
    }

    async getFavorites(): Promise<Issue[]> {
        return (await (chrome.storage.sync.get('favs') as Promise<{favs: Issue[]}>)).favs;
    }

    setFavs(favs: Issue[]) {
        return chrome.storage.sync.set({ favs });
    }

    setDaily(daily: string): Promise<void> {
        console.log(daily);
        return chrome.storage.sync.set({ daily });
    }

    clear(): Promise<void> {
        return chrome.storage.sync.clear();
    }
}

// https://jira.int.tsum.com/rest/agile/1.0/board/234/issue?fields=status,summary&jql=status!=done+and+status!=Closed+and+status!=Cancelled+order+by+id+desc&maxResults=100
// https://jira.int.tsum.com/rest/agile/1.0/board/281
// https://jira.int.tsum.com/rest/api/2/search?jql=project=%22GEO%22&fields=status,summary
// https://jira.int.tsum.com/rest/api/2/search?jql=assignee=gakopyan+and+project=an&fields=status,summary
// https://jira.int.tsum.com/rest/agile/1.0/board/281/issue?fields=status,summary&jql=status!=done+and+status!=Closed+and+status!=Cancelled+order+by+id+desc&maxResults=100