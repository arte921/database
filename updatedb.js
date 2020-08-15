// Syncs up all entries in "servers" database to be like in "config" db's default_config property. 

const path = require("path");

const { save, load } = require(path.join(__dirname, "index.js"));

const dbname = "servers";

let database = load(dbname);
let exampledb = load("config").default_config;

function sync (object, example) {
    for (key in example) {
        if (!object[key]) {
            object[key] = example[key];
        } else if (typeof(object[key]) == "object" && !Array.isArray(object[key])) {
            sync (object[key], example[key]);
        }
    }

    for (key in object) {
        if (!example[key]) {
            delete object[key];
        }
    }
}

for (id in database) {
    sync(database[id], exampledb);
}


save(dbname, database);
