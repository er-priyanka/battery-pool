// backend url
export const baseURL = 'http://localhost:8080'; //backend url (api);


// import axios from 'axios';
// import store from '../Store'; 

// const api = axios.create({
//   baseURL: 'http://localhost:8080', //backend url (api)
// });

// api.interceptors.request.use(
//   config => {
//     const { token } = store.getState().user;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default api;
