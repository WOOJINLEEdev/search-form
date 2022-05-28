import axios from 'axios';

export const instance = axios.create({
  timeout: 60 * 1000,
});
