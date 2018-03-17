const mongoose = require("mongoose");
const User = require('../models/user');
const Company = require('../models/company');
require('../configs/database');



const myUsers = [
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
    name: "Ironhack",
    pictureUrl: "",
    description: "Learn",
    // _employees: [{firstname: "Maxence"}, {firstname: "John"}],
    website: "www.google.com",
    role: "Startup",
    sector: "Code"
  }
];


let myUserDocs = []
for (let i = 0; i < myUsers.length; i++) {
    myUserDocs.push(new User(myUsers[i]))
}

let myCompanyDocs = []
for (let i = 0; i < myCompanies.length; i++) {
    myCompanyDocs.push(new Company(myCompanies[i]))
}

// Link between models (everyone is in the first company)
myCompanyDocs[0]._employees = []
for (let i = 0; i < myUserDocs.length; i++) {
    myUserDocs[i]._company = myCompanyDocs[0]._id
    myCompanyDocs[0]._employees.push(myUserDocs[i]._id)
}

// myUserDocs[0]._company = myCompanyDocs[1]._id

console.log(myUserDocs);
console.log(myCompanyDocs);


// company1.save()




User.remove()
    .then(() => {
        // User.create(myUsers)
        // .catch(err => { console.log(err) })   

        Company.remove()
            .then(() => {
                // Company.create(myCompanies)
                // .catch(err => { console.log(err) })   
                for (let i = 0; i < myUserDocs.length; i++) {
                    myUserDocs[i].save()
                }
                for (let i = 0; i < myCompanyDocs.length; i++) {
                    myCompanyDocs[i].save()
                }
            })
    })


