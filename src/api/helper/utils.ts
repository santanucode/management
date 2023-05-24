import { ResultObj } from "pages/auth/signin/service/types";


export function convert_Object_format_with_all_false(arr:[]) {
    const obj:ResultObj = {};
      arr.forEach((str: { split: (arg0: string) => [string, string]; }) => {
      const [commonName, propName] = str.split('.');
        if (!obj[commonName]) {
          obj[commonName] = {};
        }
        obj[commonName][propName] = false;
      });
    
    return obj
}
  
export function convert_Object_format_with_all_true(arr:[]) {
  const obj:ResultObj = {};
    arr.forEach((str: { split: (arg0: string) => [string, string]; }) => {
    const [commonName, propName] = str.split('.');
      if (!obj[commonName]) {
        obj[commonName] = {};
      }
      obj[commonName][propName] = true;
    });
  
  return obj
}