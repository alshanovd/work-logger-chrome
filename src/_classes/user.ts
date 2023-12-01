import { Api } from "./api";
import { Project, UserData } from "./models";
import { ChromeStorage } from "./chrome-storage";
// import { View } from "./view";


export class User {
    storage = new ChromeStorage();
    api = new Api();
    // view = new View();
    user?: UserData;
    board?: string;
    project?: Project;

    async checkUser(): Promise<void> {
        const savedUser = await this.storage.getUser();
        if (savedUser.name) {
            this.user = savedUser;
            await this.checkAuth();
        } else {
            const user = await this.api.getUser();
            this.storage.setUser(user);
            
            this.user = user;
        }
    }

    async checkProjectAndBoard(): Promise<boolean> {
        const project = await this.storage.getProject();
        const board = await this.storage.getBoard();
        if (project && board) {
            this.board = board;
            this.project = project;
            console.log(project);
            console.log(board);
            return true;
        } else {
            const projects = await this.api.getProjects();
            // this.view.showProjectList(projects);
            return false;
        }
    }

    private async checkAuth(): Promise<void> {
        try {
            await this.api.getUser();
        } catch {
            // this.view.authRequired();
        }
    }
}