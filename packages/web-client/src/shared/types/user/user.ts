export interface IShortUser {
    id: string;
    fullname: string;
    position: string;
}

export interface IUser {
    id: string
    fullname: string;
    position: string;
    email: string;
    additionalInfo: string;
    organization?: string;
}
