import React from 'react';
import { Link } from 'react-router-dom'
import { withTranslation } from 'react-i18next';

class Navigation extends React.Component {
    handleLanguageChange = (language) => {
        const { i18n } = this.props
        i18n.changeLanguage(language, (err, t) => {
            if (err) return console.log('something went wrong loading', err);
        });
    }

    render() {
        const { t } = this.props;
        return (
            <nav>
                <ul>
                    <li><Link to="/">{t('nav.main-page')}</Link></li>
                    <li><Link to="/employees">{t('nav.employees')}</Link></li>
                    <li><Link to="/trainings">{t('nav.trainings')}</Link></li>
                    <li><Link to="/history">{t('nav.history')}</Link></li>

                    <li id="langPL" className="<%= (lang === 'pl') ? 'active' : ''%>"><Link onClick={() => { this.handleLanguageChange('pl') }}>PL</Link></li>
                    <li id="langEN" className="<%= (lang === 'en') ? 'active' : ''%>"><Link onClick={() => { this.handleLanguageChange('en') }}>EN</Link></li>

                    {/* <li id="langPL" className="<%= (lang === 'pl') ? 'active' : ''%>"><Link to="/changeLang/pl">PL</Link></li>
                <li id="langEN" className="<%= (lang === 'en') ? 'active' : ''%>"><Link to="/changeLang/en">EN</Link></li> */}
                    {/* <li className='lang'><button onClick={() => { this.handleLanguageChange('pl') }}>PL</button></li>
                <li><button onClick={() => { this.handleLanguageChange('en') }}>EN</button></li> */}
                </ul>
            </nav>
        )
    }
}

export default withTranslation()(Navigation)