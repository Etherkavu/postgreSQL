const pg = require("pg");
const settings = require("./setting"); // settings.json

const client = clientbuilder(settings);

function clientbuilder (source){
  const client = new pg.Client({
    user     : source.user,
    password : source.password,
    database : source.database,
    host     : source.hostname,
    port     : source.port,
    ssl      : source.ssl
  });
  return client;
}
console.log("Searching...");
client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT first_name, last_name, birthdate  FROM famous_people WHERE first_name = 'Paul'", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Found", result.rows.length, "person(s) named");

    for (var i = 0; i < result.rows.length; i++){
      var bday = String(result.rows[i].birthdate);
      bday = bday.substring(4, 15);
      console.log(" -", (i + 1)+":", result.rows[i].first_name, result.rows[i].last_name, "born", bday);
    }
     //output: 1
    client.end();
  });
});