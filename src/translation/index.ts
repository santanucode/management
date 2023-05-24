import en from "./en.json";
import od from "./od.json";
import LocalizedStrings from 'react-localization'


export let  localLang = JSON.parse(localStorage.getItem('lang') as any) ? JSON.parse(localStorage.getItem('lang') as any) : 'en'

let strings: any;

if (!strings) {
    strings = new LocalizedStrings({
        en,
        od
    });
}


strings.setLanguage(localLang);

export default strings;
