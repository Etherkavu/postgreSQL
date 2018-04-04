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

console.log("Searching...");

knex('famous_people')
  .select('first_name', 'last_name', 'birthdate')
  .where({first_name: name})
  .asCallback((err, results) => {
    if (err) {
      console.log('Error',err);
    } else {
      console.log("Found", results.length, "person(s) named");
      for (var i = 0; i < results.length; i++){
        var bday = String(results[i].birthdate);
        bday = bday.substring(4, 15);
        console.log(" -", (i + 1)+":", results[i].first_name, results[i].last_name, "born", bday);
      }
    }
     //output: 1
knex.destroy();
});
