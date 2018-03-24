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



  
// TOOLS
getTools() {
  return service
  .get('/tools')
  .then(res => res.data)
  .catch(errHandler);
},

postTools(data) {
  return service
    .post('/tools', data)
    .then(res => res.data)
    .catch(errHandler);
},

getSingleTool(id) {
  return service
    .get('/tools/' + id)
    .then(res => res.data)
    .catch(errHandler);      
},

editTools(id, data) {
  return service
    .put('/tools/' + id, data)
    .then(res => res.data)
    .catch(errHandler);
},

deleteTools(id) {
  return service
    .delete('/tools/' + id)
    .then(res => res.data)
    .catch(errHandler);      
},




// Ressources
getRessources() {
  return service
  .get('/tools')
  .then(res => res.data)
  .catch(errHandler);
},

postRessources(data) {
  return service
    .post('/tools', data)
    .then(res => res.data)
    .catch(errHandler);
},

getSingleRessource(id) {
  return service
    .get('/tools/' + id)
    .then(res => res.data)
    .catch(errHandler);      
},

editRessources(id, data) {
  return service
    .put('/tools/' + id, data)
    .then(res => res.data)
    .catch(errHandler);
},

deleteRessources(id) {
  return service
    .delete('/tools/' + id)
    .then(res => res.data)
    .catch(errHandler);      
},


};
