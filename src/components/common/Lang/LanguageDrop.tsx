import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import i18next from 'i18next';

export default function SelectLabels() {
  const [lang, setLang] = React.useState('en');

  const onClickLanguageChange = (e: any) => {
    const language = e.target.value;
    localStorage.setItem("lang", JSON.stringify(language));
    window.location.reload();
    setLang(language)
    // i18next.changeLanguage(language) //change the language
  }

  React.useEffect(()=>{
    setLang(JSON.parse(localStorage.getItem('lang') as any) ? JSON.parse(localStorage.getItem('lang') as any) : 'en')
  },[])

  return (
    <div>

      <FormControl sx={{ m: 1, minWidth: 'auto' }} size="small">
        <Select
          value={lang}
          onChange={onClickLanguageChange}
          displayEmpty
          placeholder='language'
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'en'}>English</MenuItem>
          <MenuItem value={'od'}>Odia</MenuItem>

        </Select>

      </FormControl>
    </div>
  );
}