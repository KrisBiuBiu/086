import Axios from 'axios';
import { message } from 'antd';
import cookies from './cookies';

export const makeHttpRequest = async (method, path, option) => {
  const hostname = `http://${window.location.hostname}:5001`;
  // url
  const url = hostname + path;
  let res;
  try {
    res = await Axios({
      method,
      url,
      data: option,
    });
    return res;
  } catch (err) {
    if (err.response) {
      message.error(`${err.response.status}: ${err.response.data}`, 6);
      throw (err.response.status, err.response.data);
    } else {
      message.error(`${err.toJSON().message}`, 6);
      throw (err.toJSON().message);
    }
    // return false;
  }
};

export const makeHttpQuery = async (path, option) => {
  const hostname = `http://${window.location.hostname}:5001`;
  // url
  const url = hostname + path;
  let res;
  try {
    res = await Axios.post(url, option, {
      headers: {
        Authorization: `${cookies.get('token')}`,
      },
    });
    return res;
  } catch (err) {
    message.error(`${res.data.error.code}: ${res.data.error.message}`, 6);
    throw (res.data.error);
  }
};

export const removeHTMLTagsSubString = (hText, num, ifSuffix) => {
  let str = hText.replace(/<[^>]+>/g, '');
  if (num) {
    str = str.substr(0, num);
  }
  if (ifSuffix) {
    str += '...';
  }
  return str;
};
