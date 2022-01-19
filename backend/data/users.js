import bcrypt from 'bcryptjs'; 
const  users =   [
    {
        "name": "Alex", 
        "email": "alex@gmail.com", 
        "password": bcrypt.hashSync("123123", 10),
        "isAdmin": true
    },
    {
        "name": "Anna", 
        "email": "anna.nguyen@gmail.com", 
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": false
    },
    {
        "name": "Alice", 
        "email": "alice.nguyen@gmail.com", 
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": true
    },
    {
        "name": "Tam", 
        "email": "tam.nguyen@gmail.com", 
         "phone": "02000330022",
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": true
    }, 
    {
        "name": "Truc", 
        "email": "truc.nguyen@gmail.com", 
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": true
    },
    {
        "name": "Huy", 
        "email": "huy.nguyen@gmail.com", 
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": true
    },
    {
        "name": "Phuc", 
        "email": "phuc.nguyen@gmail.com", 
         "password": bcrypt.hashSync("123123", 10),
         "isAdmin": true 
    }
]

export default users