import React from 'react';
import './styles.scss';

const GetApp: React.FC = () => {
    const appStoreLogo = require('../../assets/appstore.png');
    const googlePlayLogo = require('../../assets/googleplay.png');

    return (
        <div className='get-app'>
            <div>
                <p>Obtenha o aplicativo.</p>
            </div>

            <div className='img-container'>
                <img alt="Disponível na App Store" src={appStoreLogo}></img>
                <img alt="Disponível no Google Play" src={googlePlayLogo}></img>
            </div>
        </div>
    )
}

export default GetApp;