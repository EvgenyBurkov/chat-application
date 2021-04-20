import React from 'react';
import './ChatBody.scss';
import { observer } from 'mobx-react';
import store from '../../../store/store';
import { IMessage } from '../../../interfaces/Interfaces';
import { Text } from '@fluentui/react/lib/Text';
import api from '../../../api/API';


@observer
export default class ChatBody extends React.Component<any> {

    render() {
        const {
            filteredMessages,
            messages,
            search
        } = store;
        console.log("Messages", filteredMessages);
        return (
            <div className="chatBody">
                {filteredMessages.map((message, index) => {
                        const key = 'message' + index;
                        return(
                            <div key={key} className='message'>
                                <div className="photo">
                                    <img src={require(`../../../img/${message.photo}`)["default"]} className="personPhoto" />
                                </div>
                                <div className='wrapper'>
                                    <span className='sender'>{message.author} ({message.time}):</span>
                                    <Text block variant={'large'}>{message.message}</Text>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}