import React from 'react';
import './UserProfile.scss';
import { Col, Button, Menu, Dropdown, Avatar } from 'antd';
import { CaretDownOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';

const ezLocalTime = require('ez-local-time');
const profileMenu = (
    <Menu>
        <Menu.Item>Отправить сообщение</Menu.Item>
        <Menu.Item>Позвонить</Menu.Item>
        <Menu.Item>Видеозвонок</Menu.Item>
        <Menu.Item>Удалить из друзей</Menu.Item>           
    </Menu>
);

export default class UserProfile extends React.Component<any> {
    constructor(props: any) {
        super(props);
    }
    render() {  
        //const localTime = ezLocalTime(`${this.props.user.timeZone}`)
        let currentStatus = '';
        if(this.props.user.online) {
            currentStatus = 'online';
        }   
        else {
            currentStatus = 'offline';
        }

        return(
            <Col className="profileBar">
                <Avatar shape='square' size={300} src={require(`../../img/${this.props.user.photo}`)["default"]} />
                <div className='user-info'>
                    <div className='wrapper'>
                    <span className='text user-name'>{this.props.user.name}</span>
                    <div className={currentStatus}></div>
                    </div>
                    <span className='user-job'>{this.props.user.position}</span>
                </div>
                <div className='social-media'>                    
                    <a className='icon' href={this.props.user.facebook} target='_blank' rel="noopener noreferrer">
                        <FacebookOutlined />
                    </a>
                    <a className='icon' href={this.props.user.twitter} target='_blank' rel="noopener noreferrer">
                        <TwitterOutlined />
                    </a>
                    <a className='icon' href={this.props.user.instagram} target='_blank' rel="noopener noreferrer">
                        <InstagramOutlined />
                    </a>
                    <a className='icon' href={this.props.user.linkedin} target='_blank' rel="noopener noreferrer">
                        <LinkedinOutlined />
                    </a>
                </div>
                <div className='actions'>
                    <Button className='writeTo' type='primary'>Message</Button>
                    <Dropdown overlay={profileMenu}>
                        <Button className='additional' type='primary'>
                            <CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </div>
                <div className='user-info'>
                    <div className='text'>
                        <span className='label value'>UserId: <b>{this.props.user.id}</b></span>
                    </div>
                    <div className='text'>
                        <span className='label value'>
                            Email: <a href={`mailto:${this.props.user.email}`}><b>{this.props.user.email}</b></a>
                        </span>
                    </div>
                    <div className='text'>
                        <span className='label value'>Skype: <b>{this.props.user.skype}</b></span>
                    </div>
                    <div className='text'>
                        <span className='label value'>{this.props.user.timeZone} Local Time</span>
                    </div>
                </div>
            </Col>
        );
    }
}