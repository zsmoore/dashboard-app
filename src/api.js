import fetch from 'node-fetch';

/**
 * function called by actions to fetch the given
 * @param {string} url - the url to fetch
 * @param {object} options - an object passed in with the request parameters of the following format:
 *   {
 *     method - string representation of the request method. Examples are 'GET', 'POST', 'PUT', etc...
 *     headers - optional. An object containing the headers to be passed in the request
 *     body - optional. A string representation of the json body to pass in th request
 *   } 
*/  
export function hitApi(url, options) {
  console.log(url, options);
  return fetch(url, options).then(res => res.json()).catch(error => console.log('error', error));    
}
