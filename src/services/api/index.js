export const Host = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : `https:${process.env.API_URL_PROD}`;
export const SocketApiUrl = process.env.NODE_ENV === 'development' ? 'ws://localhost:3001' : `wss:${process.env.API_URL_PROD}`;

/** @type { import(".").Request } */
export const Request = (method, uri, body, headers = {}) => fetch(Host + uri,
  {
    method: method.toUpperCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'x-access-token': window.localStorage.getItem('token'),
      'socket-id': window.localStorage.getItem('socket-id'),
      ...headers,
    },
    body: JSON.stringify(body),
  });

/**
 * @type { import(".").Auth }
 */export const Auth = {
  login: (data) => Request('post', '/auth/login', data),
  register: (data) => Request('post', '/auth/register', data),
  refresh: () => Request('get', '/auth/refresh'),
};

/**
 * @type { import(".").Product }
 */export const Product = {
  get: () => Request('get', '/api/products/'),
  add: (data) => Request('post', '/api/products/', data),
  set: (data) => Request('put', `/api/products/${data.uuid}`, data),
  del: (data) => Request('delete', `/api/products/${data.uuid}`, data),
  addValidation: (uuid, data) => Request('post', `/api/products/${uuid}`, data),
};

/**
 * @type { import(".").Validation }
 */export const Validation = {
  set: (data) => Request('put', `/api/validations/${data.uuid}`, data),
  del: (data) => Request('delete', `/api/validations/${data.uuid}`, data),
};
