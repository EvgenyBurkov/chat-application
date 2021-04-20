import React from 'react';
import './FriendsSection.scss';
import { IPersonaSharedProps, Persona, PersonaSize, PersonaPresence } from '@fluentui/react/lib/Persona';
import { Stack } from '@fluentui/react/lib/Stack';
import { observer } from 'mobx-react';
import store from '../../../store/store';
import Profile from './Profile/Profile';

@observer
export default class FriendsSection extends React.Component {
    state = {
        loading: false,
        visible: false,
    };
    
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    
    handleCancel = () => {
        this.setState({ visible: false });
    };
    
    render() {
        console.log("User", store.users);
        const { visible } = this.state;
        return (
            <>
                <div className="users">
                    <div className='usersHeader'>
                        <span>FRIENDS</span>
                        <span>{store.countFriends}</span>
                    </div>
                    <div className="friendsList">
                        {store.users.map((user, index) => {                            
                            const key = 'user' + index;
                            let className = '';
                            if(user.online) {
                                className = 'online';
                            }
                            else {
                                className = 'offline';
                            }
                            return (
                                <Profile key={key} className={className} user={user} />
                            );
                        })}
                    </div>
                </div>
            </>            
        );
    }
}

/* 

const userProps: IPersonaSharedProps = {
    text: user.name,
    secondaryText: user.position
};
<Stack tokens={{ childrenGap: 10 }}>     
    <Persona
        {...userProps}
        size={PersonaSize.size40}
        presence={user.online ? PersonaPresence.online : PersonaPresence.offline}
        imageUrl={require(`../../../img/${user.photo}`)["default"]}
        coinSize={40}   
        onClick={() => {
            console.log('Был нажат профиль пользователя');
            store.setIsOpen(true);
            console.log("isOpen", store.isOpen);
        }}                 
    />
</Stack>   
*/