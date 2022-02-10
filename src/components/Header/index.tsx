import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchInput from './SearchInput';
import Feed from '../Icons/Feed'
import Direct from '../Icons/Direct'
import Activity from '../Icons/Activity';
import NewPost from '../Icons/NewPost'
import Explore from '../Icons/Explore'
import Profile from '../Icons/Profile'

import './styles.scss';
import '../../styles/global.scss'

interface HeaderProps {
    selectedIcon: string
}

const Header: React.FC<HeaderProps> = (props) => {
    const [searchText, setSearchText] = useState<string>("");

    const navigate = useNavigate();

    return (
        <div className="headerMainContainer">
            <div className="headerContentContainer">
                <div className='logoContainer'>
                    <img alt="Instagram"
                        src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        srcSet="https://instagram.com/static/images/web/mobile_nav_type_logo-2x.png/1b47f9d0e595.png 2x" />
                </div>
                <SearchInput className='searchInputContainer' value={searchText} onChange={(e) => setSearchText((e.target as HTMLTextAreaElement).value)} />
                <div className='userActionsContainer'>
                    <Profile className='profile' selected={props.selectedIcon === "profile"} onClick={() => navigate("/profile")} />
                    <Activity className='activity' selected={props.selectedIcon === "activity"} />
                    <Explore className='explore' selected={props.selectedIcon === "explore"} onClick={() => navigate("/explore")} />
                    <NewPost className='newPost' selected={props.selectedIcon === "newPost"} />
                    <Direct className='direct' selected={props.selectedIcon === "direct"} onClick={() => navigate("/direct")} />
                    <Feed className='feed' selected={props.selectedIcon === "feed"} onClick={() => navigate("/")} />
                </div>
            </div>
        </div >
    )
};

export default Header;