import Axios from 'axios';
import { message } from 'antd';
import cookie from './cookie';

export const makeHttpQuery = async (path, option) => {

  let hostname = `http://${window.location.hostname}:5001`;
  // url
  const url = hostname + path;
  let res;
  try {
    res = await Axios.post(url, option, {
      headers: {
        Authorization: `${cookie.get('token')}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err)
  }
};