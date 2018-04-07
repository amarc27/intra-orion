const mongoose = require("mongoose");
const People = require('../models/people');
const Company = require('../models/company');
require('../configs/database');



const myPeoples = [
  {
    firstname: 'Antoine',
    lastname: 'Marc',
    mobilePhone: "0634012344",
    email: 'antoine@orionth.co',
    // password: 'mark',
    role: 'Admin',
    pictureUrl: "https://media.licdn.com/dms/image/C5603AQGwcRUyN0CYOw/profile-displayphoto-shrink_800_800/0?e=1528293600&v=beta&t=gOprkT8U4YlGeNllZ6AmHObmWpLHS7adByTnL-YGGEw",
    position: "Cofounder",
    // _company: {name: "Facebook"}
  },
  {
    firstname: 'Marc',
    lastname: 'Zuckerberg',
    mobilePhone: "0687654321",
    email: 'marc@facebook.com',
    // password: 'max',
    role: 'Founder',
    pictureUrl: "https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2018/03/19/105074546-GettyImages-511574500.600x400.jpg?v=1521736550",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },
  {
    firstname: 'Jeff',
    lastname: 'Bezos',
    mobilePhone: "0612345678",
    email: 'jeff@amazon.com',
    // password: 'john',
    role: 'EIR',
    pictureUrl: "https://pbs.twimg.com/profile_images/669103856106668033/UF3cgUk4_400x400.jpg",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },
  {
    firstname: 'Larry',
    lastname: 'Page',
    mobilePhone: "0612345678",
    email: 'lary@google.com',
    // password: 'john',
    role: 'EIR',
    pictureUrl: "https://techcrunch.com/wp-content/uploads/2014/06/page-larry_topic.jpg",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },
  {
    firstname: 'Julien',
    lastname: 'Bloch',
    mobilePhone: "0612345678",
    email: 'julien@cleep.com',
    // password: 'john',
    role: 'Founder',
    pictureUrl: "https://media.licdn.com/dms/image/C5603AQGcpeI0q3-kOA/profile-displayphoto-shrink_800_800/0?e=1528293600&v=beta&t=QVSwInx_tWk5LEY05YpKqCLzQJa7pshRlxV1_WLE36c",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },
  {
    firstname: 'Elon',
    lastname: 'Musk',
    mobilePhone: "0612345678",
    email: 'elon@spacex.com',
    // password: 'john',
    role: 'Founder',
    pictureUrl: "",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },
  {
    firstname: 'Jean-Baptiste',
    lastname: 'Rudelle',
    mobilePhone: "0612345678",
    email: 'jean-baptiste@criteo.com',
    // password: 'john',
    role: 'Founder',
    pictureUrl: "",
    position: "CEO",
    // _company: {name: "Ironhack"}
  },

];


const myCompanies = [
  {
    name: "Orion",
    pictureUrl: "",
    description: "Orion...",
    // _employees: {firstname: "Antoine"},
    website: "http://intra-orion.herokuapp.com/",
    role: "Startup",
  },
  {
  name: "Facebook",
  pictureUrl: "",
  description: "Facebook...",
  // _employees: {firstname: "Antoine"},
  website: "www.facebook.com",
  role: "Startup",
  },
  {
    name: "Amazon",
    pictureUrl: "",
    description: "Amazon...",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.amazon.com",
    role: "Startup",
  },
  {
    name: "Google",
    pictureUrl: "",
    description: "Google...",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.google.com",
    role: "Startup",
  },
  {
    name: "Cleep",
    pictureUrl: "",
    description: "cleep...",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.cleep.com",
    role: "Startup",
  },
  {
    name: "Space X",
    pictureUrl: "",
    description: "Space X...",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.spacex.com",
    role: "Startup",
  },
  {
    name: "Criteo",
    pictureUrl: "",
    description: "Criteo...",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.criteo.com",
    role: "Startup",
  },
];


let myPeopleDocs = []
for (let i = 0; i < myPeoples.length; i++) {
  myPeopleDocs.push(new People(myPeoples[i]))
}

let myCompanyDocs = []
for (let i = 0; i < myCompanies.length; i++) {
  myCompanyDocs.push(new Company(myCompanies[i]))
}

// Link between models (everyone is in the first company)
myCompanyDocs[0]._employees = []
for (let i = 0; i < myPeopleDocs.length; i++) {
  myPeopleDocs[i]._company = myCompanyDocs[i]._id
  myCompanyDocs[0]._employees.push(myPeopleDocs[i]._id)
}

// myPeopleDocs[0]._company = myCompanyDocs[1]._id

console.log(myPeopleDocs);
console.log(myCompanyDocs);


// company1.save()




People.remove()
  .then(() => {
    // People.create(myPeoples)
    // .catch(err => { console.log(err) })   

    Company.remove()
      .then(() => {
        // Company.create(myCompanies)
        // .catch(err => { console.log(err) })   
        for (let i = 0; i < myPeopleDocs.length; i++) {
          People.register(myPeopleDocs[i], "test")
        }
        for (let i = 0; i < myCompanyDocs.length; i++) {
          myCompanyDocs[i].save()
        }
      })
  })


