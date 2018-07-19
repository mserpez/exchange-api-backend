// CONSTANTS
import {APP} from './config';
import axios from 'axios';

// CREATE AN INSTANCE FROM AXIOS SERVICE WITH BASE URL AND AUTH TOKEN.
export const apiService = axios.create({
  baseURL: APP.MONEEDA.BASE_URL,
  timeout: 5000,
  headers: {'Authorization': APP.MONEEDA.TOKEN}
});