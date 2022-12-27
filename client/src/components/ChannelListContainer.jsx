
import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';

import '../App.css';

import WMIcon from '../assets/wm.png'
import LogoutIcon from '../assets/logout.png'

const cookies = new Cookies()

const SideBar = ({ logout }) => (
    <body>
        <nav className="channel-list__sidebar">
            <ul className="sidebar__container">
                <li className="sidebar__icon back">
                    <img src={WMIcon} alt="Wastemen" width="40" />
                    <div className="popper">
                        <h4 className="popper-text">Wastemen</h4>
                    </div>
                </li>
                <li className="divider"></li>
                <li className="sidebar__icon back">
                    <div className="icon1__inner" onClick={logout}>
                        <img src={LogoutIcon} alt="Logout" width="25" />
                    </div>
                    <div className="popper">
                        <h4 className="popper-text">Logout</h4>
                    </div>
                </li>
            </ul>
        </nav>
    </body>
)

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Waste My Time</p>
  </div>
);


const ChannelListContainer = ({ isCreating, setIsCreating, setCreateType, setIsEditing }) => {
  const logout = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("avatarURL");
    cookies.remove("hashedPassword");
    cookies.remove("phoneNumber");

    window.location.reload();
  };
  
  return (
    <div className='channel-list__container'>
        <SideBar logout={logout} />
        <div className="channel-list__wrapper">
            <CompanyHeader />
            <ChannelSearch />
            <ChannelList
                filters={{}}
                channelRenderFilterFn={ () => {}}
                List={(listProps) => (
                    <TeamChannelList
                        {... listProps}
                        type="team"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => {
                    <TeamChannelPreview
                        {...previewProps}
                        type="team"
                    />
                }}
            />
            <ChannelList
                filters={{}}
                channelRenderFilterFn={ () => {}}
                List={(listProps) => (
                    <TeamChannelList
                        {... listProps}
                        type="messaging"
                        isCreating={isCreating}
                        setIsCreating={setIsCreating}
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                    />
                )}
                Preview={(previewProps) => {
                    <TeamChannelPreview
                        {...previewProps}
                        type="messaging"
                    />
                }}
            />
        </div>
    </div>
  );
};

export default ChannelListContainer;
