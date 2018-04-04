var knex = require('knex')({
  client: 'pg',
  connection: {
  user: "development",
  password: "development",
  database: "test_db",
  hostname: "localhost",
  port: 5432,
  ssl: true
  },
});


// function clientbuilder (source){
//   const client = new pg.Client({
//     user     : source.user,
//     password : source.password,
//     database : source.database,
//     host     : source.hostname,
//     port     : source.port,
//     ssl      : source.ssl
//   });
//   return client;
// }

const name = process.argv[2];

knex('famous_people')
  .insert({first_name: process.argv[2],
          last_name: process.argv[2],
          birthdate: process.argv[4]})

  .asCallback((err, results) => {
    if (err) {
      console.log('Error',err);
    }

     //output: 1
knex.destroy();
});