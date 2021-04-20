import React from 'react';
import './ChannelsSection.scss';
import { 
    initializeIcons,
    Icon
} from "@fluentui/react";
import { NavLink } from 'react-router-dom';
import { observer } from 'mobx-react';
import store from '../../../store/store';

initializeIcons();

@observer
class ChannelsSection extends React.Component<any> {

    render() {        

        const {
            channels,
            openChannel
        } = store;

        console.log("Channels", channels);

        return(
            <React.Fragment>
                <div className="nomadHeader">
                    <span style={{ fontSize: '20px' }}>Nomad List <Icon iconName="ChevronDown" className="downIcon" /></span>                    
                    <Icon iconName="Settings" className="icon" style={{ paddingTop: "5px" }} />
                </div>
                <div className="threads">
                    <div className="threads-all">
                        <Icon iconName="CannedChat" className="icon" />
                        <span className='text'>All threads</span>
                    </div>
                </div>

                <div className="channels">
                    <div className='channelsHeader'>
                        <span>CHANNELS</span>
                        <span>{store.countChannels}</span>
                    </div>
                    <div className="channelsList">
                        {channels.map((channel, index) => {
                            let listClassName ='';
                            if(channel.opened) {
                                listClassName = ' open';
                            }
                            const key = 'channel' + index;
                            console.log("Channel's key", key);
                            return (
                                <div key={key} className={`item${listClassName}`}>
                                    <NavLink to={`/${channel.id}`} onClick={() => { 
                                        console.log("Channel", channel);
                                        openChannel(channel.id);
                                    }}>
                                        #{channel.id}
                                    </NavLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ChannelsSection;