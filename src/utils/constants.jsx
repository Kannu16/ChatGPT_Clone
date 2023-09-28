
export const apiUrl = 'https://open-ai21.p.rapidapi.com/conversationgpt35';
// My own default API key here
const defaultApiKey = '62706a1014mshb3666b6395fc992p10317cjsn711f71ddbf7c';

// Retrieve the API key from localStorage, or use the default if not available
const chatGptApiKey = JSON.parse(sessionStorage.getItem("myApiKey")) || defaultApiKey;
export const rapidApiHeaders = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': chatGptApiKey,
  'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
}

  export const maxCount = 15;

//Below these are free API
//"a7872c0ffbmsh43352ec84f61372p181065jsn54fd51f1d450"
// "197c73246cmsh7278c3a24efb474p1c099ejsnff97ec670ddd"
// 62706a1014mshb3666b6395fc992p10317cjsn711f71ddbf7c