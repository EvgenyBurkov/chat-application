import axios from 'axios';
import { IMessage, IChannels } from '../interfaces/Interfaces';

class API {
    client: any = null;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:3003/',
            withCredentials: true
        });
        this.client.interceptors.request.use(
            function (config: any) {
                return config;
            },
            function (error: any) {
                return Promise.reject(error);
            }
        );
    }

    getChannels() {
        return this.client.get('/channels');
    }

    getUsers() {
        return this.client.get('/users');
    }

    getMessages(channelsTitle: string) {
        return this.client.get(`/${channelsTitle}`);
    }

    sendMessage(message: IMessage, channel: string) {
        return this.client.post(`${channel}`, message);
    }

    updateChat(channelTitle: string, data: IChannels) {
        console.log("channelTitle", channelTitle);
        console.log("data", data);
        return this.client.put(`/channels/${channelTitle}`, data);
    }

    deleteMessage(index: number, channelTitle: string) {
        return this.client.delete(`/chats/${channelTitle}/messages/${index}`)
    }
}

const api = new API();
export default api;