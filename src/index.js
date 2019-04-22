import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {IntlProvider} from 'react-intl';
import {addLocaleData} from 'react-intl';
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";
import localeData from "./locales/data.json";

addLocaleData([...en, ...es]);
var lang='en';
const messages =
  localeData["es"] ||
  localeData.en;
var changeLanguage = function(language){
lang=language;
ReactDOM.render(<IntlProvider locale={lang} messages={localeData[lang] ||  localeData.en}>
    <App changeLanguage={changeLanguage}/></IntlProvider>  
, document.getElementById('root'));

}



ReactDOM.render(<IntlProvider locale={lang} messages={localeData[lang] ||  localeData.en}>
    <App changeLanguage={changeLanguage}/></IntlProvider>  
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
