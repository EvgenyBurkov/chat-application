import React from 'react';
import './Chat.scss';
import ChatHeader from './ChatHeader/ChatHeader';
import ChatBody from './ChatBody/ChatBody';
import ChatInput from './ChatInput/ChatInput';
import { observer } from 'mobx-react';
import store from '../../store/store';
import { Switch, Route } from 'react-router-dom';

import { Col } from 'antd';

@observer
export default class Chat extends React.Component {
    render() {
        return(
            <Col className='chat' flex='auto'>
      
                <Switch>

                    <Route path='/general' exact>
                        <ChatHeader channel={
                            {
                                "id": "general",
                                "opened": true
                            }
                        }/>
                        <ChatBody />
                        <ChatInput channel={
                            {
                                "id": "general",
                                "opened": true
                            }
                        } />
                    </Route>
                    
                    {store.channels.map((channel, index) => {                        
                        return (
                            <Route key={index} path={`/${channel.id}`}>
                                <ChatHeader channel={channel}/>
                                <ChatBody />
                                <ChatInput channel={channel} />
                            </Route>
                        );
                    })} 
                
                </Switch>

            </Col>        
        );
    }
}
