import { observable, computed, action } from 'mobx';
import axios from "axios";
import {
    IChannels,
    IMessage,
    IUser
} from '../interfaces/Interfaces';
import api from '../api/API';


const channelModel = {
    id: '',
    opened: false
}

const messageModel = {
    id: Number,
    author: "Me",
    photo: "me.jpg",
    time: "",
    message: "",
    selected: false
}

const userModel = {
    id: Number,
    name: "",
    position: "",
    online: false,
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    email: "",
    skype: "",
    timezone: "",
    photo: ""
}

class FormStore {

    constructor() {
        axios.all([
            api.getChannels().then(({data}: any) => {
                this.channels = data.map((channel: IChannels) => ({...channelModel, ...channel}));
            }),
            api.getUsers().then(({data}: any) => {
                this.users = data.map((user: IUser) => ({...userModel, ...user}));
            }),
            api.getMessages(this.currentChannel).then(({data}: any) => {
                this.messages = data.map((message: IMessage) => ({...messageModel, ...message}));
            })
        ]);
    }

    @observable public channels: IChannels[] = [];
    @observable public messages: IMessage[] = [];
    @observable public users: IUser[] = [];
    @observable public currentChannel: string = window.location.href.split('/')[3].length > 0 ? window.location.href.split('/')[3] : 'general';;
    @observable public isOpen: boolean = false;
    @observable public search: string = '';
    @observable public startFiltering: boolean = false;

    @computed get countChannels() {
        return this.channels.length;
    }

    @computed get countFriends() {
        return this.users.length;
    }

    @computed get filteredMessages() {
        const _search = this.search.toLowerCase()
        
        return this.messages
                    .filter(message =>
                    !!~message.author.toLowerCase().indexOf(_search)
                    || !!~message.message.toLowerCase().indexOf(_search))
    }

    @action setIsOpen(isOpen: boolean) {
        this.isOpen = isOpen;
    }

    @action addMessages(message: IMessage, channelTitle: string) {
        this.messages.push(message);
        api.sendMessage(message, channelTitle);
    }

    @action setSearch(search: string) {
        this.search = search;
    }

    @action cleanSearch() {
        this.search = '';
    }

    @action setStartFiltering(startFiltering: boolean) {
        this.startFiltering = startFiltering;
    }

    @action openChannel(title: string) {
        this.currentChannel = title;
        api.getMessages(title).then(({data}: any) => {
            this.messages = data.map((message: IMessage) => ({...messageModel, ...message}));
        });
        for(let i = 0; i < this.countChannels; i++) {
            if(this.channels[i].id !== title) {
                this.channels[i].opened = false;
            }
            else {
                this.channels[i].opened = true;
            }
            api.updateChat(this.channels[i].id, this.channels[i]);
        }
    }

    @action closeChat(channelTitle: string) {
        for (let i = 0; i < this.countChannels; i++) {
            if(this.channels[i].id === channelTitle) {
                console.log(this.channels[i]);
                this.channels[i].opened = false;
                api.updateChat(this.channels[i].id, this.channels[i]);
            }
        }
    }
}

const store = new FormStore();
export default store;
