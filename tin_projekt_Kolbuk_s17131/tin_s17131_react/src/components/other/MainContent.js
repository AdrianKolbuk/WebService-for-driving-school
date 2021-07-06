import React from 'react'
import { useTranslation } from 'react-i18next';

function MainContent() {
    const { t } = useTranslation();

    return (
        <main>
            <h2>{t('nav.main-page')}</h2>
            <p>System informatyczny dla ośrodka szkolenia kierowców.<br></br>
               Oferujemy szkolenia z jazdy samochodem w ekstremalnych warunkach, od przeszkolenia i
               doświadczenia niebezpieczeństw drogowych, które mogą spotkać nas w codziennej jeździe samochodem, po naukę
               driftu z profesjonalnym kierowcą rajdowym.
            </p>
        </main>
    )
}

export default MainContent