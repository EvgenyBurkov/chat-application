export interface IChannels {
    id: string;
    opened: boolean;
}

export interface IMessage {
    id: number;
    author: string;
    photo: string;
    time: string;
    message: string;
    selected: boolean;
}

export interface IUser {
    id: number;
    name: string;
    position: string;
    online: boolean;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    email: string;
    skype: string;
    timezone: string;
    photo: string;
}