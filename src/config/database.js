// set up database connection
require('dotenv').config();
const mongoose = require('mongoose');
//check connection to database
const dbState = [
  {
    value: 0,
    label: "Disconnected",
  },
  {
    value: 1,
    label: "Connected",
  },
  {
    value: 2,
    label: "Connecting",
  },
  {
    value: 3,
    label: "Disconnecting",
  },
];
const connection = async () => {
  try {
    const db_uri = process.env.DB_URI;
    const db_name = process.env.DB_NAME;
    const db_user = process.env.DB_USER;
    const db_pass = process.env.DB_PASS;

    await mongoose.connect(db_uri, {
      dbName: db_name,
      user: db_user,
      pass: db_pass,
    });
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value == state).label, "to databse."); // connected to db
  } catch (error) {
    console.log(error);
  }
}
module.exports = connection;
