import axios from 'axios';

const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3030/api',
});

const errHandler = err => {
  console.error(err);
  throw err;
};

export default {
  service: service,
  
  getPeople() {
    return service
    .get('/people')
    .then(res => res.data)
    .catch(errHandler);
  },

  postPeople(data) {
    return service
      .post('/people', data)
      .then(res => res.data)
      .catch(errHandler);
  },

  editPeople(id, data) {
    return service
      .put('/people/' + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSingleUser(id) {
    return service
      .get('/people/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  },

  deletePeople(id) {
    return service
      .delete('/people/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  }

};
