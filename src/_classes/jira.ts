import { Api } from "./api";
import { Project, Sprint } from "./models";
import { User } from "./user";

export class Jira {
    api = new Api();
    user: User;
    sprints: Sprint[] = [];

    constructor(user: User) {
        this.user = user;
    }

    async getSprints(): Promise<void> {
        this.sprints = await this.api.getSprints(this.user.board!);
    }

    async sprintsAndIssues(): Promise<void> {
        // await this.getSprints();
        // await this.api.getIssues(this.sprints, this.user.project!);
    }
}