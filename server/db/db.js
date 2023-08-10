"use strict";
// The sole purpose of this module is to establish a connection to your
// Postgres database by creating a Sequelize instance (called `db`).
// You shouldn't need to make any modifications here.

const chalk = require("chalk");
const Sequelize = require("sequelize");
const pkg = require("../../package.json");

console.log(chalk.yellow("Opening database connection"));

// create the database instance that can be used in other database files
const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false, // so we don't see all the SQL queries getting made
});
 /*
  wizarding-shools model:
  name - not empty or null
  imageUrl - with a default value
  location - not empty or null
  description - extremely large text
 */

const wizardingSchools = db.define("wizardingSchools", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: "google.com",
  },
  location: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
});


/* 
  firstName - not empty or null
  lastName - not empty or null
  email - not empty or null; must be a valid email
  imageUrl - with a default value
  magicalAbilityScore - decimal between 0 and 10.0
  Students may be associated with at most one wizarding school.
  Likewise, wizarding schools may be associated with many students
*/
const student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Must be a valid email address",
      }
    }
  },
  magicalAbilityScore: {
    type: Sequelize.FLOAT,
    validate: {
      max: 10.0,
      min: 0.0,
    }
  }
});

/*
  Students may be associated with at most one wizarding school.
  Likewise, wizarding schools may be associated with many students
 */

wizardingSchools.hasMany(student);
student.belongsTo(wizardingSchools);

module.exports = db;
