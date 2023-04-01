
import mysql from 'mysql';


import keys from './keys';

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'evalua2'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('DB is connected');
})



export default connection;