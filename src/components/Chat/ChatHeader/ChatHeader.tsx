import React from 'react';
import './ChatHeader.scss';
import store from '../../../store/store';
import { observer } from 'mobx-react';
import { 
    SearchBox,
    ISearchBoxStyles,
    initializeIcons,
    Icon, 
} from '@fluentui/react';
import { IChannels } from '../../../interfaces/Interfaces';

import { Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

initializeIcons();
const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 255 } };

interface IChatProps {
    channel: IChannels;
}

@observer
export default class ChatHeader extends React.Component<IChatProps> {
    constructor(props: IChatProps) {
        super(props);
    }

    render() {
        const { channel } = this.props;
        console.log("Select channel", channel);
        
        return (
            <div className='chatHeader'>
                <div className="wrapper">
                    <Tooltip title='Close'>
                        <NavLink to='/'>
                            <Icon iconName="PageLeft" className='icon-control' onClick={() => {store.closeChat(channel.id)}} />
                        </NavLink>
                    </Tooltip>
                    <span className='channelTitle'>#{channel.id}</span>
                </div>
                <div className='meta'>
                    <div className="chatMembers">
                        <Icon iconName="Contact" className="icon" />
                        <span>1</span>
                    </div>
                    <SearchBox
                        styles={searchBoxStyles}
                        placeholder="Search..."
                        onChange={(event, newValue) => {
                            store.setSearch(String(newValue));
                        }}
                    />
                    <Icon iconName="Ringer" className="icon" />
                    <Icon iconName="MoreVertical" className="icon" />
                </div>
            </div>
        );
    }
}