const express =         require('express');
const { graphqlHTTP } = require('express-graphql');
const mysql =           require('mysql');
const schema =          require('./schema.js');

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "mydatabase",
    port: 3307
});

pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed: ' + err.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });

const root = {

    getRawdat: ({ WetlandID  }) => {
        return new Promise((resolve, reject) => {
          pool.query('SELECT * FROM rawdata WHERE WetlandID  = ?', [WetlandID], (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results[0]);
          });
        });
      },

    getRawdata: () => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM rawdata', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            });
        });
    },
};

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));



app.get('/', (req, res) => {

    pool.query('SELECT * FROM rawdata', (error, results, fields) => {
        if (error) {
          console.error('Error fetching users: ' + error.stack);
          res.status(500).send('Error fetching users');
          return;
        }
        res.json(results);
      });
  });

app.listen(4000, () => {
    console.log('Listening for GraphQL requests on http://localhost:4000/graphql');
});
