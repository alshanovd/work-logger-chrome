export interface Project {
    key: string;
    name: string;
    avatarUrls: Avatar;

}

export interface Avatar {
    '48x48': string;
}

export interface UserData {
    displayName: string;
    emailAddress: string;
    name: string;
    avatarUrls: Avatar;
}

export interface Sprint {
    id: number;
    self: string;
    state: string;
    name: string;
    startDate: string;
    endDate: string;
    originBoardId: number;
    goal: string;
}

export interface Issue {
    expand: string;
    id: string;
    self: string;
    key: string;
    fields: {
        summary: string;
        status: {
            self: string;
            description: string;
            iconUrl: string;
            name: string;
            id: string;
            statusCategory: {
                self: string;
                id: number;
                key: string;
                colorName: string;
                name: string;
            }
        }
    }
}