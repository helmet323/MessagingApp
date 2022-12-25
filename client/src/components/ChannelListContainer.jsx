import React from "react";
import { ChannelList, useChatContext } from "stream-chat-react";
import Cookies from "universal-cookie";

import {
  ChannelSearch,
  TeamChannelList,
  TeamChannelPreview,
} from "stream-chat-react";

import "./ChannelListContainer.css";

import WMIcon from "../assets/wm.png";
import LogoutIcon from "../assets/logout.png";

const cookies = new Cookies();

const SideBar = ({ logout }) => (
  <body>
    <nav className="channel-list__sidebar">
      <ul className="sidebar__container">
        <li className="sidebar__icon green-back">
          <img src={WMIcon} alt="Wastemen" width="40" />
          <div className="popper">
            <h4 className="popper-text">Wastemen</h4>
          </div>
        </li>
        <li className="divider"></li> 
        <li className="sidebar__icon green-back">
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
);

const CompanyHeader = () => (
  <div className="channel-list__header">
    <p className="channel-list__header__text">Waste My Time</p>
  </div>
);

const ChannelListContainer = () => {
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
    <>
      <SideBar logout={logout} />
      <div className="channel-list__list__wrapper">
        <CompanyHeader />
      </div>
    </>
  );
};

export default ChannelListContainer;
