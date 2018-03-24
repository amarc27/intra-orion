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
  

// PEOPLE
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

  getSingleUser(id) {
    return service
      .get('/people/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  },

  editPeople(id, data) {
    return service
      .put('/people/' + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deletePeople(id) {
    return service
      .delete('/people/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  },



// PERKS
  getPerks() {
    return service
    .get('/perks')
    .then(res => res.data)
    .catch(errHandler);
  },

  postPerks(data) {
    return service
      .post('/perks', data)
      .then(res => res.data)
      .catch(errHandler);
  },

  getSinglePerk(id) {
    return service
      .get('/perks/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  },

  editPerks(id, data) {
    return service
      .put('/perks/' + id, data)
      .then(res => res.data)
      .catch(errHandler);
  },

  deletePerks(id) {
    return service
      .delete('/perks/' + id)
      .then(res => res.data)
      .catch(errHandler);      
  },


};
