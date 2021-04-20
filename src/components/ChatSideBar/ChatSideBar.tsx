import React from 'react';
import { observer } from 'mobx-react';
import ChannelsSection from './ChannelsSection/ChannelsSection';
import FriendsSection from './FriendsSection/FriendsSection';

@observer
class ChatSideBars extends React.Component {    
    render() {
        return(
            <div className="nav-bar">
                <ChannelsSection />
                <FriendsSection />
            </div>
        );
    }
}

export default ChatSideBars;