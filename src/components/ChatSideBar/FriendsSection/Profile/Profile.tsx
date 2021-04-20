import React from 'react';
import 'antd/dist/antd.css';
import { Avatar, Drawer } from 'antd';
import UserProfile from '../../../UserProfile/UserProfile';

export default class Profile extends React.Component<any> {
    state = {
        visible: false,
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible } = this.state;
        return (
            <React.Fragment>
                <div className='wrapper' style={{ paddingBottom: '10px', cursor: 'pointer' }} onClick={this.showDrawer}>
                    <div className={this.props.className}></div>
                    <Avatar className='user-photo' size={40} src={require(`../../../../img/${this.props.user.photo}`)["default"]} />
                    <span className='text' style={{ paddingLeft: '10px', fontSize: '16px' }}>
                        {this.props.user.name}
                    </span>
                </div>
                <Drawer
                    title="User Info"
                    placement="right"
                    width={550}                    
                    closable={false}
                    onClose={this.handleCancel}
                    visible={visible}
                >
                    <UserProfile user={this.props.user} />
                </Drawer>
            </React.Fragment>
        );
    };
}

