import fetch from 'node-fetch';

export function hitApi(url, options) {
  return fetch(url, options).then(res => res.json());    
}
