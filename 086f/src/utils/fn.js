import Axios from 'axios';
import { message } from 'antd';
import cookie from './cookie';

export const makeHttpQuery = async (path, option) => {
  // hostname
  // if (!cookie.get('token') && window.location.pathname !== '/login') {
  //   window.location.replace('/login');
  //   return;
  // }
  let hostname = `http://${window.location.hostname}:5001`;
  // url
  const url = hostname + path;
  console.log(url)
  const res = await Axios.post(url, option, {
    headers: {
      Authorization: `${cookie.get('token')}`,
    },
  });
  console.log(res)
  if (res.data.error) {
    message.error(`${res.data.error.code}: ${res.data.error.message}`, 6);
    // return;
    throw (res.data.error);
  } else {
    return res;
  }
};