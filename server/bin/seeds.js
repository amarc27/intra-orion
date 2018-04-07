const mongoose = require("mongoose");
const People = require('../models/people');
const Company = require('../models/company');
require('../configs/database');



const myPeoples = [
    {
        firstname: 'John',
        lastname: 'Doe',
        mobilePhone: "0612345678",
        email: 'john.doe@gmail.com',
        password: 'john',
        role: 'Admin',
        pictureUrl: "",
        position: "I'm John Doe",
        // _company: {name: "Ironhack"}
    },
    {
        firstname: 'Maxence',
        lastname: 'Bouret',
        mobilePhone: "0687654321",
        email: 'max.bouré@ih.com',
        password: 'max',
        role: 'Founder',
        pictureUrl: "",
        position: "tes",
        // _company: {name: "Ironhack"}
    },
    {
        firstname: 'Antoine',
        lastname: 'Marc',
        mobilePhone: "0687654321",
        email: 'Mark.Zukc@fb.com',
        password: 'mark',
        role: 'Founder',
        pictureUrl: "",
        position: "I'm CEO, bitch",
        // _company: {name: "Facebook"}
    }
];


const myCompanies = [
  {
    name: "Facebook",
    pictureUrl: "",
    description: "Connecting the world...bullshit",
    // _employees: {firstname: "Antoine"},
    website: "www.facebook.com",
    role: "Startup",
    sector: "Social"
  },
  {
    name: "Google",
    pictureUrl: "",
    description: "Learn",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.google.com",
    role: "Startup",
    sector: "Code"
  }
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
    myPeopleDocs[i]._company = myCompanyDocs[0]._id
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
                    myPeopleDocs[i].save()
                }
                for (let i = 0; i < myCompanyDocs.length; i++) {
                    myCompanyDocs[i].save()
                }
            })
    })


