import React from "react"
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();
    return (
        <footer>
            Adrian Kołbuk s17131, {t('main-page.contact')}: s17131@pjwstk.edu.pl
        </footer>
    )
}

export default Footer