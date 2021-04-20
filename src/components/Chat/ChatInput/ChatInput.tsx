import React from 'react';
import './ChatInput.scss';
import { observer } from 'mobx-react';
import store from '../../../store/store';
import { 
    initializeIcons,
    Icon, 
    TextField
} from '@fluentui/react';
import { IChannels } from '../../../interfaces/Interfaces';

initializeIcons();
const ezLocalTime = require('ez-local-time');

interface IInputProps {
    channel: IChannels;
}

@observer
export default class ChatInput extends React.Component<IInputProps> {
    constructor(props: IInputProps) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleKeyUp(e: any) {
        console.log("Event", e);
        if(e.key == 'Enter') {
            console.log("Entered message", e.target.value);
            if (e.target.value.replace(/\n/g, '').replace(/\s/g, '') !== '') {
                let time = ezLocalTime();
                store.addMessages({
                    id: store.messages.length,
                    author: 'Me',
                    photo: '',
                    time: `${time.date} at ${time.time}`,
                    message: e.target.value,
                    selected: false
                }, this.props.channel.id);
                e.target.value = '';
            }
        }
    }

    render() {
        const { channel } = this.props;
        return(
            <div className="chatInput">
                <Icon iconName="Attach" className="icon" />
                <Icon iconName="Microphone" className="icon" />
                <TextField 
                        multiline 
                        rows={4} 
                        placeholder={`Message in #${channel.id}`} 
                        onKeyUp={this.handleKeyUp}
                        className="textInput"
                    />
                <Icon iconName="Emoji2" className="icon" />
            </div>
        );
    }
}